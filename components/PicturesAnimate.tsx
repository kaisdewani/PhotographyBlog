import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollingText from "./ScrollingText";
import { client } from "@/app/lib/sanity";
import { IHomepagePictures } from "@/app/lib/interface";
import Image from 'next/image';

async function getData(): Promise<IHomepagePictures[]> {
  const query = `*[_type == "homepagePictures"]{
    title,
    images[]{
      asset->{
        _id,
        url
      }
    }
  }`;

  const data = await client.fetch<IHomepagePictures[]>(query);
  return data;
}

const PicturesAnimate: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  // Initialize isMobile as undefined or a default state
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Ensure window is defined (thus ensuring client-side execution)
    handleResize(); // Set initial value based on client-side execution

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data.length > 0) {
        setImages(data[0].images.map(img => img.asset.url));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0 && typeof isMobile === 'boolean') {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".secondvideo",
          start: "center center",
          end: "200% center",
          scrub: true,
          markers: true
        }
      });

      tl.to(".secondvideo", {
        y: isMobile ? '95vh' : "120vh",
        x: isMobile ? '-4vh' : "120vh",
        rotation: 0,
        ease: "none",
        duration: 3
      }).to(".secondvideo", {
        width: isMobile ? '90vw' : '80vw',
        height: isMobile ? '60vh' : '80vh',
        xPercent: isMobile ? 10 : -20,
        yPercent: isMobile ? 0 : -50,
        ease: "none",
        duration: 3,
        transformOrigin: "center center"
      });

      return () => {
        tl.kill();
      };
    }
  }, [images, isMobile]);

  return (
    <>
      <div className='pt-500 relative z-10'>
        <div className='w-full min-h-screen grid place-items-center'>
          <div className='relative' style={{
            width: isMobile ? '90vw' : '52vw',
            height: isMobile ? '40vh' : '46vh'
          }}>
            {images.map((image, index) => (
              <div key={index} className={`${index === 1 ? 'secondvideo' : ''} absolute inset-0 grid place-items-center`} style={{
                transform: `rotate(${index * 3 - 3}deg)`
              }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <Image src={image} alt={`Visual ${index + 1}`} fill objectFit="cover" className="rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScrollingText />
    </>
  );
}

export default PicturesAnimate;
