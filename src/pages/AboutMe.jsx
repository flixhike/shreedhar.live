import React, { useEffect } from 'react';
import './AboutMe.css';

const AboutMe = () => {
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
  }, []);

  return (
    <div className="about-me">
      <div className="about-layout">
        <div className="about-image-container animate-on-scroll" data-animation="slide-in-left">
          <img src="/images/about-me-image.png" alt="About Me" className="about-image" />
        </div>
        
        <div className="about-text-wrapper">
          <p className="intro-text animate-on-scroll" data-animation="fade-in-up">
            My journey in the world of design began in 2010, and since then, I have had the privilege 
            of working with a diverse range of IT software services and product companies. Throughout 
            my career, I have successfully transitioned into a UX designer, dedicating the last four 
            years to mastering the intricacies of this field.
          </p>
          
          <p className="detail-text animate-on-scroll delay-100" data-animation="fade-in-up">
            My unwavering commitment to a "Customer First" approach ensures that the UX solutions I 
            craft are not only user-centric but also user-friendly.
          </p>
          
          <p className="detail-text animate-on-scroll delay-200" data-animation="fade-in-up">
            My design process is comprehensive, encompassing brainstorming, ideation, research, feature 
            development, interaction design, interface design, and user testing. I have had the opportunity 
            to work on a variety of projects, including web apps, mobile apps, native apps, responsive 
            websites, marketing materials, and print materials. This diverse experience has honed my 
            ability to adapt to different design challenges effectively.
          </p>
          
          <p className="detail-text animate-on-scroll delay-300" data-animation="fade-in-up">
            I pride myself on being adaptable, capable of excelling as an individual contributor or 
            leading and managing a design team. My track record demonstrates my ability to consistently 
            meet organisational and leadership expectations, making me a valuable asset to any team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

