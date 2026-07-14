<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
    protected $fillable = [
        'name', 
        'slug',
        'description',
        'image'
    ];

    protected $appends = ['image_url'];

    protected $hidden = ['image'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return url('storage/' . $this->image);
    }
}
