import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeUpText: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check and set the mobile state immediately and when resizing
    handleResize(); // This sets the initial state based on the current viewport size

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const elements = ref.current?.getElementsByClassName('line');

    if (elements && typeof isMobile === 'boolean') {
      const startX = isMobile ? 50 : 100;
      const startY = isMobile ? 50 : 100;

      gsap.fromTo(elements, 
        { x: startX, y: startY, opacity: 0 }, // Start state
        {
          x: 0, // End state for x-axis
          y: 0, // End state for y-axis
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out', 
          scrollTrigger: {
            trigger: ref.current,
            start: isMobile ? "top center" : "center center",
            end: "100% center",
            scrub: true,
            markers: true
          }
        }
      );
    }
  }, [isMobile]); // Re-run this effect when isMobile changes

  // Example text split by new lines
  const text = `Discover the art of professional photography with D.J.A Films. 
  From heartfelt wedding vows to thrilling sports action and elegant corporate gatherings, 
  we masterfully capture and craft your stories into timeless photos and videos. 
  Elevate your memories with clarity and style — experience your events as never before.`;

  // Splitting the text into lines
  const lines = text.split('\n');

  return (
    <div ref={ref} className="main-wrapper">
      <section className="black">
        <div className="container">
          <h1 className="fade-up"></h1>
          {lines.map((line, index) => (
            <p key={index} className="fade-up line" style={{ fontSize: isMobile ? '30px' : '50px' }}>
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FadeUpText;
