import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import './Editor.css';

const ExperienceEditor = ({ experience, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    period: '',
    location: '',
    description: '',
    projects: [],
    logo: '',
    published: true,
    ...experience
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData({ ...formData, projects: array });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
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
        setFormData({ ...formData, logo: data.url });
      } else {
        setError('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.title) {
      setError('Company and title are required');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{experience?.id ? 'Edit Experience' : 'Add New Experience'}</h2>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-field">
              <label>Company Logo</label>
              <div className="avatar-upload-container">
                {formData.logo && (
                  <div className="logo-preview">
                    <img src={formData.logo} alt="Logo" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  id="logo-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="logo-upload" className="upload-button">
                  {uploading ? 'Uploading...' : formData.logo ? 'Change Logo' : 'Upload Logo'}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Google"
                  required
                />
              </div>
              <div className="form-field">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior UI/UX Designer"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Period</label>
                <input
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  placeholder="e.g., Jan 2020 - Present"
                />
              </div>
              <div className="form-field">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Bangalore, India"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Describe your role and responsibilities... Use the toolbar to format text, add colors, emojis, and more!"
              />
            </div>

            <div className="form-field">
              <label>Projects (comma separated)</label>
              <input
                type="text"
                value={formData.projects?.join(', ') || ''}
                onChange={(e) => handleArrayChange(e.target.value)}
                placeholder="Project 1, Project 2, Project 3"
              />
            </div>

            <div className="form-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published !== false}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <span>Publish immediately (visible on website)</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-button">
              {experience?.id ? 'Update' : 'Add'} Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceEditor;

