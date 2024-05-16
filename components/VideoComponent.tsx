"use client"

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface Video {
    id: number;
    video: string;
    author: string,
    title: string
    // Add other properties as needed
}

interface VideoComponentProps {
    video: Video;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ video }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current as HTMLVideoElement;

        const handleVisibilityChange = () => {
            if (videoElement && isElementInViewport(videoElement)) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        };

        const handleMouseEnter = () => {
            if (videoElement) {
                videoElement.play();
            }
        };

        const handleMouseLeave = () => {
            if (videoElement) {
                videoElement.pause();
            }
        };

        // Call the handleVisibilityChange function immediately
        handleVisibilityChange();

        // Add event listeners
        window.addEventListener('scroll', handleVisibilityChange);
        window.addEventListener('scrollend', handleVisibilityChange);
        videoElement.addEventListener('mouseenter', handleMouseEnter);

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleVisibilityChange);
            window.removeEventListener('scrollend', handleVisibilityChange);
            videoElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [video]);

    const isElementInViewport = (el: HTMLElement | null): boolean => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    return (
        <Link href={`/video#${video.id}`} key={video.id} className="single-video-container">
            <video ref={videoRef} className="custom-video" src={video.video} muted loop playsInline ></video>
            <div>
                <h5 >
                    {video?.author}
                </h5>
                <p>
                    {video?.title}
                </p>
            </div>
        </Link >
    );
};

export default VideoComponent;
