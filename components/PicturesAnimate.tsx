import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollingText from "./ScrollingText";

const PicturesAnimate = () => {
  useEffect(() => {
      // Register the ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Timeline for animating the second image
      let tl = gsap.timeline({
          scrollTrigger: {
              trigger: ".secondvideo",
              start: "center center",
              end: "500% center",
              scrub: true,
              markers: true
          }
      });

      // Adjust base dimensions by 30%
      const baseWidthVW = 40 * 1.3; // originally 40vw
      const baseHeightVH = 20 * 1.3; // originally 20vh

      // Phase 1: Animations for moving the second image
      tl.to(".secondvideo", {
          y: "100vh", // Moves the image vertically
          rotation: 0, // Rotates the image to 0 degrees
          ease: "none",
          duration: 3 // Specifies duration to control the timing of the scroll animation
      });

      // Phase 2: Animations for resizing the second image
      tl.to(".secondvideo", {
          width: `${80}vw`, // originally 80vw, increased by 30%
          height: `${80}vh`, // originally 80vh, increased by 30%
          xPercent: -20,
          yPercent: -50,
          ease: "none",
          duration: 3, // Duration for resizing
          transformOrigin: "center center" // Ensures the scaling is centered
      });

      // Cleanup function to kill animations and ScrollTriggers when the component unmounts
      return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
  }, []); // Ensures that the effect runs only once on mount

  return (
      <>
          <div className='pt-500 relative z-10'> {/* Original larger padding for desktop */}
              <div className='w-full min-h-screen grid place-items-center'>
                  <div style={{ width: `${52}vw`, height: `${26}vh` }} className='relative'> {/* Adjusted sizes */}
                      {/* First Image - No animations associated */}
                      <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(-3deg)' }}>
                          <img src="https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/8ee8ee95-a9cb-4ebe-ad30-a40c44b0582b/Untitled.jpg?format=2500w" alt="Blue Visual" className="w-full h-full object-cover" />
                      </div>
                      {/* Second Image - Animations associated */}
                      <div className='secondvideo absolute inset-0 grid place-items-center' style={{ transform: 'rotate(3deg)' }}>
                          <img src="https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/d6c4943d-5fa6-4f86-b856-3e63da926682/Untitled.jpg" alt="Red Visual" className="w-full h-full object-cover" />
                      </div>
                      {/* Third Image - No animations associated */}
                      <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(20deg)' }}>
                          <img src="https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/6bf520dc-f69c-49e5-9eaf-e57b91153c05/Untitled.jpg" alt="Yellow Visual" className="w-full h-full object-cover" />
                      </div>
                  </div>
              </div>
          </div>
          <ScrollingText /> {/* Render the ScrollingText component */}
      </>
  );
}

export default PicturesAnimate;
