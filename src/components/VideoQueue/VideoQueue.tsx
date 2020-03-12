import * as React from "react";
import './styles.scss';
import QueueItem from "../QueueItem/QueueItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt} from '@fortawesome/free-solid-svg-icons';

function VideoQueue(props) {
    return (
        props.isLoading ?
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
            :
            <div className="video-queue__icon-wrap">
                <FontAwesomeIcon className="video-queue__icon" icon={faCloudDownloadAlt}/>
            </div>
    )
}

export default VideoQueue;