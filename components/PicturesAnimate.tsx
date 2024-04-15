import React, { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    // Phase 1: Animations for moving the second image
    tl.to(".secondvideo", {
      y: "100vh", // Moves the image vertically
      rotation: 0, // Rotates the image to 0 degrees
      ease: "none",
      duration: 3 // Specifies duration to control the timing of the scroll animation
    });

    // Phase 2: Animations for resizing the second image
    tl.to(".secondvideo", {
      width: "80vw",
      height: "80vh",
      xPercent: -25,
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

  // Using viewport units for base dimensions to ensure responsiveness
  const baseWidthVW = 40;
  const baseHeightVH = 20;

  return (
    <>
      <div className='pt-500'> {/* Original larger padding for desktop */}
        <div className='relative w-full min-h-screen grid place-items-center '>
          <div style={{ width: `${baseWidthVW}vw`, height: `${baseHeightVH}vh` }} className='relative'>
            {/* First Image - No animations associated */}
            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(-3deg)' }}>
              <img src="https://images.pexels.com/photos/20484222/pexels-photo-20484222/free-photo-of-eyes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Blue Visual" className="w-full h-full object-cover" />
            </div>
            {/* Second Image - Animations associated */}
            <div className='secondvideo absolute inset-0 grid place-items-center' style={{ transform: 'rotate(3deg)' }}>
              <img src="https://images.pexels.com/photos/20881051/pexels-photo-20881051/free-photo-of-under-the-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Red Visual" className="w-full h-full object-cover" />
            </div>
            {/* Third Image - No animations associated */}
            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(20deg)' }}>
              <img src="https://images.pexels.com/photos/20881562/pexels-photo-20881562/free-photo-of-mua-v-t-ch-y-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Yellow Visual" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PicturesAnimate;
