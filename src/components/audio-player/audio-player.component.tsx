import * as React from 'react';
import {
    BaseComponent,
    IPropsBase,
    IStateBase,
} from '../base-component';
import {
    HorizontalAlignment,
    VerticalAlignment,
} from '../../common/enums/alignment';
import { DeviceFamily } from '../../common/enums/device-family';
import { MuiThemeProvider } from 'material-ui/styles';
import {
    IconButton,
    Slider,
    Popover,
    IconButtonProps,
    Menu,
    MenuItem,
} from 'material-ui';
import { Audio } from './models';
import './audio-player.component.scss';
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AVPause from 'material-ui/svg-icons/av/pause';
import AVSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import AVSkipNext from 'material-ui/svg-icons/av/skip-next';
import AVRepeat from 'material-ui/svg-icons/av/repeat';
import AVRepeatOne from 'material-ui/svg-icons/av/repeat-one';
import AVShuffle from 'material-ui/svg-icons/av/shuffle';
import AVVolumeDown from 'material-ui/svg-icons/av/volume-down';
import AVVolumeMute from 'material-ui/svg-icons/av/volume-mute';
import AVVolumeUp from 'material-ui/svg-icons/av/volume-up';
import AVQueueMusic from 'material-ui/svg-icons/av/queue-music';

/**
 * 播放模式
 * 
 * @export
 * @enum {number}
 */
export enum PlayMode {
    /**
     * 单曲循环
     */
    SingleLoop = 0,
    /**
     * 列表循环
     */
    ListLoop = 1,
    /**
     * 无序循环
     */
    UnorderLoop = 2,
}

/**
 * Props模型
 * 
 * @export
 * @interface AudioPlayerProps
 * @extends {IPropsBase}
 */
interface AudioPlayerProps extends IPropsBase {
    /**
     * 是否自动播放
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    IsAutoPlay?: boolean;
    /**
     * 是否暂停
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    IsPause?: boolean;
    /**
     * 是否静音
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    IsMute?: boolean;
    /**
     * 默认音量
     * 
     * @type {number}
     * @memberOf AudioPlayerProps
     */
    Volume?: number;
    /**
     * 默认播放模式
     * 
     * @type {PlayMode}
     * @memberOf AudioPlayerProps
     */
    PlayMode?: PlayMode;
    /**
     * 播放列表
     * 
     * @type {Audio[]}
     * @memberOf AudioPlayerProps
     */
    Playlist?: Audio[];
    /**
     * 播放回调函数
     * 
     * @type {Function}
     * @memberOf AudioPlayerProps
     */
    Play?: Function;
    /**
     * 暂停回调函数
     * 
     * @type {Function}
     * @memberOf AudioPlayerProps
     */
    Pause?: Function;
}

/**
 * State模型
 * 
 * @export
 * @interface AudioPlayerState
 * @extends {IStateBase}
 */
interface AudioPlayerState extends IStateBase {

    /**
     * 是否暂停
     * 
     * @type {boolean}
     * @memberOf AudioPlayerState
     */
    IsPause: boolean;
    /**
     * 音量
     * 
     * @type {number}
     * @memberOf AudioPlayerState
     */
    Volume: number;

    /**
     * 是否能够播放
     * 
     * @type {boolean}
     * @memberOf AudioPlayerState
     */
    IsCanPlay: boolean;

    /**
     * 播放模式
     * 
     * @type {PlayMode}
     * @memberOf AudioPlayerState
     */
    PlayMode: PlayMode;

    /**
     * 播放列表
     * 
     * @type {Audio[]}
     * @memberOf AudioPlayerState
     */
    PlayList: Audio[],
    /**
     * 正播放音频
     * 
     * @type {Audio}
     * @memberOf AudioPlayerState
     */
    PlayingAudio: Audio;
    /**
     * Popover是否打开
     * 
     * @type {boolean}
     * @memberOf AudioPlayerState
     */
    IsOpen: boolean;
}

/**
 * 音频播放器
 * 
 * @export
 * @class AudioPlayer
 * @extends {BaseComponent<AudioPlayerProps, AudioPlayerState>}
 */
