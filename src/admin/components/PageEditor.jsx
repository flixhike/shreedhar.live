import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import './Editor.css';

const PageEditor = ({ page, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    menuOrder: 4,
    showInMenu: true,
    published: true,
    bannerType: 'none', // none, fullscreen, left, right
    bannerImage: '',
    ...page
  });
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  // Detect if content has HTML tags to auto-select rich text mode
  const hasHTMLTags = page?.content && /<[a-z][\s\S]*>/i.test(page.content);
  const [useRichText, setUseRichText] = useState(hasHTMLTags || false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Get content stripped of HTML for simple text mode
  const getSimpleTextContent = () => {
    if (!formData.content) return '';
    // Strip HTML tags
    const stripped = formData.content.replace(/<[^>]*>/g, '');
    return stripped;
  };

  // Handle switching between editor modes
  const handleEditorModeChange = (richText) => {
    setUseRichText(richText);
    // If switching to rich text and content is plain text, wrap it properly
    if (richText && formData.content && !/<[a-z][\s\S]*>/i.test(formData.content)) {
      // Convert plain text to HTML paragraphs
      const htmlContent = formData.content
        .split('\n')
        .map(line => line.trim() ? `<p>${line}</p>` : '<br>')
        .join('');
      setFormData({ ...formData, content: htmlContent });
    }
  };

  const handleBannerUpload = async (e) => {
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
        setFormData({ ...formData, bannerImage: data.url });
      } else {
        setError('Banner upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Banner upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Validate title
    if (!formData.title || formData.title.trim() === '') {
      setError('Page title is required');
      return;
    }
    
    // Validate content - more lenient checking
    const contentToCheck = formData.content || '';
    const strippedContent = contentToCheck.replace(/<[^>]*>/g, '').trim();
    
    if (!strippedContent || strippedContent.length === 0) {
      setError('Page content is required - please add some text');
      return;
    }
    
    console.log('Submitting page:', {
      title: formData.title,
      contentLength: formData.content.length,
      bannerType: formData.bannerType,
      published: formData.published
    });
    
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-large">
        <div className="modal-header">
          <h2>{page?.id ? 'Edit Page' : 'Add New Page'}</h2>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}
            
            <div className="info-box">
              <h3>ℹ️ How Custom Pages Work</h3>
              <ul>
                <li><strong>Page Title:</strong> Appears in the navigation menu</li>
                <li><strong>URL:</strong> Auto-generated from title (e.g., "Contact Us" → /contact-us)</li>
                <li><strong>Banner:</strong> Optional full-screen or side image</li>
                <li><strong>Content:</strong> Simple text or rich formatting</li>
                <li><strong>Menu Order:</strong> Position in navigation (1=first, higher=later)</li>
              </ul>
            </div>

            <div className="form-field">
              <label>Page Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Contact, Services, About Projects"
                required
              />
              {formData.title && (
                <small style={{ display: 'block', marginTop: '8px', color: '#6B7280' }}>
                  URL will be: <strong>/{formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}</strong>
                </small>
              )}
            </div>

            <div className="form-section-title">
              <h3>Banner Image (Optional)</h3>
            </div>

            <div className="form-field">
              <label>Banner Type</label>
              <select
                name="bannerType"
                value={formData.bannerType || 'none'}
                onChange={handleChange}
              >
                <option value="none">No Banner</option>
                <option value="fullscreen">Full Screen Banner</option>
                <option value="left">Image Left (300x300)</option>
                <option value="right">Image Right (300x300)</option>
              </select>
            </div>

            {formData.bannerType !== 'none' && (
              <div className="form-field">
                <label>Upload Banner Image</label>
                <div className="avatar-upload-container">
                  {formData.bannerImage && (
                    <div className="image-preview">
                      <img src={`http://localhost:5001${formData.bannerImage}`} alt="Banner" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    disabled={uploading}
                    id="banner-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="banner-upload" className="upload-button">
                    {uploading ? 'Uploading...' : formData.bannerImage ? 'Change Banner' : 'Upload Banner'}
                  </label>
                </div>
                <small style={{ display: 'block', marginTop: '8px', color: '#6B7280' }}>
                  {formData.bannerType === 'fullscreen' ? 'Recommended: 1920x600px or larger' : 'Recommended: 300x300px'}
                </small>
              </div>
            )}

            <div className="form-section-title" style={{ marginTop: '30px' }}>
              <h3>Page Content</h3>
            </div>

            <div className="form-field">
              <div className="editor-toggle">
                <label className="toggle-option">
                  <input
                    type="radio"
                    checked={!useRichText}
                    onChange={() => handleEditorModeChange(false)}
                  />
                  <span>Simple Text (Recommended)</span>
                </label>
                <label className="toggle-option">
                  <input
                    type="radio"
                    checked={useRichText}
                    onChange={() => handleEditorModeChange(true)}
                  />
                  <span>Rich Text Editor (Advanced)</span>
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>Page Content *</label>
              {useRichText ? (
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="Write your page content here... Use the toolbar to format text, add colors, emojis, lists, and more!"
                />
              ) : (
                <textarea
                  name="content"
                  value={getSimpleTextContent()}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your page content here... Just type normally!&#10;&#10;Example:&#10;Get In Touch&#10;&#10;📧 Email: your.email@example.com&#10;📱 Phone: +91 1234567890&#10;🌍 Location: Bangalore, India"
                  rows="15"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '15px',
                    lineHeight: '1.8',
                    fontFamily: 'Roboto, sans-serif',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    resize: 'vertical'
                  }}
                />
              )}
              <small style={{ display: 'block', marginTop: '8px', color: '#6B7280' }}>
                {useRichText ? 'Use the toolbar above to format your text' : 'Just type naturally - line breaks and spacing preserved'}
              </small>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Menu Order</label>
                <input
                  type="number"
                  name="menuOrder"
                  value={formData.menuOrder}
                  onChange={handleChange}
                  placeholder="e.g., 4"
                  min="1"
                  max="99"
                />
                <small style={{ display: 'block', marginTop: '4px', color: '#6B7280' }}>
                  Default pages: About (1), Experience (2), Portfolio (3)
                </small>
              </div>
              
              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="showInMenu"
                    checked={formData.showInMenu !== false}
                    onChange={handleChange}
                  />
                  <span>Show in navigation menu</span>
                </label>
              </div>
            </div>

            <div className="form-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published !== false}
                  onChange={handleChange}
                />
                <span>Publish immediately (visible on website)</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              {page?.id ? 'Update' : 'Add'} Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageEditor;

