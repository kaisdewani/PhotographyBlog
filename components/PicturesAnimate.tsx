import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollingText from "./ScrollingText";
import { client } from "@/app/lib/sanity";
import { IHomepagePictures } from "@/app/lib/interface";

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
        if (images.length > 0) {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".secondvideo",
                    start: "center center",
                    end: "500% center",
                    scrub: true,
                    markers: true
                }
            });

            tl.to(".secondvideo", {
                y: "100vh",
                rotation: 0,
                ease: "none",
                duration: 3
            }).to(".secondvideo", {
                width: `80vw`,
                height: `80vh`,
                xPercent: -20,
                yPercent: -50,
                ease: "none",
                duration: 3,
                transformOrigin: "center center"
            });

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }
    }, [images]);

    return (
        <>
            <div className='pt-500 relative z-10'>
                <div className='w-full min-h-screen grid place-items-center'>
                    <div style={{ width: '52vw', height: '26vh' }} className='relative'>
                        {images.length >= 1 &&
                            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(-3deg)' }}>
                                <img src={images[0]} alt="First Visual" className="w-full h-full object-cover rounded-lg" />
                            </div>}
                        {images.length >= 2 &&
                            <div className='secondvideo absolute inset-0 grid place-items-center' style={{ transform: 'rotate(3deg)' }}>
                                <img src={images[1]} alt="Second Visual" className="w-full h-full object-cover rounded-lg" />
                            </div>}
                        {images.length >= 3 &&
                            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(20deg)' }}>
                                <img src={images[2]} alt="Third Visual" className="w-full h-full object-cover rounded-lg" />
                            </div>}
                    </div>
                </div>
            </div>
            <ScrollingText />
        </>
    );
}

export default PicturesAnimate;