export class AudioPlayer extends BaseComponent<AudioPlayerProps, AudioPlayerState>{
    /**
     * 默认的Props
     * 
     * @static
     * @type {Partial<AudioPlayerProps>}
     * @memberOf AudioPlayer
     */
    public static defaultProps: Partial<AudioPlayerProps> = {
        ContentHorizontalAlignment: HorizontalAlignment.Left,
        ContentVerticalAlignment: VerticalAlignment.Middle,
        Width: '100%',
        Height: '100%',
        IsAutoPlay: true,
        IsPause: true,
        IsMute: true,
        Volume: 100,
        PlayMode: PlayMode.ListLoop,
        Play: () => { },
        Pause: () => { },
    }

    constructor(props: AudioPlayerProps) {
        super(props);
        this.state = {
            /** 
             * 是否暂停
            */
            IsPause: this.props.IsPause === undefined ? true : this.props.IsPause,
            /** 
             * 音量
            */
            Volume: this.props.Volume || 100,
            /** 
             * 是否能够播放
            */
            IsCanPlay: false,
            /** 
             * 播放模式
            */
            PlayMode: this.props.PlayMode || PlayMode.ListLoop,
            /** 
             * 播放列表
            */
            PlayList: this.props.Playlist || [],
            /** 
             * 正播放音频
            */
            PlayingAudio: new Audio(),
            /** 
             * Popover是否打开
            */
            IsOpen: false,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps: AudioPlayerProps) {

    }

    /**
     * 上一首按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private SkipPerviousButton_Click(): void {

    }

    /**
     * 下一首按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private SkipNextButton_Click(): void {

    }

    /**
     * 播放按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private PlayButton_Click(): void {
        this.setState({
            IsPause: false,
        })
    }

    /**
     * 暂停按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private PauseButton_Click(): void {
        this.setState({
            IsPause: true,
        });
    }


    /**
     * 生成播放模式按钮
     * 
     * @returns 
     * 
     * @memberOf AudioPlayer
     */
    GeneratePlayModeButton(): React.ReactElement<IconButtonProps> {
        switch (this.state.PlayMode) {
            case PlayMode.SingleLoop:
                return (
                    <IconButton
                        tooltip="单曲循环"
                        touch={true}
                        tooltipPosition="bottom-center"
                        onClick={() => {
                            this.setState({
                                PlayMode: PlayMode.UnorderLoop,
                            });
                        }}
                    >
                        <AVRepeatOne />
                    </IconButton>
                );
            case PlayMode.ListLoop:
                return (
                    <IconButton
                        tooltip="列表循环"
                        touch={true}
                        tooltipPosition="bottom-center"
                        onClick={() => {
                            this.setState({
                                PlayMode: PlayMode.SingleLoop,
                            });
                        }}
                    >
                        <AVRepeat />
                    </IconButton>
                );
            case PlayMode.UnorderLoop:
                return (
                    <IconButton
                        tooltip="无序播放"
                        touch={true}
                        tooltipPosition="bottom-center"
                        onClick={() => {
                            this.setState({
                                PlayMode: PlayMode.ListLoop,
                            });
                        }}
                    >
                        <AVShuffle />
                    </IconButton>
                );
        }
    }

    /**
     * 生成音量按钮
     * 
     * @returns {React.ReactElement<IconButtonProps>} 
     * 
     * @memberOf AudioPlayer
     */
    GenerateVolumeButton(): React.ReactElement<IconButtonProps> {
        if (this.state.Volume <= 0) {
            return (
                <IconButton
                    touch={true}
                    onTouchMove={(event) => {
                        this.setState({
                            IsOpen: true,
                        });
                    }}
                    onClick={(event) => {
                        this.setState({
                            Volume: this.props.Volume || 100,
                        });
                    }}
                >
                    <AVVolumeMute />
                </IconButton>
            );
        } else if (this.state.Volume <= 50) {
            return (
                <IconButton
                    touch={true}
                    onMouseOver={() => {
                        this.setState({
                            IsOpen: true,
                        });
                    }}
                    onClick={(event) => {
                        this.setState({
                            Volume: 0,
                        });
                    }}
                >
                    <AVVolumeDown />
                </IconButton>);
        } else {
            return (
                <IconButton
                    touch={true}
                    onTouchMove={(event) => {
                        this.setState({
                            IsOpen: true,
                        });
                    }}
                    onClick={(event) => {
                        this.setState({
                            Volume: 0,
                        });
                    }}
                >
                    <AVVolumeUp />
                </IconButton>);
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div ref='wrapper'
                    className='audio-palyer-wrapper'
                    style={{
                        width: this.props.Width,
                        height: this.props.Height,
                        justifyContent: super.CalculateHorizontalAlignment(),
                        alignItems: super.CalculateVerticalAlignment(),
                        display: 'flex' && '-webkit-flex'
                    }}>

                    {/* 封面 */}
                    <div className='cover-image-wrapper'>
                        <img src={this.state.PlayingAudio.CoverImage} />
                    </div>

                    {/* 播放、暂停、上一首、下一首按钮 */}
                    <div className='play-pause-button-wrapper'>
                        <IconButton
                            tooltip="上一首"
                            touch={true}
                            disabled={!this.state.IsCanPlay}
                            tooltipPosition="bottom-center"
                            onClick={this.SkipPerviousButton_Click.bind(this)}
                        >
                            <AVSkipPrevious />
                        </IconButton>
                        {
                            this.state.IsPause && <IconButton
                                tooltip="播放"
                                touch={true}
                                disabled={!this.state.IsCanPlay}
                                tooltipPosition="bottom-center"
                                iconStyle={{
                                    width: 36,
                                    height: 36,
                                }}
                                style={{
                                    width: 72,
                                    height: 72,
                                }}
                                onClick={this.PlayButton_Click.bind(this)}
                            >
                                <AVPlayArrow />
                            </IconButton>
                        }

                        {
                            !this.state.IsPause && <IconButton
                                tooltip="暂停"
                                touch={true}
                                disabled={!this.state.IsCanPlay}
                                tooltipPosition="bottom-center"
                                iconStyle={{
                                    width: 36,
                                    height: 36,
                                }}
                                style={{
                                    width: 72,
                                    height: 72,
                                }}
                                onClick={this.PauseButton_Click.bind(this)}
                            >
                                <AVPause />
                            </IconButton>
                        }
                        <IconButton
                            tooltip="下一首"
                            touch={true}
                            disabled={!this.state.IsCanPlay}
                            tooltipPosition="bottom-center"
                            onClick={this.SkipNextButton_Click.bind(this)}
                        >
                            <AVSkipNext />
                        </IconButton>
                    </div>

                    <div className='progress-audioinfomation-wrapper'>
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={30}
                        />
                    </div>
                    <div className='volume-playlist-button-wrapper' ref='volume'>
                        {
                            this.GeneratePlayModeButton()
                        }

                        {
                            this.GenerateVolumeButton()
                        }
                        <IconButton
                            disabled={this.state.PlayList.length <= 0}
                        >
                            <AVQueueMusic />
                        </IconButton>
                    </div>
                    {/* HTML5音频播放对象 */}
                    <audio
                        ref='audio'
                        muted={this.state.Volume <= 0}
                        src={this.state.PlayingAudio.Url}
                        onCanPlay={() => {
                            this.setState({
                                IsCanPlay: true,
                            });
                        }}
                    />
                    {/* 音量控制弹出层 */}
                    <Popover
                        open={this.state.IsOpen}
                        anchorEl={this.refs.volume}
                        anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                        canAutoPosition={true}
                        style={{
                            height: 50,
                            width: 500,
                        }}
                        onRequestClose={() => {
                            this.setState({
                                IsOpen: false,
                            });
                        }}
                    >
                        <div className='volume-popover-wrapper'>
                            <Slider
                                style={{
                                    width: 480,
                                    height: 20,
                                }}
                                defaultValue={this.state.Volume / 100}
                            />
                        </div>

                    </Popover>
                </div>
            </MuiThemeProvider>
        );
    }
}
