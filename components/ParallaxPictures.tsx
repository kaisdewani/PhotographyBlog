import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// URLs to images from Pexels or any similar image hosting service
const Picture1 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/c48f556e-9330-434a-985c-9b732fd26aeb/Untitled+2.jpg';
const Picture2 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/b0f50d56-51ae-4ddb-9aba-60ab7f1105f1/Untitled+5.jpg';
const Picture3 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/bfc5a231-4ac7-4ac8-bd63-d3fc622e0875/Untitled+6.jpg';
const Picture4 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/a00baf7b-fec4-4b19-8e31-9117bee422fb/Untitled+7.jpg';
const Picture5 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/4af795a4-30f5-40fc-85ee-3d31f3d5ab02/Untitled+8.jpg';
const Picture6 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/7c43300f-69aa-4c4d-a0d4-697e67741e74/Untitled+9.jpg"';
const Picture7 = 'https://images.squarespace-cdn.com/content/v1/627c22495272990f0921a1ea/3448e8bd-aa43-4f27-8b4e-3dca5b209f39/Untitled+19.jpg';

const ParallaxPictures: React.FC = () => {
    const container = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {

        imgRefs.current.forEach((img, index) => {
            const scales = [4, 5, 6, 5, 6, 8, 9]; // Scale factors for each image
            if (img) {
                gsap.fromTo(img, 
                    { scale: 1 }, 
                    {
                        scale: scales[index],
                        scrollTrigger: {
                            trigger: img,
                            start: "bottom bottom", // Animation starts when the top of img hits the bottom of the viewport
                            end: "200% center",
                            scrub: true, // Smooth scrubbing
                            markers: true, // Optional: Shows start and end markers in development
                        }
                    });
            }
        });

        return () => {

        };
    }, []);

    return (
        <div ref={container} className="relative h-screen-300">
            <div className="sticky top-0 h-screen overflow-hidden">
                {[Picture1, Picture2, Picture3, Picture4, Picture5, Picture6, Picture7].map((src, index) => (
                    <div key={index} ref={el => {
                        imgRefs.current[index] = el; // Corrected the ref assignment
                    }} className="absolute top-0 w-full h-full flex items-center justify-center">
                        <div className={`relative w-1/4 h-1/4 ${calculatePosition(index)}`}>
                            <Image
                                src={src}
                                layout="fill"
                                alt={`image ${index + 1}`}
                                placeholder="blur"
                                blurDataURL={src}
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

