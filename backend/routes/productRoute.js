import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/productController.js';

const router = express.Router();
import Product from '../models/Product.js';
import Category from '../models/Category.js';

router.get('/seed', async (req, res) => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();

        const categories = await Category.insertMany([
            { name: 'Laptop' },
            { name: 'Gaming' },
            { name: 'Business' },
            { name: 'Convertible' },
            { name: 'Ultrabook' },
            { name: 'Workstation' },
            { name: '2-in-1' },
            { name: 'Creator' },
            { name: 'Lightweight' },
            { name: 'Premium' }
        ]);

        const catMap = {};
        categories.forEach(cat => catMap[cat.name] = cat.name);
        await Product.insertMany(
            [
                {
                    name: 'ASUS VivoBook E210MA-GJ001TS',
                    description: 'Compact and lightweight 11.6-inch laptop with Intel Celeron N4020 processor, 4GB RAM, and 128GB eMMC storage.',
                    price: 1499,
                    image: '/images/asus.jpg',
                    hoverImage:"/images/asusTop.jpg",
                    category: catMap['Laptop'],
                    stock: 5,
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'MacBook Pro 14',
                    description: 'Apple M2 chip, 8-core CPU, 10-core GPU, 16GB unified memory, 512GB SSD storage, 14-inch Liquid Retina XDR display.',
                    price: 1899,
                     hoverImage:"/images/macProTop.png",
                    category: catMap['Premium'],
                    stock: 7,
                    image: '/images/Macbook Pro.webp',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'ThinkPad Lenovo',
                    description: 'Intel Core i5 12th Gen processor, 16GB RAM, 512GB SSD storage, 14-inch Full HD anti-glare display.',
                    price: 2199,
                    hoverImage:"/images/ThinkPadLenovoTop.png",
                    category: catMap['Business'],
                    stock: 0,
                    image: '/images/lenovo.jpeg',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Acer Swift 5',
                    description: 'Intel Core i7 12th Gen processor, 16GB LPDDR5 RAM, 1TB SSD storage, 14-inch Full HD touchscreen display.',
                    price: 799,
                    hoverImage:"/images/AcerSwitchTop.png",
                    category: catMap['Ultrabook'],
                    stock: 0,
                    image: '/images/acer.jpeg',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    },

                },
                {
                    name: 'Dell XPS 13 Plus',
                    description: 'Intel Core i7 12th Gen processor, 16GB RAM, 512GB SSD, 13.4-inch InfinityEdge touchscreen.',
                    price: 1599,
                    stock: 10,
                    image: '/images/dell.webp',
                    hoverImage:"/images/delXPleft.png",
                    category: catMap['Premium'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'HP Spectre x360 14',
                    description: 'Intel Evo i7 12th Gen, 16GB RAM, 1TB SSD, 13.5-inch OLED touchscreen convertible.',
                    price: 1699,
                    hoverImage:"/images/HpLeft.png",
                    stock: 20,
                    image: '/images/hp.jpeg',
                    category: catMap['Convertible'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'ASUS ROG Zephyrus G14',
                    description: 'AMD Ryzen 9 6900HS, NVIDIA RTX 3060, 16GB RAM, 1TB SSD, 14-inch 120Hz QHD display.',
                    price: 1899,
                    stock: 0,
                    hoverImage:"/images/AsusRogLeft.png",
                    image: '/images/asusRog.jpeg',
                    category: catMap['Gaming'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Microsoft Surface Laptop 5',
                    description: '12th Gen Intel Core i5, 8GB RAM, 512GB SSD, 13.5-inch PixelSense touchscreen.',
                    price: 1299,
                    stock: 25,
                    image: '/images/surface.webp',
                    hoverImage:"/images/Surface5Left.png",
                    category: catMap['Lightweight'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Razer Blade 15 Advanced',
                    description: 'Intel Core i7 12th Gen, NVIDIA RTX 3070 Ti GPU, 16GB RAM, 1TB SSD.',
                    price: 2399,
                    stock: 0,
                    image: '/images/Razer.jpeg',
                    hoverImage:"/images/RazerLeft.png",
                    category: catMap['Gaming'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Lenovo Yoga 9i Gen 8',
                    category: catMap['2-in-1'],
                    description: 'Intel Core i7 13th Gen, 16GB RAM, 1TB SSD, 14-inch 2.8K OLED touchscreen convertible.',
                    price: 1799,
                    stock: 90,
                    image: '/images/LenovoYoga.webp',
                    hoverImage:"/images/YogaLeft.png",
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Acer Predator Helios 300',
                    description: 'Intel Core i7 12th Gen, NVIDIA RTX 3070, 16GB RAM, 1TB SSD.',
                    price: 1899,
                    stock: 80,
                    image: '/images/AcerPredator.jpeg',
                    hoverImage:"/images/PredatorLeft.png",
                    category: catMap['Gaming'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'LG Gram 17',
                    description: 'Intel Evo i7 12th Gen, 16GB RAM, 1TB SSD, 17-inch WQXGA IPS display.',
                    price: 1799,
                    category: catMap['Lightweight'],
                    hoverImage:"/images/LgLeft.png",
                    stock: 0,
                    image: '/images/LGGRAM.jpeg',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'HP Envy 16',
                    description: 'Intel Core i7 12th Gen, NVIDIA RTX 3060, 16GB RAM, 1TB SSD.',
                    price: 1699,
                    category: catMap['Creator'],
                    stock: 45,
                    image: '/images/Hp ENVY.jpeg',
                    hoverImage:"/images/EnvyLeft.png",
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Dell Inspiron 14 2-in-1',
                    description: 'Intel Core i5 12th Gen, 8GB RAM, 512GB SSD, 14-inch Full HD touchscreen convertible.',
                    price: 999,
                    category: catMap['2-in-1'],
                    stock: 89,
                    hoverImage:"/images/2in1Left.png",
                    image: '/images/DellInspiron.jpeg',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Lenovo IdeaPad Flex 5',
                    description: 'AMD Ryzen 5 7530U, 16GB RAM, 512GB SSD, 14-inch Full HD touchscreen convertible.',
                    price: 849,
                    stock: 34,
                    image: '/images/LenovoIdeaPad.jpg',
                    hoverImage:"/images/İdeaPadLeft.png",
                    category: catMap['Convertible'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'ASUS TUF Gaming F15',
                    description: 'Intel Core i7 12th Gen, NVIDIA RTX 3050 Ti, 16GB RAM, 512GB SSD, 15.6-inch Full HD 144Hz display.',
                    price: 1299,
                    stock: 67,
                    hoverImage:"/images/TufLeft.png",
                    image: '/images/AsusTUF.jpeg',
                    category: catMap['Gaming'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Microsoft Surface Pro 9',
                    category: catMap['2-in-1'],
                    description: '12th Gen Intel Core i5, 8GB RAM, 256GB SSD, 13-inch PixelSense Flow touchscreen with detachable keyboard.',
                    price: 1199,
                    hoverImage:"/images/SurfaceLeft.png",
                    stock: 0,
                    image: '/images/SurfacePro9.jpeg',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Apple MacBook Air M2',
                    description: 'Apple M2 chip with 8-core CPU and 10-core GPU, 8GB unified memory, 512GB SSD.',
                    price: 1299,
                    hoverImage:"/images/MacAirLeft.png",
                    stock: 15,
                    image: '/images/AppleMacbookAir.webp',
                    category: catMap['Ultrabook'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'MSI Creator Z16',
                    description: 'Intel Core i7 12th Gen, NVIDIA RTX 3060, 32GB RAM, 1TB SSD, 16-inch QHD+ touchscreen.',
                    price: 2399,
                    category: catMap['Creator'],
                    stock: 40,
                    hoverImage:"/images/MsiLeft.png",
                    image: '/images/MSI.jpeg',
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                },
                {
                    name: 'Huawei MateBook X Pro',
                    description: 'Intel Core i7 12th Gen, 16GB RAM, 1TB SSD, 14.2-inch 3.1K LTPS touchscreen.',
                    price: 1699,
                    stock: 30,
                    hoverImage:"/images/huaweiMateBookLeft.png",
                    image: '/images/huaweiMateBook.jpeg',
                    category: catMap['Premium'],
                    extraPrices: {
                        color: { Black: 50, White: 40 },
                        ram: { '8GB': 0, '16GB': 100, '32GB': 200 },
                        storage: { '256GB SSD': 0, '512GB SSD': 100, '1TB SSD': 200 },
                        gpu: { Integrated: 0, 'NVIDIA RTX 3050': 200, 'NVIDIA RTX 3060': 300 },
                        os: { 'Windows 11 Home': 0, 'Windows 11 Pro': 100 },
                        keyboard: { Backlit: 0, RGB: 50, Standard: 0 },
                        display: { 'Full HD': 0, QHD: 100, '4K OLED': 200 }
                    }
                }
            ])

        res.send('Database seeded!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error seeding database');
    }
});

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
