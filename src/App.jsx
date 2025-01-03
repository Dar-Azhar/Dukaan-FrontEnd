import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider >
      <Navbar />
      <main className='min-h-screen max-w-screen-2xl mx-auto px-6 lg:px-12 py-6 font-primary'>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>

  )
}

export default App;
