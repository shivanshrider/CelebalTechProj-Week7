import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  TextField,
  Divider,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Share,
  Star,
  LocalShipping,
  Security,
  Support,
  CheckCircle,
  Visibility,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, getCartCount } = useCart();

  const [selectedTab, setSelectedTab] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Product Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The product you're looking for doesn't exist.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ paddingTop: 20 }}>
      {value === index && children}
    </div>
  );

  const features = [
    'Handcrafted by skilled artisans',
    'Premium quality materials',
    'Traditional Indian craftsmanship',
    'Perfect for special occasions',
    'Easy to maintain and care',
    'Authentic ethnic design',
  ];

  const reviews = [
    {
      id: 1,
      user: 'Priya Sharma',
      rating: 5,
      date: '2024-01-15',
      comment: 'Beautiful saree! The quality is excellent and it looks exactly like the picture. Highly recommended!',
      avatar: 'P',
    },
    {
      id: 2,
      user: 'Anjali Patel',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great product, fast delivery. The fabric is soft and comfortable. Will definitely buy again.',
      avatar: 'A',
    },
    {
      id: 3,
      user: 'Meera Singh',
      rating: 5,
      date: '2024-01-05',
      comment: 'Absolutely stunning! Perfect for my wedding. The embroidery work is amazing.',
      avatar: 'M',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, background: 'linear-gradient(135deg, #FFF8F0 0%, #E3F2FD 100%)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
          <Button onClick={() => navigate('/')} sx={{ p: 0, minWidth: 'auto' }}>
            Home
          </Button>
          {' > '}
          <Button onClick={() => navigate('/products')} sx={{ p: 0, minWidth: 'auto' }}>
            Products
          </Button>
          {' > '}
          <Button onClick={() => navigate(`/products?category=${product.category}`)} sx={{ p: 0, minWidth: 'auto' }}>
            {product.category}
          </Button>
          {' > '}
          <Typography component="span" variant="body2">
            {product.name}
          </Typography>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '2px solid #1CA9A6', borderRadius: 4, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)' }}>
            <CardMedia
              component="img"
              height="500"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} elevation={0} sx={{ border: 1, borderColor: 'divider', cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  height="80"
                  image={product.image}
                  alt={`${product.name} ${index}`}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={product.rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviews} reviews)
              </Typography>
              <Chip label={product.category} color="secondary" size="small" sx={{ fontWeight: 500, background: '#FFC857', color: '#1B5E20', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }} />
            </Box>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
              ₹{product.price.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
              {product.description}
            </Typography>
          </Box>

          {/* Size Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Size
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedSize(size)}
                  sx={{ minWidth: 50 }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Color Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Color
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Quantity */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quantity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                type="number"
                size="small"
                sx={{ width: 80 }}
                inputProps={{ min: 1 }}
              />
              <Button
                variant="outlined"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
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
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleBuyNow}
              sx={{ flexGrow: 1 }}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Favorite />}
            >
              Wishlist
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Share />}
            >
              Share
            </Button>
          </Box>

          {/* Features */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Product Features
            </Typography>
            <List dense>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Shipping Info */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping & Returns
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <LocalShipping color="primary" />
              <Typography variant="body2">
                Free shipping on orders above ₹2000
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Security color="primary" />
              <Typography variant="body2">
                Secure payment with 100% buyer protection
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Support color="primary" />
              <Typography variant="body2">
                Easy returns within 30 days
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
          <Tab label="Care Instructions" />
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {product.description}
            <br /><br />
            This exquisite piece showcases the rich heritage of Indian craftsmanship. Each detail has been carefully 
            crafted by skilled artisans using traditional techniques passed down through generations. The fabric is 
            sourced from the finest mills in India, ensuring both comfort and durability.
            <br /><br />
            Perfect for special occasions like weddings, festivals, and cultural celebrations. The design incorporates 
            traditional motifs while maintaining contemporary appeal, making it suitable for both formal and casual events.
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List>
                <ListItem>
                  <ListItemText primary="Material" secondary="Pure Silk" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Length" secondary="5.5 meters" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Width" secondary="1.2 meters" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Weight" secondary="250 grams" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List>
                <ListItem>
                  <ListItemText primary="Care" secondary="Dry clean only" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Origin" secondary="Varanasi, India" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Style" secondary="Traditional" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Occasion" secondary="Wedding, Festival" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Reviews
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={product.rating} readOnly />
              <Typography variant="body1">
                {product.rating} out of 5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on {product.reviews} reviews
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              placeholder="Write a review..."
              multiline
              rows={3}
              fullWidth
            />
            <Button variant="contained">
              Submit Review
            </Button>
          </Box>

          <Box>
            {reviews.map((review) => (
              <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>{review.avatar}</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">{review.user}</Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </Paper>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
          <Typography variant="h6" gutterBottom>
            Care Instructions
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Dry Cleaning Recommended" 
                secondary="For best results, dry clean this garment to maintain its quality and appearance."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Storage" 
                secondary="Store in a cool, dry place away from direct sunlight. Use a cotton cover for protection."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Ironing" 
                secondary="Iron on low heat setting. Use a pressing cloth to protect the fabric."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Avoid" 
                secondary="Do not bleach or use harsh detergents. Avoid exposure to strong perfumes or chemicals."
              />
            </ListItem>
          </List>
        </TabPanel>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Related Products
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={relatedProduct.image}
                    alt={relatedProduct.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {relatedProduct.description.substring(0, 60)}...
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ₹{relatedProduct.price.toLocaleString()}
                      </Typography>
                      <Rating value={relatedProduct.rating} readOnly size="small" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail; 