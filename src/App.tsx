import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PizzaInfoPage from './pages/PizzaInfoPage';
import About from './pages/About';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Suspense } from 'react';
import { ThemeProvider } from './components/Header/ThemeToggle/ThemeContext';
import './index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from './layouts/Layout';
import Products from './pages/Products';
import Login from './pages/Login';
import JoinUs from './pages/JoinUs';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/pizzas/:id" element={<PizzaInfoPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen justify-center items-center">
          <CircularProgress />
        </div>
      }>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Suspense>
  );
};

