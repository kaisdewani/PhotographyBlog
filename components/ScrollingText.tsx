import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollingText: React.FC = () => {
    const railRef = useRef<HTMLDivElement>(null);
    const [lastScrollTop, setLastScrollTop] = useState(1);
    const [scrollSpeed, setScrollSpeed] = useState(1); // Current speed of the scroll
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
            setLastScrollTop(st <= 0 ? 0 : st); // For mobile or negative scrolling
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

    // Create an array of 10 elements to map over
    const texts = Array.from({ length: 10 }, (_, i) => `D.R.A Films`);

    return (
        <div className="overflow-hidden flex justify-center items-center z-1 absolute left-0 right-0" style={{ top: '60%' }}>
            <div ref={railRef} className="flex whitespace-nowrap">
                {texts.map((text, index) => (
                    <h1 key={index} className="text-8xl font-bold mx-8 text-white">
                        {text}
                    </h1>
                ))}
            </div>
        </div>
    );
};

export default ScrollingText;
