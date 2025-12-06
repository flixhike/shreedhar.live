import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ExperienceEditor from './ExperienceEditor';
import './Editor.css';

const ExperienceManager = ({ onLogout }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // Use /all endpoint to get both published and unpublished
      const response = await fetch('http://localhost:5001/api/experience/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/experience/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const handleAdd = () => {
    setEditingExp(null);
    setShowModal(true);
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingExp 
        ? `http://localhost:5001/api/experience/${editingExp.id}`
        : 'http://localhost:5001/api/experience';
      const method = editingExp ? 'PUT' : 'POST';

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
        setEditingExp(null);
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/experience/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout} title="Work Experience">
        <div className="loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout} title="Work Experience Manager">
      <div className="editor-container">
        <div className="list-header">
          <h2>All Experiences</h2>
          <button className="add-button" onClick={handleAdd}>+ Add New Experience</button>
        </div>

        <div className="items-list">
          {experiences.length === 0 ? (
            <div className="empty-state">
              <p>No work experience added yet. Click "Add New Experience" to get started.</p>
            </div>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className={`item-card ${exp.published === false ? 'unpublished' : ''}`}>
                <div className="item-info">
                  {exp.logo && (
                    <img src={exp.logo} alt={exp.company} className="item-logo" />
                  )}
                  <div>
                    <h3>{exp.title || 'Untitled Position'}</h3>
                    <p>{exp.company || 'Company'} • {exp.period || 'Period'}</p>
                    {exp.published === false && <span className="draft-badge">DRAFT</span>}
                  </div>
                </div>
                <div className="item-actions">
                  <button 
                    className={exp.published === false ? 'publish-btn' : 'unpublish-btn'} 
                    onClick={() => handleTogglePublish(exp.id)}
                  >
                    {exp.published === false ? '📢 Publish' : '👁️ Unpublish'}
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(exp)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(exp.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <ExperienceEditor
            experience={editingExp}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ExperienceManager;

