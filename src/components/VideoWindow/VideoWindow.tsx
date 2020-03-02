import * as React from "react";
import './styles.scss';

function VideoWindow (props) {
    return (
        <video src={props.src} className="video-window__window"></video>
    )    
}

export default VideoWindow;