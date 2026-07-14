<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Activity;

class CategoryController extends Controller
{
    // GET all categories
    public function index()
    {
        $categories = Category::latest()->get();

        return response()->json($categories);
    }

    // GET single category
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json($category);
    }

    // CREATE category
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name',
                'slug' => 'nullable|string|unique:categories,slug',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ], [
                'name.required' => 'Category name is required.',
                'name.unique' => 'A category with this name already exists.',
                'slug.unique' => 'This slug is already being used.',
                'image.image' => 'The uploaded file must be an image.',
                'image.mimes' => 'The image must be jpeg, png, jpg, gif, or svg.',
                'image.max' => 'The image size must not exceed 2MB.',
            ]);

            // auto-generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            if($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('categories', 'public');
                $validated['image'] = $imagePath;
            }

            $category = Category::create($validated);

            activity()
                ->causedBy($request->user())
                ->withProperties([
                    'username' => $request->user()->name,
                    'email' => $request->user()->email,
                    'category_id' => $category->id,
                    'category_name' => $category->name,
                ])
                ->log('Category created');

            return response()->json([
                'message' => 'Category created successfully',
                'category' => $category
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'message' => "Database error occured",
            ], 500);
        }
    }

    // UPDATE category
    public function update(Request $request, $id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return response()->json([
                    'message' => 'Category not found'
                ], 404);
            }

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'slug' => 'sometimes|string|unique:categories,slug,' . $id,
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ], [
                'name.unique' => 'A category with this name already exists.',
                'slug.unique' => 'This slug is already being used.',
                'image.image' => 'The uploaded file must be an image.',
                'image.mimes' => 'The image must be jpeg, png, jpg, gif, or svg.',
                'image.max' => 'The image size must not exceed 2MB.',
            ]);

            if ($request->hasFile('image')) {

                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }

                $validated['image'] = $request
                    ->file('image')
                    ->store('categories', 'public');
            }

            if (isset($validated['name'])) {
                $validated['slug'] = Str::slug($validated['name']);
            } 

            $old = $category->only(['name', 'slug', 'description']);

            $category->update($validated);

            $new = $category->only(['name', 'slug', 'description']);

            activity()
                ->causedBy($request->user())
                ->withProperties([
                    'username' => $request->user()->name,
                    'email' => $request->user()->email,
                    'old_category' => $old,
                    'new_category' => $new,
                ])
                ->log('Category updated');

            return response()->json([
                'message' => 'Category updated successfully',
                'category' => $category
            ]);

        } catch (QueryException $e) {
            return response()->json([
                'message' => "Database error occured",
            ], 500);
        }
    }

    // DELETE category
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        activity()
            ->withProperties([
                'category_id' => $category->id,
                'category_name' => $category->name,
            ])
            ->log('Category was deleted');

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}