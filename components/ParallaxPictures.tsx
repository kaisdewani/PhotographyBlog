import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { client } from '@/app/lib/sanity';

const ParallaxPictures: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const container = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<(HTMLDivElement | null)[]>(new Array(7).fill(null));

    useEffect(() => {
        const fetchImages = async () => {
            const query = `*[_type == "parallaxPictures"]{
                title,
                images[]{
                    "url": asset->url
                }
            }`;
            const data = await client.fetch(query);
            if (data && data.length > 0 && data[0].images) {
                setImages(data[0].images);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        imgRefs.current.forEach((img, index) => {
            const scales = [4, 5, 6, 5, 6, 8, 9]; // Scale factors for each image
            if (img && index < images.length) {
                gsap.fromTo(img,
                    { scale: 1, duration: 0.2 },
                    {
                        scale: scales[index],
                        scrollTrigger: {
                            trigger: img,
                            start: "bottom bottom",
                            end: "bottom center",
                            scrub: true,
                            markers: true
                        }
                    });
            }
        });
    }, [images]); // Re-run GSAP effect when images are loaded

    return (
        <div ref={container} className="relative h-screen-300">
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map((img, index) => (
                    <div key={index} ref={el => {
                        imgRefs.current[index] = el;
                    }}
                        className="absolute top-0 w-full h-full flex items-center justify-center">
                        <div className={`relative w-1/4 h-1/4 ${calculatePosition(index)} rounded-lg overflow-hidden`}>
                            <Image
                                src={img.url}
                                layout="fill"
                                alt={`image ${index + 1}`}
                                placeholder="blur"
                                blurDataURL={img.url}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to apply different Tailwind classes based on the index
function calculatePosition(index: number): string {
    const positions = [
        '', // For index 0, no additional positioning
        'top-[-30vh] left-1/20 w-35vh h-30vh',
        'top-[-10vh] left-[-25vw] w-1/5 h-45vh',
        'left-[27.5vw] w-1/4 h-1/4',
        'top-[27.5vh] left-1/20 w-1/5 h-1/4',
        'top-[27.5vh] left-[-22.5vw] w-30vh h-1/4',
        'top-[22.5vh] left-[25vw] w-15vh h-15vh',
    ];
    return positions[index] || '';
}

export default ParallaxPictures;
