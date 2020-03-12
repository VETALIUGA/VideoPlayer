import * as React from "react";
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPlay, faStop, faPause, faVolumeOff, faVolumeUp} from '@fortawesome/free-solid-svg-icons';

function VideoControls(props) {
    return (
        <div className="video-controller__wrap">
            {/* <Slider value={props.windowParams.soundLevel} onChange={(event, value)=>props.volumeHandler(value)} aria-labelledby="continuous-slider" /> */}
            <div className="video-controller__volume">
            <FontAwesomeIcon className="video-controller__icon" icon={props.windowParams.soundLevel >0 ? faVolumeUp : faVolumeOff} />    
                <input type="range" min='0' max='100' value={props.windowParams.soundLevel} onChange={(event) => {props.volumeHandler(event.target.value)}} />
            </div>
            <div className="video-controller__controls">
                <button onClick={props.turnPrev} className={`button video-controller__button ${props.windowParams.index == 0 ? 'disable' : ''}`} title="Previous scenario"><FontAwesomeIcon icon={faStepBackward} /></button>
                <button onClick={props.turnOn} className="button video-controller__button" title="Play"><FontAwesomeIcon icon={faPlay} /></button>
                <button onClick={props.turnOff} className="button video-controller__button" title="Stop"><FontAwesomeIcon icon={faStop} /></button>
                <button onClick={props.turnPause} className="button video-controller__button" title="Pause"><FontAwesomeIcon icon={faPause} /></button>
                <button onClick={props.turnNext} className={`button video-controller__button ${props.windowParams.index == props.queueLength-1 ? 'disable' : ''}`} title="Next scenario"><FontAwesomeIcon icon={faStepForward} /></button>
            </div>
        </div>
    )
}
export default VideoControls;