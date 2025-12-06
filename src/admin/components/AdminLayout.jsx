import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children, onLogout, title }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
      { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/admin/profile', label: 'Profile', icon: '👤' },
      { path: '/admin/experience', label: 'Experience', icon: '💼' },
      { path: '/admin/portfolio', label: 'Portfolio', icon: '🎨' },
      { path: '/admin/pages', label: 'Pages', icon: '📄' }
    ];

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>CMS Admin</h2>
          <p>Portfolio Manager</p>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={handleMenuItemClick}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-button">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h1>{title}</h1>
          <div className="header-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="view-site-btn">
              View Site →
            </a>
          </div>
        </header>
        
        <div className="admin-content">
          {children}
        </div>
      </main>
      
      {/* Mobile menu toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </div>
  );
};

export default AdminLayout;

