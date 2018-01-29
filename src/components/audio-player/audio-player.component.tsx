import * as React from 'react';
import {
    RaisedButton,
} from 'material-ui';
import {
    BaseComponent,
    IPropsBase,
    IStateBase,
} from '../base-component';
import { Audio } from './models';
import './audio-player.component.scss';

export interface AudioPlayerProps extends IPropsBase {
    IsAutoPlay?: boolean;
    IsPause?: boolean;
    IsMute?: boolean;
    Volume?: number;
    Playlist?: Audio[];
    Play?: Function;
    Pause?: Function;
}

export interface AudioPlayerState extends IStateBase {
    IsPause: boolean;
    Volume: number;
}

export class AudioPlayer extends BaseComponent<AudioPlayerProps, AudioPlayerState>{
    public static defaultProps: Partial<AudioPlayerProps> = {
        IsAutoPlay: true,
        IsPause: true,
        IsMute: true,
        Volume: 100,
        Play: () => { },
        Pause: () => { },
    }

    public static defaultState: Partial<AudioPlayerState> = {
        IsPause: AudioPlayer.defaultProps.IsAutoPlay,
        Volume: AudioPlayer.defaultProps.Volume,
    };

    constructor(props: AudioPlayerProps) {
        super(props);
    }

    render() {
        return (
            <div className='audio-palyer-wrapper'
                style={{
                    width: this.props.Width,
                    height: this.props.Height,
                    justifyContent: super.CalculateHorizontalAlignment(),
                    alignItems: super.CalculateVerticalAlignment(),
                    display: 'flex' && '-webkit-flex'
                }}>

            </div>
        );
    }
}
