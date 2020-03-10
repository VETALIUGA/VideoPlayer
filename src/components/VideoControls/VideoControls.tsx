import * as React from "react";
import './styles.scss';
// import { Slider } from '@material-ui/core';

function VideoControls(props) {
    return (
        <div className="video-controller__wrap">
            {/* <Slider value={props.windowParams.soundLevel} onChange={(event, value)=>props.volumeHandler(value)} aria-labelledby="continuous-slider" /> */}
            <div className="video-controller__volume">
                <span className="video-controller__text">Volume:</span>
                <input type="range" min='0' max='100' value={props.windowParams.soundLevel} onChange={(event) => {props.volumeHandler(event.target.value)}} />
            </div>
            <div className="video-controller__controls">
                <button onClick={props.turnPrev} className="button video-controller__button">Prev</button>
                <button onClick={props.turnOn} className="button video-controller__button">Play</button>
                <button onClick={props.turnOff} className="button video-controller__button">Stop</button>
                <button onClick={props.turnPause} className="button video-controller__button">Pause</button>
                <button onClick={props.turnNext} className="button video-controller__button">Next</button>
            </div>
        </div>
    )
}
export default VideoControls;