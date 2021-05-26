import React from 'react';
import ReactPlayer from 'react-player'

// This component contains an video to be used as mock content to base the chat around
function Video(props) {
	return (
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
          height='700px'
          width='1400px'
        />
	);
};

export default Video;