'use client';

import { useEffect, useState, useRef } from 'react';
import SingleScreenVideo from '@/components/SingleScreenVideo';
import { data } from '@/libs/data';

const page: React.FC = () => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveVideoId(entry.target.id);
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
    }, []);

    return (
        <div className='w-full flex flex-col h-[100vh] random-video'>
            {
                data.map((video) => (
                    <SingleScreenVideo key={video.id} video={video} play={activeVideoId === `video-${video.id}`} />
                ))
            }
        </div>
    );
};

export default page;
