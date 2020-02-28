import './styles.scss';
import VideoPlayer from './VideoPlayer';

const src = './src/videos/fire.mov';

let Player = new VideoPlayer(src, true, true, 1, 1);
Player.doScenarios();

