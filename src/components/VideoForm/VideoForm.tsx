import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import './styles.scss';

let VideoForm = (props) => {
    const { handleSubmit } = props;
    return <form className="video-form__grid" onSubmit={handleSubmit}>
        <div className="video-form__item">
            <label htmlFor="url" className="video-form__label">Url:</label>
            <Field component='input' type='url' name="url" className="video-form__input" />
        </div>
        <div className="video-form__item">
            <label htmlFor="startOn" className="video-form__label">Start on:</label>
            <Field component='input' type='number' name="startOn" className="video-form__input" />
        </div>
        <div className="video-form__item">
            <label htmlFor="soundLevel" className="video-form__label">Sound level:</label>
            <Field component='input' type="number" min="0" max="100" name="soundLevel" className="video-form__input" />
        </div>
        <div className="video-form__item">
            <label htmlFor="duration" className="video-form__label">Duration:</label>
            <Field component='input' type="number" name="duration" className="video-form__input" />
        </div>
        <button type="submit" className="button video-form__submit">Add scenario</button>
    </form>
}

VideoForm = reduxForm({
    // a unique name for the form
    form: 'add new scenario'
})(VideoForm);

export default VideoForm;