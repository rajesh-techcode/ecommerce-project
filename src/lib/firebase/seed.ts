import { db } from './config';
import { collection, addDoc } from 'firebase/firestore';

const mockProducts = [
  // ELECTRONICS
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.00,
    description: "Industry-leading noise cancellation. Two processors control 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise canceling is automatically optimized based on your wearing conditions and environment.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop"
  },
  {
    name: "Apple Watch Series 9",
    price: 399.00,
    description: "The most powerful chip ever in Apple Watch. A magical new way to use your watch without touching the screen. A display that's twice as bright.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1434493789847-2902a52dda56?w=800&auto=format&fit=crop"
  },
  {
    name: "Nikon Z fc Mirrorless Camera",
    price: 1096.95,
    description: "Classic tactile design meets modern Z series technology. Equipped with a 20.9MP DX-format sensor and 4K UHD video capability.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop"
  },
  {
    name: "Mechanical Keyboard Keychron K2",
    price: 89.99,
    description: "A 75% layout (84-key) RGB backlight compact Bluetooth mechanical keyboard. Aluminum frame designed for Mac and Windows.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop"
  },

  // CLOTHING
  {
    name: "Premium Cotton Oxford Shirt",
    price: 65.00,
    description: "A timeless wardrobe essential. This Oxford cloth button-down shirt is made from 100% organic cotton, offering a perfect balance between casual and formal wear.",
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop"
  },
  {
    name: "Essential Leather Sneaker",
    price: 125.00,
    description: "Handcrafted in Portugal from premium full-grain Italian leather. These minimalist sneakers are designed for extreme comfort and versatility.",
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop"
  },
  {
    name: "Classic Denim Jacket",
    price: 89.00,
    description: "Vintage wash denim jacket with a relaxed fit. The perfect layering piece for any season, featuring classic metal button hardware.",
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1576871337645-2cbcf0dbdf34?w=800&auto=format&fit=crop"
  },
  {
    name: "Cashmere Winter Beanie",
    price: 45.00,
    description: "Stay incredibly warm with this 100% pure cashmere ribbed beanie. Soft, breathable, and never itchy.",
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop"
  },

  // HOME & GARDEN
  {
    name: "Minimalist Ceramic Coffee Mug",
    price: 24.50,
    description: "Handcrafted ceramic coffee mug with a beautiful matte finish. Perfect for your morning coffee or evening tea. Microwave and dishwasher safe.",
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop"
  },
  {
    name: "Mid-Century Modern Plant Stand",
    price: 89.99,
    description: "Elevate your indoor plants with this solid walnut wood plant stand. Inspired by mid-century modern design principles.",
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop"
  },
  {
    name: "Monstera Deliciosa (Swiss Cheese Plant)",
    price: 45.00,
    description: "A beautiful, easy-to-care-for tropical houseplant. Features iconic split leaves that add a vibrant touch of green to any room.",
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop"
  },
  {
    name: "Hand-poured Soy Wax Candle",
    price: 32.00,
    description: "Sandalwood and vanilla scented candle. 60-hour burn time. Made with non-toxic, eco-friendly soy wax and a crackling wood wick.",
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop"
  },

  // BEAUTY & HEALTH
  {
    name: "Organic Vitamin C Serum",
    price: 45.00,
    description: "Revitalize your skin with our potent, organic Vitamin C serum. Designed to brighten uneven skin tones while diminishing the look of fine lines.",
    category: "Beauty & Health",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop"
  },
  {
    name: "Charcoal Purifying Face Wash",
    price: 18.00,
    description: "Deep-cleaning facial cleanser infused with activated charcoal to draw out impurities and leave your skin feeling refreshed.",
    category: "Beauty & Health",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop"
  },
  {
    name: "Bamboo Toothbrush (4-Pack)",
    price: 12.00,
    description: "Eco-friendly, biodegradable bamboo toothbrushes with charcoal-infused soft bristles. The perfect sustainable alternative to plastic.",
    category: "Beauty & Health",
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f4bea4936?w=800&auto=format&fit=crop"
  },
  {
    name: "Himalayan Pink Bath Salts",
    price: 22.00,
    description: "Relax and detoxify with 100% pure Himalayan pink salt, infused with lavender essential oils for a spa-like bath experience.",
    category: "Beauty & Health",
    imageUrl: "https://images.unsplash.com/photo-1549405626-d3c52a5c4002?w=800&auto=format&fit=crop"
  }
];

export const seedMockProducts = async () => {
  let count = 0;
  for (const product of mockProducts) {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date().toISOString()
    });
    count++;
  }
  return count;
};
