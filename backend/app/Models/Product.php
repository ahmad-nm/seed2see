<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'carbon_score',
        'is_sustainable',
        'category_id'
    ];

    protected $appends = ['image_url'];

    // Each product belongs to one category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return url('storage/' . $this->image);
    }
}
