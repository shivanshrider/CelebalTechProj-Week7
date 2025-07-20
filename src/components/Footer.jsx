import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  ArrowUpward,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(90deg, #1CA9A6 0%, #264653 100%)',
        color: '#FFF',
        py: 6,
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Indian Fashion Store
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, opacity: 0.9 }}>
              Your premier destination for authentic Indian ethnic wear. We offer a curated collection
              of sarees, lehengas, kurtas, and traditional jewelry from across India.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <IconButton 
                color="inherit" 
                aria-label="Facebook"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-3px) scale(1.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Twitter"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-3px) scale(1.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Instagram"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-3px) scale(1.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="LinkedIn"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-3px) scale(1.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  info@indianfashionstore.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Mumbai, Maharashtra, India
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Shop by Category
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { name: 'Sarees', path: '/products?category=Sarees' },
                { name: 'Lehengas', path: '/products?category=Lehengas' },
                { name: 'Suits', path: '/products?category=Suits' },
                { name: 'Kurtas & Kurtis', path: '/products?category=Kurtas' },
                { name: 'Jewelry', path: '/products?category=Jewelry' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  color="inherit" 
                  sx={{ 
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { name: 'Size Guide', path: '/help' },
                { name: 'Shipping & Delivery', path: '/shipping' },
                { name: 'Returns & Exchanges', path: '/returns' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  color="inherit" 
                  sx={{ 
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Subscribe to our newsletter for the latest updates, exclusive offers, and fashion tips.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#FFD700',
                  color: '#8B4513',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#FFC107',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 Indian Fashion Store. All rights reserved. | Handcrafted with love in India 🇮🇳
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Terms of Service
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Privacy Policy
            </Button>
            <IconButton
              onClick={scrollToTop}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <ArrowUpward />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 