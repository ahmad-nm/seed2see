<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class AdminMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::latest()
            ->paginate(15);

        return response()->json($messages);
    }

    public function show(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);

        $message->update([
            'is_read' => true
        ]);

        activity()
            ->performedOn($message)
            ->causedBy($request->user())
            ->log('Contact message read');

        return response()->json($message);
    }

    public function toggleMarkAsRead(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);

        $message->update([
            'is_read' => !$message->is_read
        ]);

        activity()
            ->performedOn($message)
            ->causedBy($request->user())
            ->log('Contact message marked as read toggled');

        return response()->json([
            'message' => 'Updated'
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);

        $message->delete();

        activity()
            ->performedOn($message)
            ->causedBy($request->user())
            ->log('Contact message deleted');

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}
