import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const [profile, setProfile] = useState({
    name: 'Sridhar',
    location: 'Bangalore',
    title: 'UI/UX Designer II',
    experience: '14 years of experience',
    avatar: '/images/profile-avatar.svg',
    skills: [],
    tools: [],
    languages: [],
    phone: '9986256789',
    email: 'ssri46@gmail.com',
    linkedin: 'https://www.linkedin.com/in/korampallisridhar/',
    behance: 'https://www.behance.net/sridhardesigns'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(prevProfile => ({ ...prevProfile, ...data }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const getToolIcon = (tool) => {
    // Handle both old format (string) and new format (object with name and icon)
    if (typeof tool === 'object' && tool.icon) {
      return tool.icon;
    }
    // Fallback for old string format
    const toolIcons = {
      'Figma': '/images/figma-icon.png',
      'Miro': '/images/miro-icon.png',
      'Jitter': '/images/jitter-icon.png',
      'Adobe Creative Cloud': '/images/adobe-icon.png',
      'MS Office': '/images/msoffice-icon.png'
    };
    const toolName = typeof tool === 'string' ? tool : tool.name;
    return toolIcons[toolName] || '/images/tool-default.png';
  };

  const getToolName = (tool) => {
    return typeof tool === 'string' ? tool : tool.name;
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <img src={profile.avatar || '/images/profile-avatar.svg'} alt={profile.name} className="profile-avatar" />
          <div className="live-badge-wrapper">
            <div className="avatar-ring"></div>
            <div className="live-badge">LIVE</div>
          </div>
        </div>
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-location">{profile.location}</p>
        <h2 className="profile-title">{profile.title}</h2>
        <p className="profile-experience">{profile.experience}</p>

        {/* Contact info at top */}
        <div className="profile-contact-top">
          <div className="contact-item-top">
            <img src="/images/phone-icon.svg" alt="Phone" className="contact-icon-top" />
            <span>{profile.phone}</span>
          </div>
          <div className="contact-item-top">
            <img src="/images/mail-icon.svg" alt="Email" className="contact-icon-top" />
            <span>{profile.email}</span>
          </div>
        </div>
      </div>

      {/* Mobile Expand Toggle removed - showing all info by default */}

      <div className="profile-details-container expanded">
        {profile.skills && profile.skills.length > 0 && (
          <>
            <div className="profile-section">
              <div className="section-header">
                <div className="section-line"></div>
                <div className="section-title-wrapper">
                  <span className="section-title">Skills</span>
                </div>
              </div>
            </div>

            <div className="skills-tags">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </>
        )}

        {profile.tools && profile.tools.length > 0 && (
          <>
            <div className="profile-section">
              <div className="section-header">
                <div className="section-line"></div>
                <div className="section-title-wrapper">
                  <span className="section-title">Tools</span>
                </div>
              </div>
            </div>

            <div className="tools-list">
              {profile.tools.map((tool, index) => (
                <div key={index} className="tool-item">
                  <img src={getToolIcon(tool)} alt={getToolName(tool)} className="tool-icon" />
                  <span>{getToolName(tool)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {profile.languages && profile.languages.length > 0 && (
          <>
            <div className="profile-section">
              <div className="section-header">
                <div className="section-line"></div>
                <div className="section-title-wrapper">
                  <span className="section-title">Languages</span>
                </div>
              </div>
            </div>

            <div className="languages-tags">
              {profile.languages.map((language, index) => (
                <span key={index} className="language-tag">{language}</span>
              ))}
            </div>
          </>
        )}

        <div className="profile-section">
          <div className="section-header">
            <div className="section-line"></div>
            <div className="section-title-wrapper">
              <span className="section-title">Web</span>
            </div>
          </div>
        </div>

        <div className="social-links">
          <div className="social-item">
            <img src="/images/linkedin-icon.png" alt="LinkedIn" className="social-icon" />
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              {profile.linkedin}
            </a>
          </div>
          <div className="social-item">
            <img src="/images/behance-icon.png" alt="Behance" className="social-icon" />
            <a href={profile.behance} target="_blank" rel="noopener noreferrer">
              {profile.behance}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

