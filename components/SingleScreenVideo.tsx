'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IonIcon } from '@ionic/react';

const SingleScreenVideo = ({ video, play }: { video: any, play: boolean }) => {
    const [muted, setMuted] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            setMuted(videoElement.muted);
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (play) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        }
    }, [play]);

    if (!video) {
        return <div>No videos found.</div>;
    }

    return (
        <div className="single-video-page flex-none" id={`${video.id}`}>
            <div className="single-video-box cursor-pointer">
                <video
                    ref={videoRef}
                    className="custom-video"
                    src={video.video}
                    loop
                    playsInline
                    onClick={() => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause()}
                ></video>
                <div className="video-content">
                    <div className="flex items-center my-3">
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden">
                            <Image src={'https://res.cloudinary.com/de90fgql2/image/upload/v1676908562/homie_shop/gvwx2kvmfjouomthvb7v.png'} width={500} height={500} alt='image' className='w-full object-cover' />
                        </div>
                        <h2>{video.author}</h2>
                    </div>
                    <h5>{video.title}</h5>
                    <p>{video.created_at}</p>
                    <button className='video-product'>
                        <Link href={'/product-link'}>Get This Product in just $300</Link>
                    </button>
                </div>
                <div className="video-icons">
                    <p><span><IonIcon name="heart-outline"></IonIcon></span> {video.likes}</p>
                    <p><span><IonIcon name="chatbubble-outline"></IonIcon> </span>{video.comments}</p>
                    <p><span><IonIcon name="send-outline"></IonIcon></span> {video.shares}</p>
                </div>
                <div className="video-control-icons">
                    <p><Link href={'/'}><IonIcon name="close-circle-outline"></IonIcon></Link></p>
                    <p onClick={toggleMute}><IonIcon name={muted ? "volume-mute-outline" : "volume-medium-outline"}></IonIcon></p>
                </div>
            </div>
        </div>
    );
};

export default SingleScreenVideo;
