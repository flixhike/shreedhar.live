import React, { useState } from 'react';
import './Editor.css';

const ToolManager = ({ tools, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleAdd = () => {
    setEditingTool(null);
    setFormData({ name: '', icon: '' });
    setShowModal(true);
  };

  const handleEdit = (tool, index) => {
    setEditingTool(index);
    setFormData({ ...tool });
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this tool?')) {
      const updatedTools = tools.filter((_, i) => i !== index);
      onSave(updatedTools);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/upload/single', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, icon: data.url });
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a tool name');
      return;
    }

    const updatedTools = [...tools];
    if (editingTool !== null) {
      updatedTools[editingTool] = formData;
    } else {
      updatedTools.push(formData);
    }

    onSave(updatedTools);
    setShowModal(false);
    setFormData({ name: '', icon: '' });
  };

  return (
    <div className="tool-manager">
      <div className="manager-header">
        <h3>Tools ({tools.length})</h3>
        <button type="button" className="add-button" onClick={handleAdd}>
          + Add Tool
        </button>
      </div>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <div className="tool-card-content">
              {tool.icon && (
                <img src={tool.icon} alt={tool.name} className="tool-card-icon" />
              )}
              <span className="tool-card-name">{tool.name}</span>
            </div>
            <div className="tool-card-actions">
              <button type="button" onClick={() => handleEdit(tool, index)} className="edit-btn-small">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(index)} className="delete-btn-small">
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {tools.length === 0 && (
          <div className="empty-state">
            <p>No tools added yet. Click "+ Add Tool" to get started.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingTool !== null ? 'Edit Tool' : 'Add Tool'}</h3>
              <button type="button" className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-field">
                <label>Tool Icon</label>
                <div className="icon-upload-container">
                  {formData.icon && (
                    <div className="icon-preview">
                      <img src={formData.icon} alt="Tool icon" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    id="tool-icon-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="tool-icon-upload" className="upload-button-small">
                    {uploading ? 'Uploading...' : formData.icon ? 'Change Icon' : 'Upload Icon'}
                  </label>
                  <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
                    Recommended: 48x48px PNG with transparent background
                  </small>
                </div>
              </div>

              <div className="form-field">
                <label>Tool Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Figma, Adobe XD, Sketch"
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-button" disabled={uploading}>
                  {editingTool !== null ? 'Update Tool' : 'Add Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolManager;

