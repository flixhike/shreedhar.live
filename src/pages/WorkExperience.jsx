import React, { useState, useEffect } from 'react';
import './WorkExperience.css';

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
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
  }, [experiences]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/experience');
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

  if (loading) {
    return <div className="work-experience">Loading...</div>;
  }

  const education = [
    {
      id: 1,
      logo: '/images/university-2.png',
      institution: 'Board of Intermediate and secondary education',
      school: 'Little Buds High School',
      degree: 'Intermediate'
    },
    {
      id: 2,
      logo: '/images/university-1.png',
      institution: 'Kakatiya University',
      school: 'Bachelor of Commerce. Compurtes',
      degree: 'Bcom.Computers'
    }
  ];

  return (
    <div className="work-experience">
      <div className="experience-content">
        {experiences.map((exp, index) => (
          <div key={exp.id}>
            <div className={`experience-item animate-on-scroll delay-${index * 100}`} data-animation="fade-in-up">
              <div className="experience-logo">
                <img src={exp.logo} alt={exp.company} />
              </div>
              <div className="experience-details">
                <p className="experience-company">{exp.company}</p>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-period">{exp.period}</p>
                <p className="experience-description" dangerouslySetInnerHTML={{ __html: exp.description }} />
                {exp.projects && (
                  <div className="experience-projects">
                    {exp.projects.map((project, idx) => (
                      <span key={idx} className="project-tag">{project}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {index < experiences.length - 1 && <div className="experience-divider"></div>}
          </div>
        ))}
      </div>

      <div className="education-section animate-on-scroll" data-animation="fade-in-up">
        <div className="education-card">
          <h2 className="education-title">Education</h2>
          <div className="education-content">
            {education.map((edu, index) => (
              <div key={edu.id} className={`education-item animate-on-scroll delay-${(index + 1) * 100}`} data-animation="scale-in">
                <div className="education-logo">
                  <img src={edu.logo} alt={edu.institution} />
                </div>
                <div className="education-details">
                  <p className="education-institution">{edu.institution}</p>
                  <h3 className="education-degree">{edu.degree}</h3>
                  <p className="education-school">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;

