import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Nav from './components/Nav';
import Blog from './pages/Blog';
import Page404 from './pages/Page404';
import LogIn from './pages/LogIn';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import AdminRoutes from './components/AdminRoutes';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

function App() {
  AOS.init();
  return (
    <div className='App' style={{ backgroundColor: '#dff5ce7a' }}>
      <AuthContextProvider>
        <header className='App-header'>
          <Nav />
        </header>

        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='login' element={<LogIn />}></Route>
          <Route path='contact' element={<Contact />}></Route>

          <Route element={<PrivateRoutes />}>
            <Route path='blog' element={<Blog />}></Route>
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path='dashboard' element={<Dashboard />}></Route>
          </Route>

          <Route path='*' element={<Page404 />}></Route>
        </Routes>

        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
