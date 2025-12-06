import React from 'react';
import './MobileHeader.css';

const MobileHeader = ({ onProfileClick }) => {
  return (
    <div className="mobile-header">
      <div className="mobile-profile" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
        <img src="/images/profile-avatar.svg" alt="Sridhar" className="mobile-avatar" />
        <div className="mobile-info">
          <h1 className="mobile-name">Sridhar</h1>
          <p className="mobile-title">UI/UX Designer II</p>
          <p className="mobile-exp">14 years experience</p>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;

