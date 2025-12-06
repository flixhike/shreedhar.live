import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [customPages, setCustomPages] = useState([]);

  useEffect(() => {
    fetchCustomPages();
  }, []);

  const fetchCustomPages = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pages');
      if (response.ok) {
        const data = await response.json();
        // Filter only pages that should show in menu and are published
        const menuPages = data.filter(page => page.showInMenu !== false && page.published !== false);
        // Sort by menuOrder
        menuPages.sort((a, b) => (a.menuOrder || 99) - (b.menuOrder || 99));
        setCustomPages(menuPages);
      }
    } catch (error) {
      console.error('Error fetching custom pages:', error);
    }
  };

  // Default navigation items with menu order
  const defaultItems = [
    { to: '/about', label: 'About Me', order: 1 },
    { to: '/experience', label: 'Work experience', order: 2 },
    { to: '/portfolio', label: 'Portfolio', order: 3 }
  ];

  // Combine default items with custom pages
  const allItems = [
    ...defaultItems,
    ...customPages.map(page => ({
      to: `/${page.slug}`,
      label: page.title,
      order: page.menuOrder || 99
    }))
  ];

  // Sort by order
  allItems.sort((a, b) => a.order - b.order);

  return (
    <nav className="navigation">
      {allItems.map((item, index) => (
        <NavLink 
          key={index}
          to={item.to} 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;

