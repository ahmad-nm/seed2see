import sfseed from '../assets/images/products/pd1.jpg';
import mixedVegetableSeeds from '../assets/images/products/pd2.jpg';
import flowerWaterSpray from '../assets/images/products/pd3.jpg';
import roseWater from '../assets/images/products/pd4.jpg';
import herbalSoap from '../assets/images/products/pd5.jpg';
import rawSilkCocoons from '../assets/images/products/pd6.jpg';

export const products = [
    {
        id: 1,
        category: "seeds",
        name: "Sunflower Seeds",
        slug: "sunflower-seeds",
        image: sfseed,
        description: "Sunflower seeds for home planting.",
        price: 1.49
    },
    {
        id: 2,
        category: "seeds",
        name: "Mixed Vegetable Seeds",
        slug: "mixed-vegetable-seeds",
        image: mixedVegetableSeeds,
        description: "A versatile seed pack for small gardens.",
        price: 1.99
    },
    {
        id: 3,
        category: "flowers-water",
        name: "Flower Water Spray",
        slug: "flower-water-spray",
        image: flowerWaterSpray,
        description: "Fresh spray water for flowers.",
        price: 0.99
    },
    {
        id: 4,
        category: "flowers-water",
        name: "Rose Water",
        slug: "rose-water",
        image: roseWater,
        description: "Gentle floral water for daily use.",
        price: 1.29
    },
    {
        id: 5,
        category: "soaps",
        name: "Herbal Soap",
        slug: "herbal-soap",
        image: herbalSoap,
        description: "Mild soap for everyday hygiene.",
        price: 0.79
    },
    {
        id: 6,
        category: "silk-cocoons",
        name: "Raw Silk Cocoons",
        slug: "raw-silk-cocoons",
        image: rawSilkCocoons,
        description: "Premium cocoons for silk crafting.",
        price: 2.49
    }
];