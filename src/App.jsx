import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import Navigation from './components/Navigation';
import MobileHeader from './components/MobileHeader';
import AboutMe from './pages/AboutMe';
import WorkExperience from './pages/WorkExperience';
import Portfolio from './pages/Portfolio';
import DynamicPage from './pages/DynamicPage';
import AdminPanel from './admin/AdminPanel';
import './App.css';

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileProfileOpen, setMobileProfileOpen] = React.useState(false);

  // Dynamic Favicon Switching
  React.useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) return;

    if (currentPath.startsWith('/admin')) {
      link.href = '/favicon-admin.svg';
    } else {
      link.href = '/favicon.svg';
    }
  }, [currentPath]);

  // Close mobile profile when route changes
  React.useEffect(() => {
    setMobileProfileOpen(false);
  }, [currentPath]);

  // Admin routes - render without main layout
  if (currentPath.startsWith('/admin')) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    );
  }

  const getPageClass = () => {
    if (currentPath === '/portfolio') return 'portfolio-page';
    if (currentPath === '/experience') return 'experience-page';
    if (currentPath === '/about') return 'about-page';
    // Default for dynamic pages
    return 'about-page';
  };

  const pageClass = getPageClass();

  return (
    <div className={`app ${pageClass}`}>
      <div className="header"></div>

      {/* Mobile Profile Overlay */}
      {mobileProfileOpen && (
        <div
          className="mobile-profile-overlay"
          onClick={() => setMobileProfileOpen(false)}
        />
      )}

      <div className={`container ${pageClass}`}>
        <div className={`sidebar ${mobileProfileOpen ? 'mobile-open' : ''}`}>
          <ProfileCard />
        </div>
        <div className={`main-content ${pageClass}`}>
          <MobileHeader onProfileClick={() => setMobileProfileOpen(true)} />
          <div className={`content-wrapper ${pageClass}`}>
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/experience" element={<WorkExperience />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/:slug" element={<DynamicPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
