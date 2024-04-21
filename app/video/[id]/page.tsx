"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { data } from '@/libs/data';
import Image from 'next/image';
import Link from 'next/link';
import 'ionicons';
import { IonIcon } from '@ionic/react';

const Page = ({ params }: { params: { id: number } }) => {
    const [video, setVideo] = useState<VIDEO_TYPE | null>(null);
    const [muted, setMuted] = useState<boolean>(false);
    const router = useRouter();
    const { id } = params;

    const videoRef = useRef<HTMLVideoElement>(null);
    const lastScrollY = useRef<number>(0);
    const scrolling = useRef<boolean>(false);

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
        if (!scrolling.current) {
            scrolling.current = true;
            setTimeout(() => {
                const currentScrollY = window.scrollY;
                const scrollingUp = currentScrollY < lastScrollY.current;
                lastScrollY.current = currentScrollY;

                if (scrollingUp) {
                    const prevVideo = data.find(v => v.id === (video?.id || 0) - 1);
                    if (prevVideo) {
                        router.push(`/video/${prevVideo.id}`);
                    }
                } else {
                    const nextVideo = data.find(v => v.id === (video?.id || 0) + 1);
                    if (nextVideo) {
                        router.push(`/video/${nextVideo.id}`);
                    }
                }
                setTimeout(() => {
                    scrolling.current = false;
                }, 500); // Adjust the debounce delay (in milliseconds)
            }, 1000); // Adjust the debounce delay (in milliseconds)
        }
    };

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        if (!scrolling.current) {
            scrolling.current = true;
            setTimeout(() => {
                const scrollingUp = event.deltaY < 0;
                if (scrollingUp) {
                    const prevVideo = data.find(v => v.id === (video?.id || 0) - 1);
                    if (prevVideo) {
                        router.push(`/video/${prevVideo.id}`);
                    }
                } else {
                    const nextVideo = data.find(v => v.id === (video?.id || 0) + 1);
                    if (nextVideo) {
                        router.push(`/video/${nextVideo.id}`);
                    }
                }
                setTimeout(() => {
                    scrolling.current = false;
                }, 1000); // Adjust the debounce delay (in milliseconds)
            }, 2000); // Adjust the debounce delay (in milliseconds)
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

    useEffect(() => {
        const currentVideo = data.find(v => v.id === Number(id)) || null;
        if (currentVideo && video && currentVideo.id !== video.id) {
            setVideo(currentVideo);
            scrolling.current = false;
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1500); // Adjust the delay before scrolling (in milliseconds)
        }
    }, [id]);

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
                    <p><span><IonIcon name="heart-outline" ></IonIcon></span> {video.likes}</p>
                    <p><span><IonIcon name="chatbubble-outline"></IonIcon> </span>{video.comments}</p>
                    <p><span><IonIcon name="send-outline"></IonIcon></span> {video.shares}</p>
                </div>
                <div className="video-control-icons">
                    <p><Link href={'/'}><IonIcon name="close-circle-outline"></IonIcon></Link> </p>
                    <p onClick={toggleMute}><IonIcon name={muted ? "volume-mute-outline" : "volume-medium-outline"}></IonIcon> </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
