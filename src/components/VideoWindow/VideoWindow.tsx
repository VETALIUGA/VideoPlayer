import * as React from "react";
import './styles.scss';

function VideoWindow (props) {
    return (
        <video src={props.src} autoPlay={true} muted={true} className="video-window__window"></video>
    )    
}

export default VideoWindow;

// import * as React from "react";
// import './styles.scss';

// const VideoWindow = React.forwardRef((props: MyProps, ref) => (
//     <video ref={ref} src={props.src} autoPlay={true} muted={true} className="video-window__window"></video>
// ));

// export default VideoWindow;

// import * as React from "react";
// import './styles.scss';

// interface MyProps {
//     src?: string;
// }

// interface MyState {
//     source: string;
// }

// class VideoWindow extends React.Component<MyProps, MyState> {
//     constructor(props: object) {
//         super(props);
//         this.state = {
//             source: this.props.src,
//         }
//     };
//     render() {
//         return (
//             <video src={this.props.src} autoPlay={true} muted={true} className="video-window__window"></video>
//         )
//     }
// }

// export default VideoWindow;