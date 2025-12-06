import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import './Editor.css';

const PortfolioEditor = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    year: '',
    description: '',
    image: '',
    tags: [],
    link: '',
    published: true,
    ...item
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [tagsText, setTagsText] = useState(
    item?.tags ? (Array.isArray(item.tags) ? item.tags.join(', ') : '') : ''
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const convertTextToArray = (text) => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item !== '');
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
        setFormData({ ...formData, image: data.url });
      } else {
        const data = await response.json();
        setError(data.error || 'Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      setError('Title and category are required');
      return;
    }

    // Convert tagsText to array before saving
    const dataToSave = {
      ...formData,
      tags: convertTextToArray(tagsText)
    };

    onSave(dataToSave);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{item?.id ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h2>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}

            <div className="form-field">
              <label>Project Image</label>
              <div className="image-upload-container">
                {uploading && (
                  <div className="upload-status uploading">
                    <div className="upload-spinner"></div>
                    <span>Uploading image...</span>
                  </div>
                )}
                {!uploading && formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                    <div className="image-preview-label">✓ Image uploaded successfully</div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  id="image-upload"
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="image-upload" 
                  className={`upload-button ${uploading ? 'uploading' : ''}`}
                  style={{ cursor: uploading ? 'wait' : 'pointer' }}
                >
                  {uploading ? '⏳ Uploading...' : formData.image ? '🔄 Change Image' : '📁 Upload Image'}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Mobile App Design"
                  required
                />
              </div>
              <div className="form-field">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Design System">Design System</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Prototype">Prototype</option>
                  <option value="UI Design">UI Design</option>
                  <option value="Animation">Animation</option>
                  <option value="Poster">Poster</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Subtitle / Description Text</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Click on below image for details"
                />
              </div>
              <div className="form-field">
                <label>Grouping (for UI Design items)</label>
                <select
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                >
                  <option value="">Custom (use field above)</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Web Portal">Web Portal</option>
                  <option value="Web Landing Pages">Web Landing Pages</option>
                  <option value="Logo Designs">Logo Designs</option>
                  <option value="Poster Designs">Poster Designs</option>
                  <option value="Micro Animations">Micro Animations</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 2023"
                />
              </div>
              <div className="form-field">
                <label>Project Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="form-field">
              <label>Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Describe the project... Use the toolbar to format text, add colors, emojis, and more!"
              />
            </div>

            <div className="form-field">
              <label>Tags (comma separated)</label>
              <textarea
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="UI, UX, Mobile, Web, Design, Prototype"
                rows="2"
              />
              {tagsText && (
                <div className="field-preview">
                  <small>Preview ({convertTextToArray(tagsText).length} tags):</small>
                  <div className="preview-tags">
                    {convertTextToArray(tagsText).map((tag, idx) => (
                      <span key={idx} className="preview-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
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
              {item?.id ? 'Update' : 'Add'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioEditor;

