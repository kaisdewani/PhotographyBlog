import React, { useEffect, useRef, useState } from 'react';

const ScrollingText: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0); // Current speed of the scroll
  const [targetSpeed, setTargetSpeed] = useState(1); // Target speed (1 or -1)

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // Down scroll, scrolling to the right
        setTargetSpeed(1);
      } else {
        // Up scroll, scrolling to the left
        setTargetSpeed(-1);
      }
      setLastScrollTop(st <= 0 ? 0 : st); // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animationFrameId: number;

    const animate = () => {
      // Gradually adjust the scroll speed towards the target speed
      if (scrollSpeed !== targetSpeed) {
        // Apply a damping effect to smooth out the speed transition
        const damping = 0.05;
        setScrollSpeed((prevSpeed) => prevSpeed + damping * (targetSpeed - prevSpeed));
      }
      
      // Apply the calculated scroll speed to transform the rail
      const transformX = parseFloat(getComputedStyle(rail).transform.split(',')[4] || '0') + scrollSpeed;
      rail.style.transform = `translateX(${transformX}px)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetSpeed]);

  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center ">
      <div ref={railRef} className="flex whitespace-nowrap">
        <h4 className="text-8xl font-bold mx-8 text-white">Lorem Ipsum Sit Dolor</h4>
        <h4 className="text-8xl font-bold mx-8 text-white">Lorem Ipsum Sit Dolor</h4>
        <h4 className="text-8xl font-bold mx-8 text-white">Lorem Ipsum Sit Dolor</h4>
      </div>
    </div>
  );
};

export default ScrollingText;
