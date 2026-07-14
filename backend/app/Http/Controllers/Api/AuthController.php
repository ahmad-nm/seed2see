<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Spatie\Activitylog\Models\Activity;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => [
                    'required',
                    'string',
                    'min:3',
                    'max:50',
                ],

                'email' => [
                    'required',
                    'email',
                    'max:100',
                    'unique:users,email',
                ],

                'password' => [
                    'required',
                    'confirmed',
                    Password::min(8)
                        ->letters()
                        ->numbers(),
                ],
            ],

            [
                'name.required' => 'Please enter your name.',
                'name.min' => 'Name must contain at least 3 characters.',
                'name.max' => 'Name cannot exceed 50 characters.',

                'email.required' => 'Please enter your email address.',
                'email.email' => 'Please enter a valid email address.',
                'email.max' => 'Email cannot exceed 100 characters.',
                'email.unique' => 'An account with this email already exists.',

                'password.required' => 'Please enter a password.',
                'password.confirmed' => 'Passwords do not match.',
            ]
        );

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'user',
        ]);

        $user->sendEmailVerificationNotification();

        Auth::login($user);

        activity()
            ->causedBy($user)
            ->withProperties([
                'username' => $user->name,
                'email' => $user->email,
            ])
            ->log('User registered');

        return response()->json([
            'message' => 'Registration successful. Please verify your email address.',
            'user' => $user->only([
                'id',
                'name',
                'email',
                'role'
            ]),
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $adminLogin = $request->boolean('admin_login', false);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        if ($adminLogin && Auth::user()->role !== 'admin') {
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => ['You do not have admin privileges.'],
            ]);
        }

        // Regenerate session to prevent fixation
        $request->session()->regenerate();

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'username' => $request->user()->name,
                'email' => $request->user()->email,
            ])
            ->log('User logged in');

        return response()->json([
            'message' => 'Login successful',
            'user' => $request->user()->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        // Invalidate the session and regenerate the CSRF token (destroys the session)
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'username' => $request->user()->name,
                'email' => $request->user()->email,
            ])
            ->log('User logged out');

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        activity()
            ->causedBy($user)
            ->withProperties([
                'username' => $user->name,
                'email' => $user->email,
            ])
            ->log('User account deleted');

        // Delete the user account
        $user->delete();

        // Logout the user and invalidate the session
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Account deleted successfully',
        ]);
    }

    public function resendVerificationEmail(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email is already verified.',
            ], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification email resent successfully.',
        ]);
    }
}
