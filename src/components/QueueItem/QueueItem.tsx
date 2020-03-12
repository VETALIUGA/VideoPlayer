import * as React from "react";
import './styles.scss';
const logo = './src/components/QueueItem/media/icons/video-default.svg';
const background = './src/components/QueueItem/media/filler.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function QueueItem(props) {
    return (
        <div onClick={() => { props.clickHandler(props.param) }} className={`button queue-item__button ${(props.param.index == props.current) ? 'active' : ''}`}>
            <div className="queue-item__content">
                <img src={logo} className="queue-item__thumbnail" />
                <h3 className="queue-item__source">{props.param.src.split('/').splice(-1).join('/')}</h3>
                <div className="queue-item__parameters">
                    <span className="queue-item__parameters-item">start on: {props.param.startPosition} sec.</span>
                    <span className="queue-item__parameters-item">sound level: {props.param.soundLevel}%</span>
                    <span className="queue-item__parameters-item">duration: {props.param.duration} sec.</span>
                </div>
                <button onClick={() => { props.deleteHandler(props.param) }} className="button queue-item__delete" title="Delete current scenario">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
            <div className="queue-item__line"
                style={{
                    width: (Math.round(100 / props.param.duration * props.param.startPosition)) + '%',
                    backgroundImage: `url(${background})`
                }}>
            </div>
        </div>
    )
}


export default QueueItem;