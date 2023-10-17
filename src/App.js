// import logo from './logo.svg'; //to remove
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Nav from './components/common/Nav';
import Blog from './pages/Blog';
import Page404 from './pages/Page404';
import LogIn from './pages/LogIn';
import { useAuth } from './context/AuthContext';
import PrivateRoutes from './components/common/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import AdminRoutes from './components/common/AdminRoutes';
import Footer from './components/common/Footer';
// import AOS from 'aos';

function App() {
  // AOS.init();
  const { loading } = useAuth();

  return (
    <div className='App' style={{ backgroundColor: '#dff5ce7a' }}>
      <header className='App-header'>
        <Nav />
      </header>
      {loading ? (
        <div>
          <h1>loading</h1>
        </div>
      ) : (
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
      )}

      <Footer />
    </div>
  );
}

export default App;
