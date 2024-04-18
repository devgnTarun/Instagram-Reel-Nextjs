"use client"

import { useEffect, useRef, useState } from 'react';
import { data } from '@/libs/data';
import Image from 'next/image';
import Link from 'next/link';

const page = ({ params }: { params: { id: number } }) => {

    const [video, setVideo] = useState<VIDEO_TYPE>();
    const [muted, setMuted] = useState<boolean>(false);
    const id = params.id;

    const videoRef = useRef(null);
    const toggleMute = () => {
        const videoElement = videoRef.current as any;

        if (videoElement.muted) {
            videoElement.muted = false;
            setMuted(false);
        } else {
            videoElement.muted = true;
            setMuted(true);
        }
    };

    const togglePlay = () => {
        const videoElement = videoRef.current as any;

        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    };

    useEffect(() => {
        if (id) {
            const foundVideo = data.find(v => v.id === Number(id)) as VIDEO_TYPE;
            setVideo(foundVideo);
        }
    }, [id]);

    if (!video) {
        return <div>Loading...</div>;
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
                    onClick={togglePlay}
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

export default page;
