import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import './styles.scss';

// const onSubmit = values => {
//     alert(JSON.stringify(values));
// }

const VideoForm = (props) => {
    const {handleSubmit} = props;
    return <form className="video-form__grid" onSubmit={handleSubmit}>
        <div className="video-form__item">
            <label htmlFor="url" className="video-form__label">Url:</label>
            <Field component='input' type='text' name="url" className="video-form__input" />
        </div>
        <div className="video-form__item">
            <label htmlFor="startOn" className="video-form__label">Start on:</label>
            <Field component='input' type='number' name="startOn" className="video-form__input" />
        </div>
        <div className="video-form__item">
            <label htmlFor="soundLevel" className="video-form__label">Sound level:</label>
            <Field component='input' type="number" min="0" max="100" name="soundLevel" className="video-form__input" />
        </div>
        {/* <div className="video-form__item">
            <label htmlFor="duration" className="video-form__label">Duration:</label>
            <Field component='input' type="number" name="duration" className="video-form__input" />
        </div> */}
        <button type="submit" className="button video-form__submit">Add scenario</button>
    </form>
}

export default reduxForm({
    form: 'add new scenario'
})(VideoForm);
