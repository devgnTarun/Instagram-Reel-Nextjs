"use client"
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface Video {
    id: number;
    video: string;
    // Add other properties as needed
}

interface VideoComponentProps {
    video: Video;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ video }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current as any;

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

        document.addEventListener('scroll', handleVisibilityChange);
        videoElement.addEventListener('mouseenter', handleMouseEnter);
        videoElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('scroll', handleVisibilityChange);
            videoElement.removeEventListener('mouseenter', handleMouseEnter);
            videoElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const isElementInViewport = (el: HTMLElement | null): boolean => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 20 &&
            rect.left >= 30 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    return (
        <Link href={`/video/${video.id}`} key={video.id} className="single-video-container">
            <video ref={videoRef} className="custom-video" src={video.video} muted loop playsInline ></video>
        </Link >
    );
};

export default VideoComponent;
