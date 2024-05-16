'use client';

import { useEffect, useState, useRef } from 'react';
import SingleScreenVideo from '@/components/SingleScreenVideo';
import { data } from '@/libs/data';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const router = useRouter();

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newActiveVideoId = entry.target.id;
                    setActiveVideoId(newActiveVideoId);

                    // Update the URL with the new active video ID
                    if (newActiveVideoId) {
                        router.push(`/video#${newActiveVideoId}`);
                    }
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

        const elements = document.querySelectorAll('.single-video-page');
        elements.forEach(el => observer.current?.observe(el));

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [router]);

    return (
        <div className='w-full flex flex-col h-[100vh] random-video'>
            {
                data.map((video) => (
                    <SingleScreenVideo key={video.id} video={video} play={activeVideoId === `${video.id}`} />
                ))
            }
        </div>
    );
};

export default Page;
