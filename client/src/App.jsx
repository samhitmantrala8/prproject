import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Placements from './pages/Placements';
import VCTour from './pages/VCTour';
import Academics from './pages/Academics';
import { UserProvider } from './context/UserContext';
import Sports from './pages/Sports';
import Cultural from './pages/Cultural';
import Technical from './pages/Technical';
import GenInfo from './pages/GenInfo';
import { Footer } from './components/Footer';
import bgImg from './assets/bg-4.jpg';

export default function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  const handlePathChange = (path) => {
    const headerRoutes = ['/', '/about', '/profile'];
    const footerRoutes = ['/', '/about', '/profile'];

    setShowHeader(headerRoutes.includes(path));
    setShowFooter(footerRoutes.includes(path));
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <UserProvider>
        <BrowserRouter>
          {showHeader && <Header />}
          <Routes>
            <Route
              path='/'
              element={<PageWrapper handlePathChange={handlePathChange}><Home /></PageWrapper>}
            />
            <Route
              path='/sign-in'
              element={<PageWrapper handlePathChange={handlePathChange}><SignIn /></PageWrapper>}
            />
            <Route
              path='/sign-up'
              element={<PageWrapper handlePathChange={handlePathChange}><SignUp /></PageWrapper>}
            />
            <Route
              path='/about'
              element={<PageWrapper handlePathChange={handlePathChange}><About /></PageWrapper>}
            />
            <Route
              path='/vctour'
              element={<PageWrapper handlePathChange={handlePathChange}><VCTour /></PageWrapper>}
            />
            <Route
              path='/sports'
              element={<PageWrapper handlePathChange={handlePathChange}><Sports /></PageWrapper>}
            />
            <Route
              path='/cultural'
              element={<PageWrapper handlePathChange={handlePathChange}><Cultural /></PageWrapper>}
            />
            <Route
              path='/technical'
              element={<PageWrapper handlePathChange={handlePathChange}><Technical /></PageWrapper>}
            />
            <Route
              path='/placements'
              element={<PageWrapper handlePathChange={handlePathChange}><Placements /></PageWrapper>}
            />
            <Route
              path='/academics'
              element={<PageWrapper handlePathChange={handlePathChange}><Academics /></PageWrapper>}
            />
            <Route
              path='/geninfo'
              element={<PageWrapper handlePathChange={handlePathChange}><GenInfo /></PageWrapper>}
            />

            <Route element={<PrivateRoute />}>
              <Route
                path='/profile'
                element={<PageWrapper handlePathChange={handlePathChange}><Profile /></PageWrapper>}
              />
            </Route>
          </Routes>
          {showFooter && <Footer />}
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

const PageWrapper = ({ children, handlePathChange }) => {
  const location = useLocation();

  useEffect(() => {
    handlePathChange(location.pathname);
  }, [location, handlePathChange]);

  return children;
};
