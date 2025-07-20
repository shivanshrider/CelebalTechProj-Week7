import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Pagination,
  Paper,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Divider,
} from '@mui/material';
import {
  FilterList,
  Sort,
  Search,
  ShoppingCart,
  Favorite,
  Visibility,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import cottonSaree from '../assets/Cotton Saree.jpg';
import palazzoSuit from '../assets/Palazzo Suit.jpg';
import silkDupatta from '../assets/Silk Dupatta.jpg';
import bridalLehenga from '../assets/Bridal Lehenga.jpg';
import anarkaliSuit from '../assets/Anarkali Suit.jpg';
import cottonKurta from '../assets/Cotton Kurta.jpg';
import designerLehenga from '../assets/Designer Lehenga.jpg';
import silkSaree from '../assets/silk saree.jpg';
import sarees from '../assets/Sarees.jpg';
import lehengas from '../assets/Lehengas.jpg';
import suits from '../assets/Suits.jpg';
import jewely from '../assets/Jewely.jpg';
import bridalJewelrySet from '../assets/Bridal Jewelry Set.jpg';
import designerKurti from '../assets/Designer Kurti.jpg';
import indoWesternDress from '../assets/Indo-Western Dress.jpg';
import silkBlouse from '../assets/Silk Blouse.jpg';
import noImage from '../assets/no-image.jpg';

const UNSPLASH_ACCESS_KEY = "DemoKey"; // Replace with your own for production

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [fashionImages, setFashionImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  const productsPerPage = 12;

  // Get category from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Categories for filter
  const categories = ['Sarees', 'Lehengas', 'Suits', 'Kurtas', 'Jewelry'];

  useEffect(() => {
    // Fetch fashion images from Unsplash
    fetch(
      `https://api.unsplash.com/search/photos?query=fashion%20clothes&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFashionImages(data.results || []);
        setImagesLoading(false);
      })
      .catch(() => setImagesLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 30000]);
    setSortBy('name');
    setCurrentPage(1);
  };

  const FilterSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filters
      </Typography>
      
      {/* Search */}
      <TextField
        fullWidth
        label="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />

      {/* Category Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Price Range (₹)</Typography>
        <Slider
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={30000}
          step={500}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">₹{priceRange[0].toLocaleString()}</Typography>
          <Typography variant="body2">₹{priceRange[1].toLocaleString()}</Typography>
        </Box>
      </Box>

      {/* Sort */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="name">Name A-Z</MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
          <MenuItem value="newest">Newest First</MenuItem>
        </Select>
      </FormControl>

      {/* Clear Filters */}
      <Button
        variant="outlined"
        fullWidth
        onClick={clearFilters}
        sx={{ mb: 2 }}
      >
        Clear Filters
      </Button>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary">
        {filteredProducts.length} products found
      </Typography>
    </Paper>
  );

  // Helper to normalize and match product names to asset images
  const imageMap = {
    'cotton saree': cottonSaree,
    'palazzo suit': palazzoSuit,
    'silk dupatta': silkDupatta,
    'bridal lehenga': bridalLehenga,
    'anarkali suit': anarkaliSuit,
    'cotton kurta': cottonKurta,
    'designer lehenga': designerLehenga,
    'silk saree': silkSaree,
    'sarees': sarees,
    'lehengas': lehengas,
    'suits': suits,
    'jewely': jewely,
    'bridal jewelry set': bridalJewelrySet,
    'designer kurti': designerKurti,
    'indo-western dress': indoWesternDress,
    'silk blouse': silkBlouse,
  };
  const getImageForProduct = (name) => {
    const key = Object.keys(imageMap).find(k =>
      name.toLowerCase().includes(k)
    );
    return key ? imageMap[key] : noImage;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, background: 'linear-gradient(135deg, #FFF8F0 0%, #E3F2FD 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
          Our Collections
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
          Discover our curated collection of authentic Indian ethnic wear
        </Typography>
      </Box>

      {/* Main Side-by-Side Layout */}
      <Grid container spacing={4} alignItems="flex-start">
        {/* Fashion Images - Left Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
              Fashion Inspiration
            </Typography>
            {imagesLoading ? (
              <Typography>Loading images...</Typography>
            ) : (
              <Grid container spacing={2}>
                {fashionImages.map((img) => (
                  <Grid item xs={6} sm={4} md={12} key={img.id}>
                    <Card sx={{ mb: 2, borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={img.urls.small}
                        alt={img.alt_description || 'Fashion'}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ p: 1 }}>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {img.alt_description || 'Fashion'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>

        {/* Products & Filters - Right Column */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: { xs: 1, md: 3 }, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #FFC857', borderRadius: 4 }}>
            {/* Mobile Filter Button */}
            {isMobile && (
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setMobileFilterOpen(true)}
                  fullWidth
                >
                  Filters & Sort
                </Button>
              </Box>
            )}

            <Grid container spacing={3}>
              {/* Filters - Desktop */}
              {!isMobile && (
                <Grid item xs={12} md={4}>
                  <FilterSection />
                </Grid>
              )}

              {/* Products */}
              <Grid item xs={12} md={isMobile ? 12 : 8}>
                {/* View Mode Toggle */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    {filteredProducts.length} Products
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => setViewMode('grid')}
                      color={viewMode === 'grid' ? 'primary' : 'default'}
                    >
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.5 }}>
                        <Box sx={{ width: 4, height: 4, bgcolor: 'currentColor' }} />
                        <Box sx={{ width: 4, height: 4, bgcolor: 'currentColor' }} />
                        <Box sx={{ width: 4, height: 4, bgcolor: 'currentColor' }} />
                        <Box sx={{ width: 4, height: 4, bgcolor: 'currentColor' }} />
                      </Box>
                    </IconButton>
                    <IconButton
                      onClick={() => setViewMode('list')}
                      color={viewMode === 'list' ? 'primary' : 'default'}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ width: 16, height: 2, bgcolor: 'currentColor' }} />
                        <Box sx={{ width: 16, height: 2, bgcolor: 'currentColor' }} />
                        <Box sx={{ width: 16, height: 2, bgcolor: 'currentColor' }} />
                      </Box>
                    </IconButton>
                  </Box>
                </Box>

                {/* Products Grid - CSS Grid for side-by-side layout */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  {paginatedProducts.map((product) => (
                    <Card
                      key={product.id}
                      sx={{
                        height: 420,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        borderRadius: 4,
                        boxShadow: 6,
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
                        border: '1px solid #1CA9A6',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-6px) scale(1.02)',
                          boxShadow: 12,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180, mb: 2, flexShrink: 0, px: 2, pt: 2 }}>
                        <CardMedia
                          component="img"
                          image={getImageForProduct(product.name)}
                          alt={product.name}
                          sx={{
                            height: 160,
                            width: 'auto',
                            maxWidth: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                            background: '#f5f5f5',
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 0, px: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48, fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          {product.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            ₹{product.price.toLocaleString()}
                          </Typography>
                          <Chip label={product.category} size="small" color="secondary" sx={{ fontWeight: 500, background: '#FFC857', color: '#1B5E20', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }} />
                        </Box>
                      </CardContent>
                      <Box sx={{ mt: 'auto', px: 2, pb: 2 }}>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<ShoppingCart />}
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            borderRadius: 2,
                            fontWeight: 700,
                            fontSize: '1rem',
                            background: 'linear-gradient(90deg, #1CA9A6 0%, #FFC857 100%)',
                            color: '#fff',
                            fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif',
                            boxShadow: '0 2px 8px rgba(28,169,166,0.08)',
                            '&:hover': {
                              background: 'linear-gradient(90deg, #D7263D 0%, #FFC857 100%)',
                            },
                          }}
                          fullWidth
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Card>
                  ))}
                </Box>

                {/* No Products Found */}
                {paginatedProducts.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" gutterBottom color="text.secondary">
                      No products found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Try adjusting your filters or search terms
                    </Typography>
                    <Button variant="outlined" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </Box>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setMobileFilterOpen(false)}>
            <Box sx={{ width: 20, height: 2, bgcolor: 'currentColor', transform: 'rotate(45deg)' }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <FilterSection />
      </Drawer>
    </Container>
  );
};

export default Products; 