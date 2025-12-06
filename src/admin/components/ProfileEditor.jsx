import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ToolManager from './ToolManager';
import './Editor.css';

const ProfileEditor = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    title: '',
    experience: '',
    skills: [],
    tools: [],
    languages: [],
    phone: '',
    email: '',
    linkedin: '',
    behance: '',
    avatar: '',
    primaryColor: '#FE275C',
    secondaryColor: '#0387C3'
  });
  
  // Text versions for editing (to allow comma typing)
  const [skillsText, setSkillsText] = useState('');
  const [languagesText, setLanguagesText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/profile');
      if (response.ok) {
        const data = await response.json();
        
        // Convert old string array tools to new object format if needed
        if (data.tools && Array.isArray(data.tools)) {
          data.tools = data.tools.map(tool => {
            if (typeof tool === 'string') {
              // Old format: convert string to object
              return { name: tool, icon: getDefaultIcon(tool) };
            }
            return tool; // Already in new format
          });
        }
        
        setProfile(data);
        
        // Convert arrays to text for editing
        setSkillsText(Array.isArray(data.skills) ? data.skills.join(', ') : '');
        setLanguagesText(Array.isArray(data.languages) ? data.languages.join(', ') : '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getDefaultIcon = (toolName) => {
    // Map of tool names to default icon paths
    const iconMap = {
      'Figma': '/images/figma-icon.png',
      'Miro': '/images/miro-icon.png',
      'Jitter': '/images/jitter-icon.png',
      'Adobe Creative Cloud': '/images/adobe-icon.png',
      'MS Office': '/images/msoffice-icon.png'
    };
    return iconMap[toolName] || '/images/tool-default.png';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      
      // Convert text fields to arrays
      const profileToSave = {
        ...profile,
        skills: convertTextToArray(skillsText),
        languages: convertTextToArray(languagesText)
        // tools is already an array of objects, no conversion needed
      };
      
      // Log what we're sending for debugging
      console.log('Saving profile data:', profileToSave);
      console.log('Skills:', profileToSave.skills);
      console.log('Tools:', profileToSave.tools);
      console.log('Languages:', profileToSave.languages);
      
      const response = await fetch('http://localhost:5001/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileToSave)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Profile saved successfully:', result);
        setMessage('✅ Profile updated successfully! Changes are now live on your website.');
        setTimeout(() => setMessage(''), 5000);
        
        // Refresh profile data to ensure sync
        await fetchProfile();
      } else {
        const error = await response.json();
        console.error('Failed to update profile:', error);
        setMessage('❌ Failed to update profile: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('❌ Failed to update profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const convertTextToArray = (text) => {
    // Convert comma-separated text to array when needed
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item !== '');
  };
  
  const handleToolsChange = (updatedTools) => {
    setProfile({ ...profile, tools: updatedTools });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/upload/single', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setProfile({ ...profile, avatar: data.url });
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout} title="Profile">
        <div className="loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout} title="Profile Editor">
      <div className="editor-container">
        {message && (
          <div className={message.includes('❌') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}
        
        <div className="info-box">
          <h3>ℹ️ How to Use Comma-Separated Fields</h3>
          <ul>
            <li><strong>Separate items with commas:</strong> Figma, Adobe XD, Sketch</li>
            <li><strong>Special characters are allowed:</strong> UI / UX Design, HTML / CSS</li>
            <li><strong>Each item will become a tag:</strong> You'll see a live preview below each field</li>
            <li><strong>Extra spaces are removed automatically</strong></li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-field">
              <label>Profile Avatar</label>
              <div className="avatar-upload-container">
                {profile.avatar && (
                  <div className="avatar-preview">
                    <img src={profile.avatar} alt="Avatar" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  id="avatar-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-upload" className="upload-button">
                  {uploading ? 'Uploading...' : profile.avatar ? 'Change Avatar' : 'Upload Avatar'}
                </label>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name || ''}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="form-field">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location || ''}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={profile.title || ''}
                  onChange={handleChange}
                  placeholder="Job title"
                />
              </div>
              <div className="form-field">
                <label>Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={profile.experience || ''}
                  onChange={handleChange}
                  placeholder="e.g., 14 years"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Skills & Tools</h2>
            <div className="form-field">
              <label>Skills (comma separated) - Use forward slash (/) for compound skills</label>
              <textarea
                name="skills"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="UX Research, UI / UX Design, HTML / CSS, etc."
                rows="4"
              />
              {skillsText && (
                <div className="field-preview">
                  <small>Preview ({convertTextToArray(skillsText).length} skills):</small>
                  <div className="preview-tags">
                    {convertTextToArray(skillsText).map((skill, idx) => (
                      <span key={idx} className="preview-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="form-field">
              <ToolManager 
                tools={profile.tools || []} 
                onSave={handleToolsChange}
              />
            </div>
            
            <div className="form-field">
              <label>Languages (comma separated)</label>
              <textarea
                name="languages"
                value={languagesText}
                onChange={(e) => setLanguagesText(e.target.value)}
                placeholder="English, Hindi, Telugu, Kannada, Tamil"
                rows="2"
              />
              {languagesText && (
                <div className="field-preview">
                  <small>Preview ({convertTextToArray(languagesText).length} languages):</small>
                  <div className="preview-tags">
                    {convertTextToArray(languagesText).map((lang, idx) => (
                      <span key={idx} className="preview-tag">{lang}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Branding Colors</h2>
            <div className="form-row">
              <div className="form-field">
                <label>Primary Color (Pink)</label>
                <div className="color-picker-container">
                  <input
                    type="color"
                    name="primaryColor"
                    value={profile.primaryColor || '#FE275C'}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="primaryColor"
                    value={profile.primaryColor || '#FE275C'}
                    onChange={handleChange}
                    placeholder="#FE275C"
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Secondary Color (Blue)</label>
                <div className="color-picker-container">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={profile.secondaryColor || '#0387C3'}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="secondaryColor"
                    value={profile.secondaryColor || '#0387C3'}
                    onChange={handleChange}
                    placeholder="#0387C3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-row">
              <div className="form-field">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone || ''}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email || ''}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="form-field">
                <label>Behance URL</label>
                <input
                  type="url"
                  name="behance"
                  value={profile.behance || ''}
                  onChange={handleChange}
                  placeholder="https://behance.net/..."
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProfileEditor;

