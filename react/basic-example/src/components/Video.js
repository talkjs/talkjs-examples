import React from 'react';
import ReactPlayer from 'react-player'
import './Video.css';

// This component contains an video to be used as mock content to base the chat around
function Video(props) {
	return (
        <div className="video-container">
            <ReactPlayer 
            url={props.videoSrc} 
            config={{
                vimeo: {
                    playerOptions: {
                        autoplay: true,
                        loop: true,
                        muted: true
                    }
                }
            }}
            height='600px'
            width='1400px'
            />
        </div>
	);
};

export default Video;