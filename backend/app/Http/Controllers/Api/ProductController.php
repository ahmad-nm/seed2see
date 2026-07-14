<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Activity;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Sorting
        switch ($request->get('sort')) {
            case 'price-high':
                $query->orderBy('price', 'desc');
                break;

            case 'price-low':
                $query->orderBy('price', 'asc');
                break;

            case 'alphabetical':
                $query->orderBy('name', 'asc');
                break;

            case 'reverse-alphabetical':
                $query->orderBy('name', 'desc');
                break;

            default:
                $query->latest();
        }

        \Illuminate\Support\Facades\Log::info($request->all());

        return response()->json(
            $query->paginate(
                $request->integer('per_page', 12)
            )
        );
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json($product);
    }

    public function showBySlug($slug)
    {
        $product = Product::with('category')->where('slug', $slug)->first();

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:products,name',
            'slug' => 'nullable|string|unique:products,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'carbon_score' => 'nullable|numeric|min:0',
            'is_sustainable' => 'nullable|boolean',
            'category_id' => 'required|exists:categories,id',
        ], [
            'name.required' => 'Product name is required.',
            'name.unique' => 'A product with this name already exists.',
            'name.max' => 'Product name cannot exceed 255 characters.',

            'slug.unique' => 'This slug is already being used.',

            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price cannot be negative.',

            'stock.required' => 'Stock quantity is required.',
            'stock.integer' => 'Stock must be a whole number.',
            'stock.min' => 'Stock cannot be negative.',

            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be jpeg, png, jpg, or svg.',
            'image.max' => 'The image size must not exceed 2 MB.',

            'carbon_score.numeric' => 'Carbon score must be a number.',
            'carbon_score.min' => 'Carbon score cannot be negative.',

            'is_sustainable.boolean' => 'Sustainability value is invalid.',

            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category does not exist.',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = $imagePath;
        }

        $product = Product::create($validated);

        activity()
            ->performedOn($product)
            ->causedBy($request->user())
            ->withProperties([
                'name' => $product->name,
                'category_name' => $product->category?->name,
            ])
            ->log('Product created');

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product->load('category')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:products,name,' . $id,
            'slug' => 'sometimes|string|unique:products,slug,' . $id,
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'carbon_score' => 'nullable|numeric|min:0',
            'is_sustainable' => 'nullable|boolean',
            'category_id' => 'sometimes|exists:categories,id',
        ], [
            'name.unique' => 'A product with this name already exists.',
            'name.max' => 'Product name cannot exceed 255 characters.',
            'name.required' => 'Product name is required.',

            'slug.unique' => 'This slug is already being used.',
            
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price cannot be negative.',
            
            'stock.required' => 'Stock quantity is required.',
            'stock.integer' => 'Stock must be a whole number.',
            'stock.min' => 'Stock cannot be negative.',
            
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be jpeg, png, jpg, or svg.',
            'image.max' => 'The image size must not exceed 2 MB.',
            
            'carbon_score.numeric' => 'Carbon score must be a number.',
            'carbon_score.min' => 'Carbon score cannot be negative.',

            'category_id.exists' => 'The selected category does not exist.',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = $imagePath;
        }

        $old = $product->only(['name', 'slug', 'description', 'price', 'stock', 'image', 'carbon_score', 'is_sustainable']);

        $product->update($validated);

        activity()
            ->performedOn($product)
            ->causedBy($request->user())
            ->withProperties([
                'old' => $old,
                'new' => $validated,
            ])
            ->log('Product updated');

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->fresh()->load('category')
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        activity()
            ->performedOn($product)
            ->log('Product deleted');

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
