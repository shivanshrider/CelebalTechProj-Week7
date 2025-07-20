import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1CA9A6', // Teal
    },
    secondary: {
      main: '#D7263D', // Ruby Red
    },
    accent: {
      main: '#FFC857', // Gold
    },
    background: {
      default: '#FFF8F0', // Warm Cream
      paper: '#FFFFFF', // Card/Surface
    },
    text: {
      primary: '#1B5E20', // Deep Green
      secondary: '#264653', // Deep Blue
    },
    error: {
      main: '#FF6B6B', // Soft Coral
    },
    warning: {
      main: '#FFB400', // Mustard
    },
    info: {
      main: '#71ADBA', // Retro Blue
    },
    success: {
      main: '#388E3C', // Green
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Poppins',
      'Inter',
      'Lato',
      'Open Sans',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFF8F0',
          color: '#1B5E20',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(139, 69, 19, 0.15)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(139, 69, 19, 0.25)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #A0522D 0%, #D2691E 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08)',
          border: '1px solid rgba(139, 69, 19, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(139, 69, 19, 0.06)',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(139, 69, 19, 0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)',
        },
        elevation3: {
          boxShadow: '0 6px 24px rgba(139, 69, 19, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          boxShadow: '0 2px 12px rgba(139, 69, 19, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D2691E',
              borderWidth: 2,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B4513',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#8B4513',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(135deg, #D2691E 0%, #FF8C42 100%)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)',
            },
          },
          '& .MuiSlider-track': {
            background: 'linear-gradient(90deg, #8B4513 0%, #D2691E 100%)',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#E0E0E0',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          '& .MuiRating-iconFilled': {
            color: '#FFD700',
          },
          '& .MuiRating-iconHover': {
            color: '#FFD700',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 8,
            fontWeight: 500,
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              color: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-root .MuiStepLabel-label': {
            fontWeight: 500,
          },
          '& .MuiStepLabel-root.Mui-completed .MuiStepLabel-label': {
            color: '#4CAF50',
          },
          '& .MuiStepLabel-root.Mui-active .MuiStepLabel-label': {
            color: '#8B4513',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#8B4513',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#8B4513',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#8B4513',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#8B4513',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Navbar />
              <main style={{ 
                minHeight: 'calc(100vh - 140px)', 
                paddingTop: '20px',
                background: 'linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 100%)',
              }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
