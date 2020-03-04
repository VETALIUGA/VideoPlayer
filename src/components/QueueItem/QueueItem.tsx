import * as React from "react";
import './styles.scss';
const logo = './src/components/QueueItem/media/icons/video-default.svg';
const deleteIcon = './src/components/QueueItem/media/icons/bin.svg'

function QueueItem(props) {
    return (
        <div onClick={()=> {props.clickHandler(props.param)}} className={`button queue-item__button ${(props.param.index == props.current)? 'active' : ''}`}>
            <div className="queue-item__content">
                <img src={logo} className="queue-item__thumbnail" />
                <h3 className="queue-item__source">{props.param.src.split('/').splice(-1).join('/')}</h3>
                <div className="queue-item__parameters">
                    <span className="queue-item__parameters-item">start on: {props.param.startPosition}</span>
                    <span className="queue-item__parameters-item">sound level: {props.param.soundLevel}</span>
                    <span className="queue-item__parameters-item">duration: {props.param.duration}</span>
                </div>
                <button onClick={()=>{props.deleteHandler(props.param)}} className="button queue-item__delete">
                    <img src={deleteIcon} alt="" className="queue-item__delete-icon"/>
                </button>
            </div>
        </div>
    )
}


export default QueueItem;