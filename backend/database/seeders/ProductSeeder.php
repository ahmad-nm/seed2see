<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->warn("No categories found. Seed categories first.");
            return;
        }

        $products = [
            [
                'name' => 'Organic Rose Seeds',
                'description' => 'High quality organic rose seeds for home gardening.',
                'price' => 5.99,
                'stock' => 120,
                'carbon_score' => 2.1,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Lavender Seed Pack',
                'description' => 'Calming lavender seeds for aromatic gardens.',
                'price' => 4.50,
                'stock' => 200,
                'carbon_score' => 1.8,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Sunflower Seeds Premium',
                'description' => 'Fast-growing sunflower seeds.',
                'price' => 3.99,
                'stock' => 150,
                'carbon_score' => 2.5,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Basil Herb Seeds',
                'description' => 'Fresh basil seeds for kitchen gardening.',
                'price' => 2.99,
                'stock' => 300,
                'carbon_score' => 1.2,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Mint Seed Kit',
                'description' => 'Easy-to-grow mint seeds.',
                'price' => 3.20,
                'stock' => 180,
                'carbon_score' => 1.0,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Cherry Tomato Seeds',
                'description' => 'Sweet cherry tomatoes for small gardens.',
                'price' => 6.50,
                'stock' => 140,
                'carbon_score' => 2.7,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Cucumber Seeds',
                'description' => 'Fast-growing cucumber plants.',
                'price' => 3.80,
                'stock' => 160,
                'carbon_score' => 2.2,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Carrot Seed Pack',
                'description' => 'Organic carrot seeds.',
                'price' => 2.50,
                'stock' => 220,
                'carbon_score' => 1.4,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Aloe Vera Seeds',
                'description' => 'Medicinal aloe vera seeds.',
                'price' => 5.20,
                'stock' => 90,
                'carbon_score' => 1.9,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Spinach Seeds',
                'description' => 'Nutrient-rich spinach seeds.',
                'price' => 2.80,
                'stock' => 250,
                'carbon_score' => 1.1,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Cactus Mix Seeds',
                'description' => 'Assorted cactus seeds.',
                'price' => 7.99,
                'stock' => 80,
                'carbon_score' => 1.6,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Wildflower Mix',
                'description' => 'Beautiful wildflower garden mix.',
                'price' => 4.99,
                'stock' => 170,
                'carbon_score' => 2.0,
                'is_sustainable' => true,
            ],
            [
                'name' => 'Strawberry Seeds',
                'description' => 'Sweet strawberry growing kit.',
                'price' => 6.20,
                'stock' => 110,
                'carbon_score' => 2.4,
                'is_sustainable' => true,
            ],
        ];

        foreach ($products as $index => $product) {

            $category = $categories[$index % $categories->count()];

            Product::create([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'carbon_score' => $product['carbon_score'],
                'is_sustainable' => $product['is_sustainable'],
                'category_id' => $category->id,
                'image' => null, // or fake path like 'products/sample.jpg'
            ]);
        }
    }
}