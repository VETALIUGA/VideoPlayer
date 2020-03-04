import * as React from "react";
import './styles.scss';
import QueueItem from "../QueueItem/QueueItem";

function VideoQueue(props) {
    return (
        <ul className="video-queue__list">
            {
                props.scenarios.map((item, index) => {
                    return (
                        <li className="video-queue__list-item" key={index}>
                            <QueueItem 
                            clickHandler={props.clickHandler} 
                            deleteHandler={props.deleteHandler}
                            param={item}
                            current={props.current} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default VideoQueue;