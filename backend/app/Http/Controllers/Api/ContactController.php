<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:2',
                'max:100'
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                'max:255'
            ],
            'subject' => [
                'required',
                'string',
                'min:3',
                'max:200'
            ],
            'message' => [
                'required',
                'string',
                'min:10',
                'max:5000'
            ],
        ],[
            'name.required' => 'Please enter your name.',
            'name.string' => 'Name must be a valid string.',
            'name.min' => 'Name must be at least 2 characters.',
            'name.max' => 'Name cannot exceed 100 characters.',

            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Email cannot exceed 255 characters.',

            'subject.required' => 'Please enter a subject.',
            'subject.string' => 'Subject must be a valid string.',
            'subject.min' => 'Subject must be at least 3 characters.',
            'subject.max' => 'Subject cannot exceed 200 characters.',

            'message.required' => 'Please enter your message.',
            'message.string' => 'Message must be a valid string.',
            'message.min' => 'Message must be at least 10 characters.',
            'message.max' => 'Message cannot exceed 5000 characters.',
        ]);

        ContactMessage::create([
            'name' => strip_tags($validated['name']),
            'email' => strtolower($validated['email']),
            'subject' => strip_tags($validated['subject']),
            'message' => trim($validated['message']),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'message' => 'Message sent successfully'
        ], 201);
    }
}
