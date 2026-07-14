<?php

use App\Http\Controllers\Api\AdminMessageController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//========================== Authentication routes==========================//
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::delete('/delete-account', [AuthController::class, 'deleteAccount'])->middleware('auth:sanctum');

Route::post(
    '/email/verification-notification',
    [AuthController::class, 'resendVerificationEmail']
)->middleware([
    'auth:sanctum',
    'throttle:6,1'
]);

Route::get(
    '/email/verify/{id}/{hash}',
    function (EmailVerificationRequest $request) 
    {
        $request->fulfill();

        return redirect(env('FRONTEND_URL') . '/profile?verified=1');
    }
)->middleware([
    'signed',
    'throttle:6,1'
])->name('verification.verify');


Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//========================== Category routes==========================//
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/admin/categories', [CategoryController::class, 'store']);
    Route::put('/admin/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy']);
});

//========================== Product routes==========================//
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/admin/products', [ProductController::class, 'store']);
    Route::put('/admin/products/{id}', [ProductController::class, 'update']);
    Route::delete('/admin/products/{id}', [ProductController::class, 'destroy']);
});

//========================== User routes==========================//
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::put('/admin/users/{id}/role', [UserController::class, 'changeRole']);
    Route::put('/admin/users/{id}/verify', [UserController::class, 'verify']);
    Route::put('/admin/users/{id}/unverify', [UserController::class, 'unverify']);
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
});

//========================== Dashboard routes==========================//
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
    Route::get('/admin/dashboard/activities', [DashboardController::class, 'activities']);
    Route::delete('/admin/dashboard/activities/{id}', [DashboardController::class, 'deleteActivity']);
});

//========================== Contact routes==========================//
Route::middleware(['throttle:5,1'])->post('/contact', [\App\Http\Controllers\Api\ContactController::class, 'store']);

//========================== Admin Contact routes==========================//
Route::middleware(['auth:sanctum','admin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/messages', [AdminMessageController::class,'index']);

        Route::get('/messages/{id}',
            [AdminMessageController::class,'show']);

        Route::patch('/messages/{id}/toggle-read',
            [AdminMessageController::class,'toggleMarkAsRead']);

        Route::delete('/messages/{id}',
            [AdminMessageController::class,'destroy']);
    });