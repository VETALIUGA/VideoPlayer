import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import './styles.scss';

// function VideoForm(props) {
//     return (
//         // <form onSubmit={props.formHandler} className="video-form__form">
//         //     {/* <label className="video-form__label">
//         //         <span className="video-form__text">source:</span>
//         //         <input type="url" className="video-form__input"/>
//         //     </label> */}
//         //     <label className="video-form__label">
//         //         <span className="video-form__text">source:</span>
//         //         <input onChange={props.uploadFile} type="file" className="video-form__input"/>
//         //     </label>
//         //     <label className="video-form__label">
//         //         <span className="video-form__text">start on:</span>
//         //         <input type="number" className="video-form__input"/>
//         //     </label>
//         //     <label className="video-form__label">
//         //         <span className="video-form__text">sound level:</span>
//         //         <input type="number" min="0" max="100" className="video-form__input"/>
//         //     </label>
//         //     <label className="video-form__label">
//         //         <span className="video-form__text">duration:</span>
//         //         <input type="number" className="video-form__input"/>
//         //     </label>
//         //     <label className="video-form__label">
//         //         <input type="submit" value="add" className="video-form__input video-form__input--submit"/>
//         //     </label>
//         // </form>
//     )
// }
let VideoForm = props => {
    const { handleSubmit } = props
    return <form onSubmit={handleSubmit}>
        {/* <label className="video-form__label">
        //         <span className="video-form__text">source:</span>
        //         <input type="url" className="video-form__input"/>
        //     </label> */}
        <label className="video-form__label">
            <span className="video-form__text">source:</span>
            <input onChange={props.uploadFile} type="file" className="video-form__input" />
        </label>
        <label className="video-form__label">
            <span className="video-form__text">start on:</span>
            <input type="number" className="video-form__input" />
        </label>
        <label className="video-form__label">
            <span className="video-form__text">sound level:</span>
            <input type="number" min="0" max="100" className="video-form__input" />
        </label>
        <label className="video-form__label">
            <span className="video-form__text">duration:</span>
            <input type="number" className="video-form__input" />
        </label>
        <label className="video-form__label">
            <input type="submit" value="add" className="video-form__input video-form__input--submit" />
        </label>
    </form>
}

VideoForm = reduxForm({
    // a unique name for the form
    form: 'contact'
})(VideoForm)

export default VideoForm;