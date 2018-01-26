import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { AudioPlayer } from './components/audio-player/audio-player.component';

class App extends React.Component<{}, {}>{
    render() {
        return (
            <AudioPlayer />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);