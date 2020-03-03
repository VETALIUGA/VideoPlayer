import * as React from "react";
// import './styles.scss';

function VideoControls(props) {
    return (
        <div className="video-player__controls">
            <button onClick={props.turnPrev} className="button video-player__button">Prev</button>
            <button onClick={props.turnOn} className="button video-player__button">Play</button>
            <button onClick={props.turnOff} className="button video-player__button">Stop</button>
            <button onClick={props.turnPause} className="button video-player__button">Pause</button>
            <button onClick={props.turnNext} className="button video-player__button">Next</button>
        </div>
    )
}
export default VideoControls;