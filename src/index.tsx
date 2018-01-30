import * as React from 'react';
import * as ReactDOM from 'react-dom'
// import {
//     MuiThemeProvider,
//     createMuiTheme,
// } from 'material-ui/styles';
import { AudioPlayer } from './components/audio-player/audio-player.component';

// const theme = createMuiTheme({
//     palette: {
//         primary: purple,
//         secondary: green,
//     },
// });

class App extends React.Component<{}, {}>{
    render() {
        return (
            // <MuiThemeProvider>
            <AudioPlayer
                IsPause={false}
                Volume={30}
            />
            // </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);