import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.dataset.animation);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [portfolioItems]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group items by category and subtitle, sorted by order
  const getItemsByCategory = (category) => {
    return portfolioItems
      .filter(item => item.category === category)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const getItemsByCategoryAndSubtitle = (category, subtitle) => {
    return portfolioItems
      .filter(item => item.category === category && item.subtitle === subtitle)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  if (loading) {
    return <div className="portfolio-wrapper"><div className="portfolio">Loading...</div></div>;
  }

  // Get items by sections
  const designSystemItems = getItemsByCategory('Design System');
  const caseStudyItems = getItemsByCategory('Case Study');
  const prototypeItems = getItemsByCategory('Prototype');
  const mobileApps = getItemsByCategoryAndSubtitle('UI Design', 'Mobile Application');
  const webPortals = getItemsByCategoryAndSubtitle('UI Design', 'Web Portal');
  const webLanding = getItemsByCategoryAndSubtitle('UI Design', 'Web Landing Pages');
  const logos = getItemsByCategoryAndSubtitle('UI Design', 'Logo Designs');
  const posters = getItemsByCategory('Poster');
  const animations = getItemsByCategory('Animation');

  // Get all remaining items for "Other Projects"
  // Combine all other UI Design items that don't fit in predefined categories
  const otherUIDesign = getItemsByCategory('UI Design').filter(item =>
    item.subtitle !== 'Mobile Application' &&
    item.subtitle !== 'Web Portal' &&
    item.subtitle !== 'Web Landing Pages' &&
    item.subtitle !== 'Logo Designs'
  );

  // Get any items with categories not covered above
  const otherItems = portfolioItems.filter(item =>
    item.category !== 'Design System' &&
    item.category !== 'Case Study' &&
    item.category !== 'Prototype' &&
    item.category !== 'UI Design' &&
    item.category !== 'Poster' &&
    item.category !== 'Animation'
  );

  // Combine all "other" items
  const allOtherItems = [
    ...otherUIDesign,
    ...otherItems
  ];

  return (
    <div className="portfolio-wrapper">
      <div className="portfolio">
        {/* Design System Section */}
        {designSystemItems.length > 0 && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="items-grid">
              {designSystemItems.map(item => (
                <div className="section-card" key={item.id}>
                  <h3 className="section-title">{item.title}</h3>
                  <p className="section-subtitle">{item.subtitle}</p>
                  <a
                    href={item.link || '#'}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : ""}
                    className="portfolio-link"
                  >
                    <div className="design-system-preview">
                      <div className="design-system-gradient">
                        <img src={item.image} alt={item.title} className="ds-bg" />
                        <h2 className="ds-title">Design</h2>
                        <h2 className="ds-subtitle">System</h2>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story Boarding & Remote Monitoring Section */}
        {(caseStudyItems.length > 0 || prototypeItems.length > 0) && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="items-grid">
              {caseStudyItems.map(item => (
                <div className="section-card" key={item.id}>
                  <h3 className="section-title">{item.title}</h3>
                  <p className="section-subtitle">{item.subtitle}</p>
                  <a
                    href={item.link || '#'}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : ""}
                    className="portfolio-link"
                  >
                    <div className="case-study-preview">
                      <img src={item.image} alt={item.title} className="preview-image" />
                    </div>
                  </a>
                </div>
              ))}
              {prototypeItems.map(item => (
                <div className="section-card" key={item.id}>
                  <h3 className="section-title">{item.title}</h3>
                  <p className="section-subtitle">{item.subtitle}</p>
                  <a
                    href={item.link || '#'}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : ""}
                    className="portfolio-link"
                  >
                    <div className="prototype-preview">
                      <img src={item.image} alt={item.title} className="preview-image" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Application Section */}
        {mobileApps.length > 0 && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="section-card full-width">
              <h3 className="section-title">Mobile Application</h3>
              <div className="portfolio-grid">
                {mobileApps.map(item => (
                  <a
                    key={item.id}
                    href={item.link || '#'}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : ""}
                    className="portfolio-item portfolio-link"
                  >
                    <img src={item.image} alt={item.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Web Portal & Landing Pages Section */}
        {(webPortals.length > 0 || webLanding.length > 0) && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="section-card full-width">
              <div className="dual-section-grid">
                <div className="dual-column">
                  <h3 className="section-title">Web Portal</h3>
                  <div className="portfolio-grid">
                    {webPortals.map(item => (
                      <a
                        key={item.id}
                        href={item.link || '#'}
                        target={item.link ? "_blank" : "_self"}
                        rel={item.link ? "noopener noreferrer" : ""}
                        className="portfolio-item portfolio-link"
                      >
                        <img src={item.image} alt={item.title} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="dual-column">
                  <h3 className="section-title">Web Landing Pages</h3>
                  <div className="portfolio-grid">
                    {webLanding.map(item => (
                      <a
                        key={item.id}
                        href={item.link || '#'}
                        target={item.link ? "_blank" : "_self"}
                        rel={item.link ? "noopener noreferrer" : ""}
                        className="portfolio-item portfolio-link"
                      >
                        <img src={item.image} alt={item.title} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logo & Poster Designs Section */}
        {(logos.length > 0 || posters.length > 0) && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="section-card full-width">
              <div className="dual-section-grid">
                <div className="dual-column">
                  <h3 className="section-title">Logo Designs</h3>
                  <div className="portfolio-grid">
                    {logos.map(item => (
                      <a
                        key={item.id}
                        href={item.link || '#'}
                        target={item.link ? "_blank" : "_self"}
                        rel={item.link ? "noopener noreferrer" : ""}
                        className="portfolio-item portfolio-link"
                      >
                        <img src={item.image} alt={item.title} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="dual-column">
                  <h3 className="section-title">Poster Designs</h3>
                  <div className="portfolio-grid">
                    {posters.map(item => (
                      <a
                        key={item.id}
                        href={item.link || '#'}
                        target={item.link ? "_blank" : "_self"}
                        rel={item.link ? "noopener noreferrer" : ""}
                        className="portfolio-item poster-item portfolio-link"
                      >
                        <img src={item.image} alt={item.title} />
                        <div className="poster-overlay">
                          <h4 className="poster-title">{item.title.split(' ')[0]}</h4>
                          <p className="poster-subtitle">{item.title.split(' ').slice(1).join(' ')}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Micro Animations Section */}
        {animations.length > 0 && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="section-card full-width">
              <h3 className="section-title">Micro Animations</h3>
              <div className="animations-grid">
                {animations.map(item => (
                  <a
                    key={item.id}
                    href={item.link || '#'}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : ""}
                    className="animation-item portfolio-link"
                  >
                    <img src={item.image} alt={item.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other Projects Section - Shows any items that don't fit above categories */}
        {allOtherItems.length > 0 && (
          <div className="portfolio-section animate-on-scroll" data-animation="fade-in-up">
            <div className="section-card full-width">
              <h3 className="section-title">Other Projects</h3>
              <div className="portfolio-grid">
                {allOtherItems.map(item => (
                  <a
                    key={item.id}
                    href={item.link || '#'}
                    target={item.link ? "_blank" : "_self"}
                    rel={item.link ? "noopener noreferrer" : ""}
                    className="portfolio-item portfolio-link"
                  >
                    <img src={item.image} alt={item.title} />
                    {item.subtitle && (
                      <div className="portfolio-item-overlay">
                        <p className="item-subtitle">{item.title}</p>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;

