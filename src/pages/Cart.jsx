import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Grid,
  Paper,
  Divider,
  TextField,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalShipping,
  Security,
  Support,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const cart = items || [];

  const shippingThreshold = 2000;
  const shippingCost = 199;
  const taxRate = 0.18; // 18% GST

  const subtotal = getCartTotal();
  const shipping = subtotal >= shippingThreshold ? 0 : shippingCost;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(135deg, #FFF8F0 0%, #E3F2FD 100%)', minHeight: '100vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
            Looks like you haven't added any beautiful Indian ethnic wear to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            sx={{ mr: 2, background: 'linear-gradient(90deg, #1CA9A6 0%, #FFC857 100%)', color: '#fff', fontWeight: 700, fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif', borderRadius: 2 }}
          >
            Start Shopping
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
            sx={{ borderColor: '#1CA9A6', color: 'primary.main', fontWeight: 700, fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif', borderRadius: 2 }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, background: 'linear-gradient(135deg, #FFF8F0 0%, #E3F2FD 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
          You have {getCartCount()} items in your cart
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Cart Items */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #FFC857', borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
              Cart Items ({cart.length})
            </Typography>
            
            {cart.map((item) => (
              <Box key={item.id}>
                <Card sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #1CA9A6', borderRadius: 4 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%', sm: 150 },
                      height: { xs: 200, sm: 150 },
                      objectFit: 'cover',
                    }}
                    image={item.image}
                    alt={item.name}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          {item.description}
                        </Typography>
                        <Chip label={item.category} size="small" color="secondary" sx={{ fontWeight: 500, background: '#FFC857', color: '#1B5E20', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }} />
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        ₹{item.price.toLocaleString()}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          type="number"
                          size="small"
                          sx={{ width: 60 }}
                          inputProps={{ min: 1 }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Total: ₹{(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
                <Divider />
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleContinueShopping}
                sx={{ borderColor: '#1CA9A6', color: 'primary.main', fontWeight: 700, fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif', borderRadius: 2 }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                sx={{ borderColor: '#D7263D', color: '#D7263D', fontWeight: 700, fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif', borderRadius: 2 }}
              >
                Clear Cart
              </Button>
            </Box>
          </Paper>

          {/* Shipping Info */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocalShipping color="primary" />
                  <Typography variant="body2">
                    Free Shipping
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  On orders above ₹{shippingThreshold.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Security color="primary" />
                  <Typography variant="body2">
                    Secure Payment
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  100% buyer protection
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Support color="primary" />
                  <Typography variant="body2">
                    Easy Returns
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  30-day return policy
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Order Summary */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal ({getCartCount()} items)</Typography>
                <Typography variant="body2">₹{subtotal.toLocaleString()}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Shipping</Typography>
                <Typography variant="body2">
                  {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Tax (18% GST)</Typography>
                <Typography variant="body2">₹{tax.toLocaleString()}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                  ₹{total.toLocaleString()}
                </Typography>
              </Box>

              {subtotal < shippingThreshold && (
                <Box sx={{ 
                  backgroundColor: '#FFF3E0', 
                  p: 2, 
                  borderRadius: 1, 
                  mb: 2,
                  border: '1px solid #FFB74D'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Add ₹{(shippingThreshold - subtotal).toLocaleString()} more for free shipping!
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCheckout}
              sx={{ mb: 2 }}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>

            {/* Promo Code */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Have a promo code?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="Enter code"
                  size="small"
                  fullWidth
                />
                <Button variant="outlined" size="small">
                  Apply
                </Button>
              </Box>
            </Box>

            {/* Payment Methods */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                We Accept
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Credit Card" size="small" />
                <Chip label="Debit Card" size="small" />
                <Chip label="UPI" size="small" />
                <Chip label="Net Banking" size="small" />
                <Chip label="COD" size="small" />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Recently Viewed */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          You Might Also Like
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Based on your cart items, here are some recommendations
        </Typography>
        
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card sx={{ height: '100%', cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop&random=${item}`}
                  alt="Recommended product"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recommended Product {item}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Beautiful ethnic wear that complements your style
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ₹{(Math.random() * 5000 + 1000).toFixed(0)}
                    </Typography>
                    <Button variant="outlined" size="small">
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Cart; 