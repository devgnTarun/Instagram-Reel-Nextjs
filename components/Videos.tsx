import { data } from '@/libs/data'
import React from 'react'
import VideoComponent from './VideoComponent'

const Videos = () => {
    return (
        <div className='videos-container'>
            <h1>Watch <span>Best</span> Videos</h1>

            <div className="videos-scroll-container">
                {data.map(video => (
                    <VideoComponent video={video} />
                ))}
            </div>
        </div>
    )
}

export default Videos