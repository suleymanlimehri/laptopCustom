import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Catalog from './pages/catalog/Catalog';
import ProductDetails from './pages/details/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Configurator from './pages/config/Configurator';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import { LanguageProvider } from './context/languageContext';
import { WishlistProvider } from './context/WishlistContext';
import { default as AuthProvider } from './context/AuthContext';
import Success from './pages/success/Success';
import Cancel from './pages/cancel/Cancel';
import AdminPanel from './pages/admin/AdminPanel';
import ContactSupport from './components/contact/ContactSupport';
import AboutUs from './components/about/About';
import OrdersList from './pages/admin/orders/OrdersList';
import Faq from './components/faq/FAQ';
import MainLayout from './components/common/MainLayout';
import NotFound from './pages/notFound/NotFound';
import AccessDenied from './pages/admin/AccessDenied';
import Footer from './components/common/Footer';
import Wishlist from './pages/wishlist/Wishlist';

export default function App() {
  return (
    
    <WishlistProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route element={<MainLayout />}>
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/order" element={<OrdersList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/configure/:id" element={<Configurator />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactSupport />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </WishlistProvider>

  );
}
