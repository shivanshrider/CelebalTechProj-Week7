import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Container,
  Fade,
  Grow,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { searchTerm, setSearchTerm } = useProducts();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/products');
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Sarees', path: '/products?category=Sarees' },
    { text: 'Lehengas', path: '/products?category=Lehengas' },
    { text: 'Suits', path: '/products?category=Suits' },
    { text: 'Kurtas', path: '/products?category=Kurtas' },
    { text: 'Jewelry', path: '/products?category=Jewelry' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(90deg, #1CA9A6 0%, #264653 100%)', color: '#FFF' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: '1px solid rgba(28, 169, 166, 0.1)'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#FFF' }}>
          Indian Fashion Store
        </Typography>
        <IconButton onClick={handleMobileToggle} sx={{ color: '#FFF' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ flexGrow: 1, py: 2 }}>
        {navItems.map((item, index) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path} 
            sx={{ 
              py: 2,
              mx: 2,
              borderRadius: 2,
              mb: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.08)',
                transform: 'translateX(8px)',
              }
            }}
            onClick={handleMobileToggle}
          >
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiTypography-root': {
                  fontWeight: 500,
                  color: '#FFF',
                  fontSize: '1.1rem',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 2, borderTop: '1px solid rgba(28, 169, 166, 0.1)' }}>
        <Typography variant="body2" color="#FFF" sx={{ mb: 2 }}>
          Customer Support
        </Typography>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1, borderColor: '#FFF', color: '#FFF' }}
        >
          Contact Us
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ background: 'linear-gradient(90deg, #FFC857 0%, #1CA9A6 100%)', color: '#264653' }}
        >
          Track Order
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(90deg, #1CA9A6 0%, #264653 100%)', color: '#FFF' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0 }, py: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700,
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              Indian Fashion Store
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                  <TextField
                    size="small"
                    placeholder="Search sarees, lehengas, kurtas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      width: 350,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                        '& input': {
                          color: 'white',
                          '&::placeholder': {
                            color: 'rgba(255,255,255,0.7)',
                            opacity: 1,
                          },
                        },
                      },
                    }}
                  />
                </form>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      sx={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>

                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <PersonIcon />
                </IconButton>

                <IconButton
                  color="inherit"
                  component={Link}
                  to="/cart"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <Badge 
                    badgeContent={getCartCount()} 
                    color="secondary"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#FFC857',
                        color: '#264653',
                        fontWeight: 600,
                      }
                    }}
                  >
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Box>
            )}

            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleMobileToggle}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/cart"
                  sx={{ 
                    ml: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <Badge 
                    badgeContent={getCartCount()} 
                    color="secondary"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#FFC857',
                        color: '#264653',
                        fontWeight: 600,
                      }
                    }}
                  >
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 320,
            backgroundColor: '#FFF8DC',
            border: 'none',
            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.2)',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        TransitionComponent={Grow}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(28, 169, 166, 0.15)',
            border: '1px solid rgba(28, 169, 166, 0.1)',
            background: 'linear-gradient(90deg, #1CA9A6 0%, #264653 100%)',
            color: '#FFF',
          }
        }}
      >
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <PersonIcon sx={{ mr: 2, color: '#FFC857' }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <CartIcon sx={{ mr: 2, color: '#FFC857' }} />
          My Orders
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <SearchIcon sx={{ mr: 2, color: '#FFC857' }} />
          Wishlist
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <PersonIcon sx={{ mr: 2, color: '#FFC857' }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5, color: '#FF6B6B' }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar; 