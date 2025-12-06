import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import PortfolioEditor from './PortfolioEditor';
import './Editor.css';

const PortfolioManager = ({ onLogout }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // Use /all endpoint to get both published and unpublished
      const response = await fetch('http://localhost:5001/api/portfolio/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        let data = await response.json();

        // Check if any items are missing order values
        let needsUpdate = false;
        const categoryGroups = {};

        // Group by category
        data.forEach(item => {
          const cat = item.category || 'Uncategorized';
          if (!categoryGroups[cat]) categoryGroups[cat] = [];
          categoryGroups[cat].push(item);
        });

        // Assign order values if missing
        for (const category in categoryGroups) {
          categoryGroups[category].forEach((item, index) => {
            if (item.order === undefined || item.order === null) {
              item.order = index;
              needsUpdate = true;
            }
          });
        }

        // If any items were updated, save them back
        if (needsUpdate) {
          console.log('Initializing missing order values...');
          const savePromises = data
            .filter(item => item.order !== undefined)
            .map(item =>
              fetch(`http://localhost:5001/api/portfolio/${item.id}/order`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ order: item.order })
              })
            );

          await Promise.all(savePromises);
          console.log('Order values initialized');
        }

        setPortfolioItems(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteConfirm(item);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/portfolio/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setDeleteConfirm(null);
        fetchPortfolio();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('Error deleting item');
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group items by category and sort by order
  const groupedItems = portfolioItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Sort items within each category by order
  Object.keys(groupedItems).forEach(category => {
    groupedItems[category].sort((a, b) => (a.order || 0) - (b.order || 0));
  });

  const handleMoveUp = async (item, categoryItems) => {
    const currentIndex = categoryItems.findIndex(i => i.id === item.id);
    if (currentIndex === 0) return; // Already at top

    const itemAbove = categoryItems[currentIndex - 1];

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/portfolio/swap-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id1: item.id, id2: itemAbove.id })
      });

      if (response.ok) {
        // Wait a moment before refreshing to ensure backend has saved
        await new Promise(resolve => setTimeout(resolve, 100));
        fetchPortfolio();
      } else {
        console.error('Failed to update order');
        alert('Failed to update order. Please try again.');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please check console for details.');
    }
  };

  const handleMoveDown = async (item, categoryItems) => {
    const currentIndex = categoryItems.findIndex(i => i.id === item.id);
    if (currentIndex === categoryItems.length - 1) return; // Already at bottom

    const itemBelow = categoryItems[currentIndex + 1];

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/portfolio/swap-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id1: item.id, id2: itemBelow.id })
      });

      if (response.ok) {
        // Wait a moment before refreshing to ensure backend has saved
        await new Promise(resolve => setTimeout(resolve, 100));
        fetchPortfolio();
      } else {
        console.error('Failed to update order');
        alert('Failed to update order. Please try again.');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please check console for details.');
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingItem
        ? `http://localhost:5001/api/portfolio/${editingItem.id}`
        : 'http://localhost:5001/api/portfolio';
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(false);
        setEditingItem(null);
        fetchPortfolio();
      }
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/portfolio/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPortfolio();
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout} title="Portfolio">
        <div className="loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout} title="Portfolio Manager">
      <div className="editor-container">
        <div className="list-header">
          <h2>Portfolio by Category</h2>
          <button className="add-button" onClick={handleAdd}>+ Add New Item</button>
        </div>

        <div className="info-box">
          <div className="info-icon">💡</div>
          <div className="info-content">
            <h3>How to Arrange Your Portfolio:</h3>
            <ul>
              <li><strong>View by Category:</strong> Click on any category to expand/collapse items</li>
              <li><strong>Reorder Items:</strong> Use <span className="btn-demo">▲</span> and <span className="btn-demo">▼</span> buttons to move items up or down within their category</li>
              <li><strong>Publish/Unpublish:</strong> Toggle visibility on the live site with 📢 (publish) or 👁️ (unpublish)</li>
              <li><strong>Edit/Delete:</strong> Use ✏️ to edit or 🗑️ to delete (with confirmation)</li>
              <li><strong>Live Site:</strong> Changes to order and published status reflect immediately on your live portfolio</li>
            </ul>
          </div>
        </div>

        <div className="category-list">
          {portfolioItems.length === 0 ? (
            <div className="empty-state">
              <p>No portfolio items added yet. Click "Add New Item" to get started.</p>
            </div>
          ) : (
            Object.keys(groupedItems).sort().map((category) => {
              const items = groupedItems[category];
              const isExpanded = expandedCategories[category];

              return (
                <div key={category} className="category-card">
                  <div className="category-header" onClick={() => toggleCategory(category)}>
                    <h3>
                      <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                      {category}
                      <span className="category-count">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    </h3>
                  </div>

                  {isExpanded && (
                    <div className="category-items-grid">
                      {items.map((item, index) => (
                        <div key={item.id} className={`item-card-grid ${item.published === false ? 'unpublished' : ''}`}>
                          <div className="item-position-badge">#{index + 1}</div>
                          <div className="item-order-controls">
                            <button
                              className="order-btn order-up"
                              onClick={() => handleMoveUp(item, items)}
                              disabled={index === 0}
                              title="Move up"
                            >
                              ▲
                            </button>
                            <button
                              className="order-btn order-down"
                              onClick={() => handleMoveDown(item, items)}
                              disabled={index === items.length - 1}
                              title="Move down"
                            >
                              ▼
                            </button>
                          </div>
                          {item.image && (
                            <img src={item.image} alt={item.title} className="item-thumbnail-grid" />
                          )}
                          <div className="item-info-grid">
                            <h4>{item.title || 'Untitled Project'}</h4>
                            <p>{item.subtitle && `${item.subtitle} • `}{item.year || 'Year'}</p>
                            {item.published === false && <span className="draft-badge">DRAFT</span>}
                          </div>
                          <div className="item-actions-grid">
                            <button
                              className={item.published === false ? 'publish-btn-small' : 'unpublish-btn-small'}
                              onClick={() => handleTogglePublish(item.id)}
                              title={item.published === false ? 'Publish' : 'Unpublish'}
                            >
                              {item.published === false ? '📢' : '👁️'}
                            </button>
                            <button className="edit-btn-small" onClick={() => handleEdit(item)} title="Edit">✏️</button>
                            <button className="delete-btn-small" onClick={() => handleDeleteClick(item)} title="Delete">🗑️</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {showModal && (
          <PortfolioEditor
            item={editingItem}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}

        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirm-modal">
              <div className="modal-header">
                <h2>Confirm Delete</h2>
                <button className="close-button" onClick={() => setDeleteConfirm(null)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>?</p>
                <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="confirm-delete-btn" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PortfolioManager;

