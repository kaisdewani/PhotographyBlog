import React, { useEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";


const RevealText = () => {

  useEffect(() => {
    {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".revealtext",
          start: "center center",
          end: "300vh center",
          scrub: true,
          markers: true
        }
      });

      tl.to(".revealtext", {
        opacity: 1,
        ease: "none",
        duration: 0.3
      })

      return () => {
        tl.kill();
      };
    }
  }, []);


  return (
    <p className='revealtext bg-pink-600 opacity-0'>RevealText</p>
  )
}

export default RevealText