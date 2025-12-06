import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import PageEditor from './PageEditor';
import './Editor.css';

const PageManager = ({ onLogout }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/pages/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingPage(null);
    setShowModal(true);
  };

  const handleEdit = (page) => {
    setEditingPage(page);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this page? It will be removed from the navigation menu.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPages();
      }
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('Please login first. Redirecting to login page...');
        window.location.href = '/admin/login';
        return;
      }
      
      const url = editingPage 
        ? `http://localhost:5001/api/pages/${editingPage.id}`
        : 'http://localhost:5001/api/pages';
      const method = editingPage ? 'PUT' : 'POST';

      console.log('Saving page:', { url, method, formData });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Page saved successfully:', result);
        alert(editingPage ? '✅ Page updated successfully!' : '✅ Page created and published successfully!');
        setShowModal(false);
        setEditingPage(null);
        fetchPages();
      } else {
        const error = await response.json();
        console.error('Save failed:', error);
        alert(`❌ Failed to save page:\n${error.error || response.statusText}\n\nPlease check the console for details.`);
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert(`❌ Failed to save page due to network error:\n${error.message}\n\nMake sure the backend server is running.`);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/pages/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPages();
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout} title="Pages">
        <div className="loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout} title="Page Manager">
      <div className="manager-container">
        <div className="manager-header">
          <div>
            <h2>Custom Pages</h2>
            <p>Create and manage custom pages that appear in your navigation menu</p>
          </div>
          <button className="add-button" onClick={handleAdd}>
            + Add New Page
          </button>
        </div>

        <div className="items-list">
          {pages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>No Custom Pages Yet</h3>
              <p>Create your first custom page to add it to your navigation menu!</p>
              <button className="add-button" onClick={handleAdd}>
                + Add New Page
              </button>
            </div>
          ) : (
            pages.map((page) => (
              <div key={page.id} className={`item-card ${page.published === false ? 'unpublished' : ''}`}>
                <div className="item-info">
                  <div className="page-icon">📄</div>
                  <div>
                    <h3>{page.title || 'Untitled Page'}</h3>
                    <p>
                      <span className="page-slug">/{page.slug}</span>
                      {' • '}
                      Menu Order: {page.menuOrder || 'Default'}
                      {page.published === false && <span className="draft-badge">DRAFT</span>}
                    </p>
                  </div>
                </div>
                <div className="item-actions">
                  <button 
                    className={page.published === false ? 'publish-btn' : 'unpublish-btn'} 
                    onClick={() => handleTogglePublish(page.id)}
                  >
                    {page.published === false ? '📢 Publish' : '👁️ Unpublish'}
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(page)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(page.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <PageEditor
            page={editingPage}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default PageManager;

