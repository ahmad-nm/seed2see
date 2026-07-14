<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    // public function index()
    // {
    //     $stats = [
    //         'total_users' => User::count(),
    //         'total_products' => Product::count(),
    //         'total_categories' => Category::count(),
    //     ];

    //     $activities = Activity::with(['causer', 'subject'])
    //         ->latest()
    //         ->take(10)
    //         ->get()
    //         ->map(function ($activity) {

    //             $categoryName = $activity->properties['category_name'] ?? '';
    //             $oldCategory = $activity->properties['old_category']['name'] ?? null;
    //             $newCategory = $activity->properties['new_category']['name'] ?? null;

    //             $message = match ($activity->description) {

    //                 'User created' =>
    //                     "User {$activity->causer?->name} was created",

    //                 'User logged in' =>
    //                     "User {$activity->causer?->name} logged in",

    //                 'User logged out' =>
    //                     "User {$activity->causer?->name} logged out",

    //                 'User account delete' =>
    //                     "User {$activity->causer?->name} deleted their account",

    //                 'User role changed' =>
    //                     "{$activity->causer?->name} changed role of User #{$activity->subject_id}",

    //                 'User verified' =>
    //                     "{$activity->causer?->name} verified {$activity->subject?->name}",

    //                 'User unverified' =>
    //                     "{$activity->causer?->name} unverified {$activity->subject?->name}",

    //                 'User deleted' =>
    //                     "{$activity->causer?->name} deleted User #{$activity->subject_id}",

    //                 'Category created' =>
    //                     "{$activity->causer?->name} created category {$categoryName}",

    //                 'Category updated' =>
    //                     "{$activity->causer?->name} updated category {$activity->subject?->name}",

    //                 'Category was deleted' =>
    //                     "Category {$categoryName} was deleted by {$activity->causer?->name}",

    //                 'Product created' =>
    //                     "{$activity->causer?->name} created product {$activity->subject?->name}",

    //                 'Product updated' =>
    //                     "{$activity->causer?->name} updated product {$activity->subject?->name}",

    //                 'Product deleted' =>
    //                     "{$activity->causer?->name} deleted product {$activity->subject?->name}",

    //                 'Contact message read' =>
    //                     "{$activity->causer?->name} read contact message #{$activity->subject_id}",

    //                 'Contact message marked as read toggled' =>
    //                     "{$activity->causer?->name} toggled read status of contact message #{$activity->subject_id}",

    //                 'Contact message deleted' =>
    //                     "{$activity->causer?->name} deleted contact message #{$activity->subject_id}",

    //                 default =>
    //                     "{$activity->causer?->name} performed {$activity->description}"
    //             };

    //             return [
    //                 'id' => $activity->id,
                    
    //                 'message' => $message,

    //                 'color' => match ($activity->description) {
    //                     'User created' => 'green',
    //                     'User logged in' => 'blue',
    //                     'User logged out' => 'orange',
    //                     'User account delete' => 'red',

    //                     'User deleted' => 'red',
    //                     'User verified' => 'green',
    //                     'User unverified' => 'orange',

    //                     'User role changed' => 'orange',

    //                     'Category created' => 'green',
    //                     'Category updated' => 'blue',
    //                     'Category was deleted' => 'red',

    //                     'Product created' => 'green',
    //                     'Product updated' => 'blue',
    //                     'Product deleted' => 'red',

    //                     'Contact message read' => 'blue',
    //                     'Contact message marked as read toggled' => 'orange',
    //                     'Contact message deleted' => 'red',

    //                     default => 'blue'
    //                 },
                    
    //                 'performed_by' => [
    //                     'id' => $activity->causer?->id,
    //                     'name' => $activity->causer?->name ?? 'System',
    //                     'email' => $activity->causer?->email,
    //                 ],
                    
    //                 'subject' => [
    //                     'type' => class_basename($activity->subject_type),
    //                     'id' => $activity->subject_id,
    //                     'name' => $activity->subject?->name ?? $activity->subject?->title ?? null,
    //                 ],
                    
    //                 'properties' => $activity->properties,
                    
    //                 'created_at' => $activity->created_at->toISOString(),
    //                 'human_date' => $activity->created_at->diffForHumans(),
    //             ];
    //         });

    //     return response()->json([
    //         'stats' => $stats,
    //         'recent_activity' => $activities,
    //     ]);
    // }

    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
        ];

        $activities = $this->formatActivities(
            Activity::with(['causer', 'subject'])
                ->latest()
                ->take(10)
                ->get()
        );

        return response()->json([
            'stats' => $stats,
            'recent_activity' => $activities,
        ]);
    }

    public function activities(Request $request)
    {
        $query = Activity::with(['causer', 'subject'])
            ->latest();

        // Search
        if ($request->filled('search')) {
            $query->where('description', 'like', "%{$request->search}%");
        }

        // Filter by activity type
        if ($request->filled('type')) {
            $query->where('description', $request->type);
        }

        $activities = $query->paginate(20);

        $activities->setCollection(
            $this->formatActivities($activities->getCollection())
        );

        return response()->json($activities);
    }

    private function formatActivities($activities)
    {
        return $activities->map(function ($activity) {

            $categoryName = $activity->properties['category_name'] ?? '';
            $oldCategory = $activity->properties['old_category']['name'] ?? null;
            $newCategory = $activity->properties['new_category']['name'] ?? null;

            $message = match ($activity->description) {

                'User created' =>
                    "User {$activity->causer?->name} was created",

                'User logged in' =>
                    "User {$activity->causer?->name} logged in",

                'User logged out' =>
                    "User {$activity->causer?->name} logged out",

                'User account delete' =>
                    "User {$activity->causer?->name} deleted their account",

                'User role changed' =>
                    "{$activity->causer?->name} changed role of User #{$activity->subject_id}",

                'User verified' =>
                    "{$activity->causer?->name} verified {$activity->subject?->name}",

                'User unverified' =>
                    "{$activity->causer?->name} unverified {$activity->subject?->name}",

                'User deleted' =>
                    "{$activity->causer?->name} deleted User #{$activity->subject_id}",

                'Category created' =>
                    "{$activity->causer?->name} created category {$categoryName}",

                'Category updated' =>
                    "{$activity->causer?->name} updated category {$activity->subject?->name}",

                'Category was deleted' =>
                    "Category {$categoryName} was deleted by {$activity->causer?->name}",

                'Product created' =>
                    "{$activity->causer?->name} created product {$activity->subject?->name}",

                'Product updated' =>
                    "{$activity->causer?->name} updated product {$activity->subject?->name}",

                'Product deleted' =>
                    "{$activity->causer?->name} deleted product {$activity->subject?->name}",

                'Contact message read' =>
                    "{$activity->causer?->name} read contact message #{$activity->subject_id}",

                'Contact message marked as read toggled' =>
                    "{$activity->causer?->name} toggled read status of contact message #{$activity->subject_id}",

                'Contact message deleted' =>
                    "{$activity->causer?->name} deleted contact message #{$activity->subject_id}",

                default =>
                    "{$activity->causer?->name} performed {$activity->description}"
            };

            $color = match ($activity->description) {
                        'User created' => 'green',
                        'User logged in' => 'blue',
                        'User logged out' => 'orange',
                        'User account delete' => 'red',

                        'User deleted' => 'red',
                        'User verified' => 'green',
                        'User unverified' => 'orange',

                        'User role changed' => 'orange',

                        'Category created' => 'green',
                        'Category updated' => 'blue',
                        'Category was deleted' => 'red',

                        'Product created' => 'green',
                        'Product updated' => 'blue',
                        'Product deleted' => 'red',

                        'Contact message read' => 'blue',
                        'Contact message marked as read toggled' => 'orange',
                        'Contact message deleted' => 'red',

                        default => 'blue'
            };        

            return [
                'id' => $activity->id,
                'message' => $message,
                'color' => $color,
                'performed_by' => [
                    'id' => $activity->causer?->id,
                    'name' => $activity->causer?->name ?? 'System',
                    'email' => $activity->causer?->email,
                ],
                'subject' => [
                    'type' => class_basename($activity->subject_type),
                    'id' => $activity->subject_id,
                    'name' => $activity->subject?->name ?? $activity->subject?->title ?? null,
                ],
                'properties' => $activity->properties,
                'created_at' => $activity->created_at->toISOString(),
                'human_date' => $activity->created_at->diffForHumans(),
            ];
        });
    }

    public function deleteActivity($id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully']);
    }
}