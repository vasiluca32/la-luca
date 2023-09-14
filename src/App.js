// import logo from './logo.svg';
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

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <Nav />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

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
      </AuthContextProvider>
    </div>
  );
}

export default App;
