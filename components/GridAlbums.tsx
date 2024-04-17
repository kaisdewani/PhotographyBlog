import { useEffect, useState } from 'react';
import { client } from '@/app/lib/sanity';
import { AlbumData } from '@/app/lib/interface';

const GridAlbums = () => {
    const [albums, setAlbums] = useState<AlbumData[]>([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            const query = `*[_type == "eventAlbum"]{
                eventName,
                "imageUrl": images[0].asset->url,
                "slug": slug.current
            }`;
            const data = await client.fetch(query);
            console.log("Fetched albums:", data); // Debugging output
            setAlbums(data);
        };
        fetchAlbums();
    }, []);

    return (
        <div className="flex justify-around items-center h-screen">
            {/* Panel 1 */}
            <div style={{ backgroundImage: albums[0] ? `url(${albums[0]?.imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} className="h-full w-1/3">
            </div>
            {/* Panel 2 */}
            <div style={{ backgroundImage: albums[1] ? `url(${albums[1]?.imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} className="h-full w-1/3">
            </div>
            {/* Panel 3 */}
            <div style={{ backgroundImage: albums[2] ? `url(${albums[2]?.imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} className="h-full w-1/3">
            </div>
        </div>
    );
};

export default GridAlbums;
