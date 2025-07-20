import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Payment,
  LocalShipping,
  CheckCircle,
  CreditCard,
  AccountBalance,
  PhoneAndroid,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
// Razorpay integration
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const cart = items || [];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const shippingThreshold = 2000;
  const shippingCost = 199;
  const taxRate = 0.18;

  const subtotal = getCartTotal();
  const shipping = subtotal >= shippingThreshold ? 0 : shippingCost;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  const steps = ['Personal Information', 'Shipping Address', 'Payment', 'Review'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Simulate order placement
    console.log('Order placed:', formData);
    clearCart();
    navigate('/');
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // TEST KEY, replace with your own for production
      amount: Math.round(total * 100), // in paise
      currency: 'INR',
      name: 'Indian Fashion Store',
      description: 'Order Payment',
      image: '',
      handler: function (response) {
        clearCart();
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        navigate('/');
      },
      prefill: {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#1CA9A6',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 1:
        return formData.address && formData.city && formData.state && formData.pincode;
      case 2:
        return formData.paymentMethod && 
               (formData.paymentMethod === 'cod' || 
                (formData.cardNumber && formData.cardName && formData.expiryDate && formData.cvv));
      default:
        return true;
    }
  };

  const PersonalInfoStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );

  const ShippingStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            multiline
            rows={3}
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="PIN Code"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );

  const PaymentStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup
          value={formData.paymentMethod}
          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCard />
                Credit/Debit Card
              </Box>
            }
          />
          <FormControlLabel
            value="upi"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneAndroid />
                UPI Payment
              </Box>
            }
          />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalance />
                Net Banking
              </Box>
            }
          />
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </FormControl>

      {formData.paymentMethod === 'card' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={formData.cardName}
              onChange={(e) => handleInputChange('cardName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
            />
          </Grid>
        </Grid>
      )}

      {formData.paymentMethod === 'upi' && (
        <TextField
          fullWidth
          label="UPI ID"
          placeholder="example@upi"
          sx={{ mt: 2 }}
        />
      )}

      {formData.paymentMethod === 'netbanking' && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Bank</InputLabel>
          <Select label="Select Bank">
            <MenuItem value="sbi">State Bank of India</MenuItem>
            <MenuItem value="hdfc">HDFC Bank</MenuItem>
            <MenuItem value="icici">ICICI Bank</MenuItem>
            <MenuItem value="axis">Axis Bank</MenuItem>
            <MenuItem value="kotak">Kotak Mahindra Bank</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );

  const ReviewStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Review
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #FFC857', borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {formData.firstName} {formData.lastName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {formData.email}
            </Typography>
            <Typography variant="body2">
              {formData.phone}
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #FFC857', borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {formData.address}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {formData.city}, {formData.state} {formData.pincode}
            </Typography>
            <Typography variant="body2">
              {formData.country}
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #FFC857', borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body2">
              {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
              {formData.paymentMethod === 'upi' && 'UPI Payment'}
              {formData.paymentMethod === 'netbanking' && 'Net Banking'}
              {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)', border: '1px solid #FFC857', borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              {cart.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal</Typography>
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
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                ₹{total.toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #1CA9A6 0%, #FFC857 100%)',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(28,169,166,0.08)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #D7263D 0%, #FFC857 100%)',
                },
              }}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <ShippingStep />;
      case 2:
        return <PaymentStep />;
      case 3:
        return <ReviewStep />;
      default:
        return 'Unknown step';
    }
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Please add some items to your cart before proceeding to checkout.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, background: 'linear-gradient(135deg, #FFF8F0 0%, #E3F2FD 100%)', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'Montserrat, Poppins, Inter, Lato, Open Sans, sans-serif' }}>
          Checkout
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
          Complete your purchase securely
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        
        <Box>
          <Button
            variant="outlined"
            onClick={() => navigate('/cart')}
            sx={{ mr: 2 }}
          >
            Back to Cart
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleRazorpayPayment}
              disabled={!isStepValid(activeStep)}
            >
              Pay Now
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout; 