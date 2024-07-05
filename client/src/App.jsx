import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/vctour' element={<VCTour />} />
          <Route path='/placements' element={<Placements />} />
          <Route path='/academics' element={<Academics />} />

          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
