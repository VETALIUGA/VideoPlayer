import * as React from "react";
import './styles.scss';

function VideoForm(props) {
    return (
        <form onSubmit={props.formHandler} className="video-form__form">
            <label className="video-form__label">
                <span className="video-form__text">source:</span>
                <input type="text" className="video-form__input"/>
            </label>
            <label className="video-form__label">
                <span className="video-form__text">start on:</span>
                <input type="text" className="video-form__input"/>
            </label>
            <label className="video-form__label">
                <span className="video-form__text">sound level:</span>
                <input type="text" className="video-form__input"/>
            </label>
            <label className="video-form__label">
                <span className="video-form__text">duration:</span>
                <input type="text" className="video-form__input"/>
            </label>
            <label className="video-form__label">
                <input type="submit" value="add" className="video-form__input video-form__input--submit"/>
            </label>
        </form>
    )
}
export default VideoForm;