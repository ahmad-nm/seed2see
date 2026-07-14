<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        if ($request->verified === 'yes') {
            $query->whereNotNull('email_verified_at');
        }

        if ($request->verified === 'no') {
            $query->whereNull('email_verified_at');
        }

        if ($request->role) {
            $query->where('role', $request->role);
        }

        return $query
            ->latest()
            ->paginate(12);
    }

    public function changeRole (Request $request, $id) {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'You cannot change your own role.',
            ], 403);
        }

        if ($user->role === 'admin' && User::where('role', 'admin')->count() === 1) {
            return response()->json([
                'message' => 'You cannot change the role of the last admin account.',
            ], 403);
        }

        $old = $user->role;

        $user->role = $validated['role'];
        $user->save();

        activity()
            ->causedBy($request->user())
            ->performedOn($user)
            ->withProperties([
                'old_role' => $old,
                'new_role' => $validated['role'],
            ])
            ->log('User role changed');

        return response()->json([
            'message' => 'User role updated successfully.',
        ]);
    }

    public function verify(Request $request, $id) {
        $user = User::findOrFail($id);

        $user->email_verified_at = now();
        $user->save();

        activity()
            ->causedBy($request->user())
            ->performedOn($user)
            ->withProperties([
                'username' => $user->name,
                'email' => $user->email,
            ])
            ->log('User verified');

        return response()->json([
            'message' => 'User verified successfully.',
        ]);
    }

    public function unverify(Request $request, $id) {
        $user = User::findOrFail($id);

        $user->email_verified_at = null;
        $user->save();

        activity()
            ->causedBy($request->user())
            ->performedOn($user)
            ->withProperties([
                'username' => $user->name,
                'email' => $user->email,
            ])
            ->log('User unverified');

        return response()->json([
            'message' => 'User unverified successfully.',
        ]);
    }

    public function destroy(Request $request, $id) {
        $user = User::findOrFail($id);

        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'You cannot delete your own account.',
            ], 403);
        }

        if ($user->role === 'admin' && User::where('role', 'admin')->count() === 1) {
            return response()->json([
                'message' => 'You cannot delete the last admin account.',
            ], 403);
        }

        activity()
            ->causedBy($request->user())
            ->performedOn($user)
            ->log('User deleted');

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }
}
