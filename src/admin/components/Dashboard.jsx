import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const stats = [
    { title: 'Profile', icon: '👤', link: '/admin/profile', color: '#667eea' },
    { title: 'Work Experience', icon: '💼', link: '/admin/experience', color: '#f093fb' },
    { title: 'Portfolio', icon: '🎨', link: '/admin/portfolio', color: '#4facfe' },
    { title: 'Pages', icon: '📄', link: '/admin/pages', color: '#43e97b' }
  ];

  return (
    <AdminLayout onLogout={onLogout} title="Dashboard">
      <div className="dashboard">
        <div className="welcome-section">
          <h1>Welcome to CMS Admin Panel</h1>
          <p>Manage your portfolio content from here</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p>Manage {stat.title.toLowerCase()}</p>
              </div>
              <div className="stat-arrow">→</div>
            </Link>
          ))}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/profile" className="action-button">
              <span>✏️</span>
              <span>Edit Profile</span>
            </Link>
            <Link to="/admin/experience" className="action-button">
              <span>➕</span>
              <span>Add Experience</span>
            </Link>
            <Link to="/admin/portfolio" className="action-button">
              <span>🖼️</span>
              <span>Add Portfolio Item</span>
            </Link>
            <Link to="/admin/pages" className="action-button">
              <span>📄</span>
              <span>Create Page</span>
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className="action-button">
              <span>👁️</span>
              <span>View Website</span>
            </a>
          </div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>📊 System Status</h3>
            <p>All systems operational</p>
            <span className="status-indicator">●</span>
          </div>
          <div className="info-card">
            <h3>🔐 Security</h3>
            <p>You are logged in as admin</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

