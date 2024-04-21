"use client"

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { data } from '@/libs/data';
import Image from 'next/image';
import Link from 'next/link';

const Page = ({ params }: { params: { id: number } }) => {
    const [video, setVideo] = useState<VIDEO_TYPE | null>(null);
    const [muted, setMuted] = useState<boolean>(false);
    const router = useRouter();
    const { id } = params;

    const videoRef = useRef<HTMLVideoElement>(null);
    const lastScrollY = useRef<number>(0);

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            setMuted(videoElement.muted);
        }
    };

    useEffect(() => {
        if (id) {
            const foundVideo = data.find(v => v.id === Number(id)) || null;
            setVideo(foundVideo);
        }
    }, [id]);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY.current;
        lastScrollY.current = currentScrollY;

        if (scrollingUp) {
            const prevVideo = data.find(v => v.id === (video?.id || 0) - 1);
            if (prevVideo) {
                setVideo(prevVideo);
                router.push(`/video/${prevVideo.id}`);
            }
        } else {
            const nextVideo = data.find(v => v.id === (video?.id || 0) + 1);
            if (nextVideo) {
                setVideo(nextVideo);
                router.push(`/video/${nextVideo.id}`);
            }
        }
    };

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const scrollingUp = event.deltaY < 0;
        if (scrollingUp) {
            const prevVideo = data.find(v => v.id === (video?.id || 0) - 1);
            if (prevVideo) {
                setVideo(prevVideo);
                router.push(`/video/${prevVideo.id}`);
            }
        } else {
            const nextVideo = data.find(v => v.id === (video?.id || 0) + 1);
            if (nextVideo) {
                setVideo(nextVideo);
                router.push(`/video/${nextVideo.id}`);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [video, router]);

    if (!id) {
        return <div>Loading...</div>;
    }

    if (!video) {
        return <div>No videos found.</div>;
    }

    return (
        <div className="single-video-page">
            <div className="single-video-box cursor-pointer ">
                <video
                    ref={videoRef}
                    className="custom-video"
                    src={video.video}
                    loop
                    playsInline
                    autoPlay
                    onClick={() => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause()}
                ></video>
                <div className="video-content">
                    <div className="flex items-center  my-3">
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden">
                            <Image src={'https://res.cloudinary.com/de90fgql2/image/upload/v1676908562/homie_shop/gvwx2kvmfjouomthvb7v.png'} width={500} height={500} alt='image' className='w-full object-cover' />
                        </div>
                        <h2>{video.author}</h2>
                    </div>
                    <h5>{video.title}</h5>
                    <p>{video.created_at}</p>
                    <button className='video-product'>
                        <Link href={'/product-link'} >Get This Product in just $300  </Link>
                    </button>
                    {/* Put your product link  */}
                </div>
                <div className="video-icons">
                    <p><span><ion-icon name="heart-outline" ></ion-icon></span> {video.likes}</p>
                    <p><span><ion-icon name="chatbubble-outline"></ion-icon> </span>{video.comments}</p>
                    <p><span><ion-icon name="send-outline"></ion-icon></span> {video.shares}</p>
                </div>
                <div className="video-control-icons">
                    <p><Link href={'/'}><ion-icon name="close-circle-outline"></ion-icon></Link> </p>
                    <p onClick={toggleMute}><ion-icon name={muted ? "volume-mute-outline" : "volume-medium-outline"}></ion-icon> </p>
                </div>
            </div>
        </div>
    );
};

export default Page;

