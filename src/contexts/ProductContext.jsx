import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

// Indian Fashion Product Data
const sampleProducts = [
  {
    id: 1,
    name: "Silk Saree - Banarasi",
    price: 8999,
    category: "Sarees",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Exquisite Banarasi silk saree with intricate zari work and traditional motifs. Perfect for weddings and special occasions.",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    features: ["Pure Silk", "Handcrafted", "Traditional Motifs", "6 Yards"]
  },
  {
    id: 2,
    name: "Designer Lehenga - Royal Blue",
    price: 15999,
    category: "Lehengas",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Stunning designer lehenga with heavy embroidery, sequins, and mirror work. Ideal for wedding ceremonies.",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    features: ["Heavy Embroidery", "Sequins Work", "Mirror Details", "Bridal Collection"]
  },
  {
    id: 3,
    name: "Cotton Kurta - Ethnic Print",
    price: 1299,
    category: "Kurtas",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Comfortable cotton kurta with traditional ethnic prints. Perfect for daily wear and casual occasions.",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    features: ["100% Cotton", "Ethnic Prints", "Comfortable Fit", "Daily Wear"]
  },
  {
    id: 4,
    name: "Anarkali Suit - Party Wear",
    price: 3499,
    category: "Suits",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Elegant Anarkali suit with modern design and comfortable fit. Perfect for parties and celebrations.",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    features: ["Anarkali Style", "Party Wear", "Modern Design", "Comfortable"]
  },
  {
    id: 5,
    name: "Bridal Lehenga - Red & Gold",
    price: 25999,
    category: "Lehengas",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Magnificent bridal lehenga with heavy gold work and traditional red color. Perfect for the main wedding ceremony.",
    rating: 4.9,
    reviews: 67,
    inStock: false,
    features: ["Bridal Collection", "Heavy Gold Work", "Traditional Red", "Made to Order"]
  },
  {
    id: 6,
    name: "Silk Dupatta - Embroidered",
    price: 2499,
    category: "Dupattas",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Beautiful silk dupatta with hand embroidery and traditional patterns. Perfect to complement any ethnic outfit.",
    rating: 4.4,
    reviews: 145,
    inStock: true,
    features: ["Pure Silk", "Hand Embroidery", "Traditional Patterns", "Versatile"]
  },
  {
    id: 7,
    name: "Palazzo Suit - Indo-Western",
    price: 2299,
    category: "Suits",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Trendy palazzo suit combining traditional and modern elements. Perfect for contemporary Indian fashion.",
    rating: 4.3,
    reviews: 203,
    inStock: true,
    features: ["Indo-Western", "Palazzo Style", "Modern Design", "Comfortable"]
  },
  {
    id: 8,
    name: "Cotton Saree - Handloom",
    price: 1899,
    category: "Sarees",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Handloom cotton saree with traditional weaves and natural dyes. Perfect for daily wear and office.",
    rating: 4.5,
    reviews: 189,
    inStock: true,
    features: ["Handloom", "Natural Dyes", "Traditional Weaves", "Daily Wear"]
  },
  {
    id: 9,
    name: "Designer Kurti - Embroidered",
    price: 1799,
    category: "Kurtis",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Stylish designer kurti with beautiful embroidery and modern cuts. Perfect for casual and semi-formal occasions.",
    rating: 4.4,
    reviews: 167,
    inStock: true,
    features: ["Designer Cut", "Embroidered", "Modern Style", "Versatile"]
  },
  {
    id: 10,
    name: "Bridal Jewelry Set - Kundan",
    price: 8999,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Exquisite kundan jewelry set with traditional designs. Perfect to complement bridal and party wear.",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    features: ["Kundan Work", "Traditional Design", "Bridal Collection", "Complete Set"]
  },
  {
    id: 11,
    name: "Silk Blouse - Designer",
    price: 3499,
    category: "Blouses",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Designer silk blouse with intricate work and modern design. Perfect to pair with sarees and lehengas.",
    rating: 4.6,
    reviews: 134,
    inStock: true,
    features: ["Pure Silk", "Designer Work", "Modern Cut", "Versatile"]
  },
  {
    id: 12,
    name: "Indo-Western Dress - Fusion",
    price: 4299,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Beautiful fusion dress combining Indian and Western elements. Perfect for modern Indian women.",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    features: ["Fusion Design", "Indo-Western", "Modern Style", "Comfortable"]
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...new Set(products.map(product => product.category))];

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const value = {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    categories,
    getProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}; 