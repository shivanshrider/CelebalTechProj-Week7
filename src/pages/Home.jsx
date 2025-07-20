import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  Rating,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ShoppingBag,
  LocalShipping,
  Security,
  Support,
  Star,
  Favorite,
  Visibility,
  AddShoppingCart,
  ArrowForward,
  TrendingUp,
  Celebration,
  Verified,
  Diamond,
  AutoAwesome,
  WorkspacePremium,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
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

// Helper and mapping for images (keep only one instance)
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
const getImageForName = (name) => {
  const key = Object.keys(imageMap).find(k =>
    name.toLowerCase().includes(k)
  );
  return key ? imageMap[key] : noImage;
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { products } = useProducts();
  const { addToCart } = useCart();

  const featuredProducts = products.slice(0, 8);

  const categories = [
    {
      name: 'Sarees',
      image: 'saree.jpg',
      description: 'Elegant traditional sarees',
      count: '500+ Styles',
    },
    {
      name: 'Lehengas',
      image: 'lehenga.jpg',
      description: 'Bridal and party lehengas',
      count: '300+ Designs',
    },
    {
      name: 'Suits',
      image: 'suit.jpg',
      description: 'Contemporary ethnic suits',
      count: '200+ Collections',
    },
    {
      name: 'Jewelry',
      image: 'jewelry.jpg',
      description: 'Traditional jewelry pieces',
      count: '150+ Items',
    },
  ];

  const features = [
    {
      icon: <Verified sx={{ fontSize: 50, color: '#4CAF50' }} />,
      title: 'Authentic Products',
      description: 'Genuine Indian ethnic wear sourced directly from artisans across India. Every piece is handcrafted with traditional techniques.',
      highlight: '100% Authentic',
      color: '#4CAF50',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 50, color: '#2196F3' }} />,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹2000 across India. Express delivery available for urgent orders.',
      highlight: 'Free Delivery',
      color: '#2196F3',
    },
    {
      icon: <Security sx={{ fontSize: 50, color: '#FF9800' }} />,
      title: 'Secure Payment',
      description: '100% secure payment gateway with multiple options including UPI, cards, net banking, and COD.',
      highlight: '100% Secure',
      color: '#FF9800',
    },
    {
      icon: <Support sx={{ fontSize: 50, color: '#9C27B0' }} />,
      title: '24/7 Support',
      description: 'Round the clock customer support for your queries. WhatsApp, email, and phone support available.',
      highlight: 'Always Available',
      color: '#9C27B0',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, #1CA9A6 0%, #FFF8F0 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.2,
              }}
            >
              Discover Authentic Indian Fashion
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.95,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Your premier destination for authentic Indian ethnic wear. We offer a curated collection
              of sarees, lehengas, kurtas, and traditional jewelry from across India.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                startIcon={<ShoppingBag />}
                sx={{
                  background: 'linear-gradient(90deg, #1CA9A6 0%, #FFC857 100%)',
                  color: '#FFF',
                  fontWeight: 700,
                  fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif',
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(28, 169, 166, 0.15)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #FFC857',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #D7263D 0%, #FFC857 100%)',
                    color: '#FFF',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(28, 169, 166, 0.18)',
                    border: '1px solid #FFC857',
                  },
                }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/products"
                endIcon={<ArrowForward />}
                sx={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  borderWidth: 3,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderColor: '#FFFFFF',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
                  },
                }}
              >
                View Collections
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section - Improved */}
      <Box sx={{ 
        py: 10, 
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFC857 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(28,169,166,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(215,38,61,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{ 
                fontWeight: 700, 
                color: '#8B4513',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Why Choose Us
            </Typography>
            <Typography
              variant="h6"
              sx={{ 
                color: '#5D4037',
                maxWidth: '600px',
                mx: 'auto',
                opacity: 0.8,
                lineHeight: 1.6,
              }}
            >
              We bring you the finest Indian ethnic wear with unmatched quality, service, and authenticity
            </Typography>
          </Box>
          
          {/* Single Row Layout */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  aspectRatio: '1',
                  textAlign: 'center',
                  p: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
                  border: '1px solid rgba(139, 69, 19, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 60px rgba(139, 69, 19, 0.15)',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                    '& .feature-highlight': {
                      transform: 'scale(1.05)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                  },
                }}
              >
                <Box 
                  className="feature-icon"
                  sx={{ 
                    mb: 2,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600, 
                    color: '#8B4513',
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2, 
                    lineHeight: 1.6,
                    fontSize: '0.85rem',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {feature.description}
                </Typography>
                
                <Chip
                  className="feature-highlight"
                  label={feature.highlight}
                  size="small"
                  sx={{
                    backgroundColor: `${feature.color}15`,
                    color: feature.color,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    transition: 'all 0.3s ease',
                    '& .MuiChip-label': {
                      px: 1.5,
                    },
                  }}
                />
              </Card>
            ))}
          </Box>
          
          {/* Additional Stats Section */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Divider sx={{ mb: 4, borderColor: 'rgba(139, 69, 19, 0.2)' }} />
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#8B4513', mb: 1 }}>
                    10K+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Happy Customers
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#8B4513', mb: 1 }}>
                    500+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Styles
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#8B4513', mb: 1 }}>
                    50+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cities Served
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#8B4513', mb: 1 }}>
                    4.9★
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customer Rating
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 600, color: '#8B4513' }}
          >
            Shop by Category
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}>
            {categories.map((category, index) => (
              <Card
                key={index}
                component={Link}
                to={`/products?category=${category.name}`}
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
                  border: '1px solid #FFC857',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(28, 169, 166, 0.15)',
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={getImageForName(category.name)}
                  alt={category.name}
                  className="category-image"
                  sx={{
                    transition: 'transform 0.3s ease',
                  }}
                />
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#8B4513' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.85rem' }}>
                    {category.description}
                  </Typography>
                  <Chip
                    label={category.count}
                    color="secondary"
                    size="small"
                    sx={{ fontWeight: 500, fontSize: '0.75rem', background: '#FFC857', color: '#1B5E20' }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ py: 8, backgroundColor: '#FFF8F0' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ fontWeight: 600, color: '#8B4513' }}>
              Featured Products
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="outlined"
              endIcon={<ArrowForward />}
              sx={{
                borderColor: '#8B4513',
                color: '#8B4513',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#A0522D',
                  backgroundColor: 'rgba(139, 69, 19, 0.05)',
                },
              }}
            >
              View All
            </Button>
          </Box>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}>
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
                  border: '1px solid #1CA9A6',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(28, 169, 166, 0.15)',
                    '& .product-image': {
                      transform: 'scale(1.1)',
                    },
                    '& .product-actions': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImageForName(product.name)}
                    alt={product.name}
                    className="product-image"
                    sx={{
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <Box
                    className="product-actions"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': { backgroundColor: 'white' },
                      }}
                    >
                      <Favorite fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': { backgroundColor: 'white' },
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#8B4513', fontSize: '0.9rem' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5, fontSize: '0.8rem' }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#D2691E', fontSize: '0.9rem' }}>
                      ₹{product.price.toLocaleString()}
                    </Typography>
                    <Chip label={product.category} color="primary" size="small" sx={{ fontSize: '0.7rem' }} />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddShoppingCart />}
                    size="small"
                    onClick={() => addToCart(product, 1)}
                    sx={{
                      backgroundColor: '#1CA9A6',
                      color: '#FFF',
                      fontWeight: 700,
                      fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif',
                      fontSize: '0.9rem',
                      py: 0.5,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#D7263D',
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Promotional Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: 6,
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
              },
            }}
          >
            <Celebration sx={{ fontSize: 60, mb: 2, color: '#FFD700' }} />
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              New Collection Launch
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
              Discover our latest collection of designer ethnic wear. Handcrafted with love and attention
              to detail, each piece tells a story of tradition and elegance.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              startIcon={<TrendingUp />}
              sx={{
                backgroundColor: '#FFD700',
                color: '#8B4513',
                fontWeight: 600,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: '#FFC107',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
                },
              }}
            >
              Explore Collection
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 