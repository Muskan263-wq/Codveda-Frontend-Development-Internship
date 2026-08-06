import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Ava', role: 'Product Designer' });

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AppProvider>
      <header className="topbar">
        <div className="brand">Northstar</div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </AppProvider>
  );
}

export default App;
