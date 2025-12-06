import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DynamicPage.css';

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5001/api/pages/${slug}`);
      
      if (response.ok) {
        const data = await response.json();
        setPage(data);
      } else if (response.status === 404) {
        setError('Page not found');
      } else {
        setError('Failed to load page');
      }
    } catch (err) {
      console.error('Error fetching page:', err);
      setError('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dynamic-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="dynamic-page">
        <div className="error-state">
          <h2>📄 {error || 'Page not found'}</h2>
          <p>The page you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Format content for display - preserve line breaks for simple text
  const formatContent = (content) => {
    // If content has HTML tags, return as is
    if (/<[a-z][\s\S]*>/i.test(content)) {
      return content;
    }
    // Otherwise, convert line breaks to <br> tags for simple text
    return content.split('\n').map((line, i) => 
      line ? `<p>${line}</p>` : '<br>'
    ).join('');
  };

  return (
    <div className="dynamic-page">
      {/* Full Screen Banner */}
      {page.bannerType === 'fullscreen' && page.bannerImage && (
        <div className="fullscreen-banner">
          <img src={`http://localhost:5001${page.bannerImage}`} alt={page.title} />
        </div>
      )}

      <div className="page-container">
        <div className="page-card">
          <h1 className="page-title">{page.title}</h1>
          
          {/* Left/Right Banner with Content */}
          {(page.bannerType === 'left' || page.bannerType === 'right') && page.bannerImage ? (
            <div className={`content-with-banner banner-${page.bannerType}`}>
              <div className="banner-image">
                <img src={`http://localhost:5001${page.bannerImage}`} alt={page.title} />
              </div>
              <div 
                className="page-content" 
                dangerouslySetInnerHTML={{ __html: formatContent(page.content) }}
              />
            </div>
          ) : (
            <div 
              className="page-content" 
              dangerouslySetInnerHTML={{ __html: formatContent(page.content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;

