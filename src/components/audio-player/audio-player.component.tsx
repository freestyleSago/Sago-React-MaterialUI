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
import { DateTime } from '../../utilities/datetime';
import * as _ from 'lodash';
import { InlineLyric } from './lyric-components/inline-lyric.component';
import { MuiThemeProvider, darkBaseTheme } from 'material-ui/styles';
import {
    IconButton,
    Slider,
    Popover,
    IconButtonProps,
    Menu,
    MenuItem,
} from 'material-ui';
import { Audio, SkipTimespan, Lyric } from './models';
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
import ContentRemove from 'material-ui/svg-icons/content/remove';

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
 * 歌詞模式
 * 
 * @export
 * @enum {number}
 */
export enum LyricMode {
    /**
     * 不显示歌词
     */
    Hidden = 0,
    /**
     * 行内模式
     */
    Inline = 1,
}

/**
 * Props模型
 * 
 * @export
 * @interface AudioPlayerProps
 * @extends {IPropsBase}
 */
export interface AudioPlayerProps extends IPropsBase {
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
     * 播放列表是否顯示
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    PlaylistVisibility?: boolean;
    /**
     * 上一曲按钮是否显示
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    SkipPerviousButtonVisibility?: boolean;
    /**
     * 下一曲按钮是否显示
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    SkipNextButtonVisibility?: boolean;
    /**
     * 封面图片是否显示
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    CoverImageVisibility?: boolean;
    /**
     * 音频标题是否显示
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    TitleVisibility?: boolean;
    /**
     * 音频作者是否显示
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    ArtistsVisibility?: boolean;
    /**
     * 是否允許從Playlist移除音頻
     * 
     * @type {boolean}
     * @memberOf AudioPlayerProps
     */
    IsCanRemoveItemFromPlaylist?: boolean;
    /**
     * 默认播放模式
     * 
     * @type {PlayMode}
     * @memberOf AudioPlayerProps
     *
     */
    PlayMode?: PlayMode;
    /**
     * 設備類型
     * 
     * @type {DeviceFamily}
     * @memberOf AudioPlayerProps
     */
    DeviceFamily?: DeviceFamily;
    /**
     * 歌詞模式
     * 
     * @type {_LyricMode}
     * @memberOf AudioPlayerProps
     */
    LyricMode?: LyricMode;
    /**
     * 播放列表
     * 
     * @type {Audio[]}
     * @memberOf AudioPlayerProps
     */
    Playlist?: Audio[];
    /**
     * 播放Audio索引
     * 
     * @type {number}
     * @memberOf AudioPlayerProps
     */
    PlayIndex?: number;
    /**
     * Audio对象比较器
     * 
     * 
     * @memberOf AudioPlayerProps
     */
    AudioComparer?: (leftAudio: Audio, rightAudio: Audio) => boolean;
    /**
     * 播放列表比较器
     * 
     * 
     * @memberOf AudioPlayerProps
     */
    PlaylistComparer?: (leftPlaylist: Audio[], rightPlaylist: Audio[]) => boolean;
    /**
     * 播放回调函数
     * 
     * @param {Audio} playingAudio 正播放音频
     * @param {number} playingAudioIndex 正播放音频索引
     * @memberOf AudioPlayerProps
     */
    Play?: (playingAudio: Audio, playingAudioIndex: number) => void;
    /**
     * 暂停回调函数
     * 
     * @param {Audio} playingAudio 正播放音频
     * @param {number} playingAudioIndex 正播放音频索引
     * @memberOf AudioPlayerProps
     */
    Pause?: (playingAudio: Audio, playingAudioIndex: number) => void;
    /**
     * 正播放音频结束事件
     * @param {Audio} playingAudio 正播放音频
     * @param {Audio} nextToPlayAudio 下一曲音频
     * @param {number} playingAudioIndex 正播放音频索引
     * @param {number} nextToPlayAudioIndex 下一曲音频索引
     * @returns {boolean} true，切换音频。false则否
     * @memberOf AudioPlayerProps
     */
    End?: (playingAudio: Audio, nextToPlayAudio: Audio, playingAudioIndex: number, nextToPlayAudioIndex: number) => void;
    /**
     * 發生異常事件
     * 
     * 
     * @memberOf AudioPlayerProps
     */
    Error?: (message: string) => void;
    /**
     * 音頻正切換事件
     * @param {Audio} playingAudio 正播放音频
     * @param {Audio} nextToPlayAudio 下一曲音频
     * @param {number} playingAudioIndex 正播放音频索引
     * @param {number} nextToPlayAudioIndex 下一曲音频索引
     * 
     * @memberOf AudioPlayerProps
     */
    AudioChanging?: (playingAudio: Audio, nextToPlayAudio: Audio, playingAudioIndex: number, nextToPlayAudioIndex: number) => void;
}

/**
 * State模型
 * 
 * @export
 * @interface AudioPlayerState
 * @extends {IStateBase}
 */
export interface AudioPlayerState extends IStateBase {
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
    Playlist: Audio[],
    /**
     * 正播放音频
     * 
     * @type {Audio}
     * @memberOf AudioPlayerState
     */
    PlayingAudio: Audio;
    /**
     * 正播放音频索引
     * 
     * @type {number}
     * @memberOf AudioPlayerState
     */
    PlayingAudioIndex: number;
    /**
     * 上一曲播放音频索引
     * 
     * @type {number}
     * @memberOf AudioPlayerState
     */
    LastPlayAudioIndex: number;
    /**
     * 播放进度
     * 
     * @type {number}
     * @memberOf AudioPlayerState
     */
    CurrentTime: number;
    /**
     * 跳跃播放区间索引
     * 
     * @type {number}
     * @memberOf AudioPlayerState
     */
    SkipTimespanIndex: number;
    /**
     * 轉換后歌詞數組
     * 
     * @type {Lyric[]}
     * @memberOf AudioPlayerState
     */
    ParsedLyric: Lyric[],
    /**
     * Popover是否打开
     * 
     * @type {boolean}
     * @memberOf AudioPlayerState
     */
    IsVolumePopoverOpen: boolean;
    /**
     * 播放列表是否打開
     * 
     * @type {boolean}
     * @memberOf AudioPlayerState
     */
    IsPlaylistPopoverOpen: boolean;
    /**
     * Popover定位HTML元素
     * 
     * @type {*}
     * @memberOf AudioPlayerState
     */
    AnchorElement: any;
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
     * 播放模式
     * 
     * @static
     * @memberof AudioPlayer
     */
    public static PlayMode = PlayMode;
    /**
     * 歌词模式
     * 
     * @static
     * @memberof AudioPlayer
     */
    public static LyricMode = LyricMode;
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
        Height: '66px',
        Border: 'solid 1px black',
        BorderRadius: 6,
        IsAutoPlay: true,
        IsPause: true,
        IsMute: true,
        Volume: 100,
        PlaylistVisibility: true,
        SkipPerviousButtonVisibility: true,
        SkipNextButtonVisibility: true,
        CoverImageVisibility: true,
        TitleVisibility: true,
        ArtistsVisibility: true,
        IsCanRemoveItemFromPlaylist: true,
        PlayMode: AudioPlayer.PlayMode.ListLoop,
        DeviceFamily: DeviceFamily.Desktop,
        LyricMode: AudioPlayer.LyricMode.Hidden,
        Playlist: [],
        PlayIndex: 0,
        AudioComparer: (leftAudio: Audio, rightAudio: Audio) => _.isEqual(leftAudio, rightAudio),
        PlaylistComparer: (leftPlaylist: Audio[], rightPlaylist: Audio[]) => _.isEqual(leftPlaylist, rightPlaylist),
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
            PlayMode: this.props.PlayMode === undefined ? PlayMode.ListLoop : this.props.PlayMode,
            /** 
             * 播放列表
            */
            Playlist: this.props.Playlist || [],
            /** 
             * 正播放音频
            */
            PlayingAudio: new Audio(),
            /** 
             * 正播放音频索引，默认为-1。指代默认音频（暂无歌曲）
            */
            PlayingAudioIndex: -1,
            /** 
             * 上一曲播放音频索引，默认为-1。指代默认音频（暂无歌曲）
            */
            LastPlayAudioIndex: -1,
            /** 
             * 播放进度
            */
            CurrentTime: 0,
            /** 
             * 跳跃播放区间索引
            */
            SkipTimespanIndex: 0,
            /** 
             * 轉換后數組
            */
            ParsedLyric: [],
            /** 
             * Popover是否打开
            */
            IsVolumePopoverOpen: false,
            /** 
             * 播放列表是否展開
            */
            IsPlaylistPopoverOpen: false,
            /** 
             * Popover使用的定位元素
            */
            AnchorElement: null,
        }
    }

    componentDidMount() {
        if (this.state.Playlist.length >= 1) {
            this.SetAudio(this.GetAudio(this.props.PlayIndex || 0), this.props.PlayIndex || 0);
        }
    }

    componentWillReceiveProps(nextProps: AudioPlayerProps) {
        // 是否更新Playlist
        if (this.props.PlaylistComparer && this.props.PlaylistComparer(this.state.Playlist, nextProps.Playlist || [])) {
            this.setState({
                Playlist: nextProps.Playlist || [],
            }, () => {
                if (nextProps.Playlist === undefined || nextProps.Playlist.length <= 0) {
                    return;
                }
                this.SetAudio(this.GetAudio(nextProps.PlayIndex || 0, nextProps.Playlist), nextProps.PlayIndex || 0);
            });
        }

        // 是否更新PlayingAudioIndex
        if (nextProps.PlayIndex !== undefined && this.props.PlayIndex != nextProps.PlayIndex) {
            this.SetAudio(this.GetAudio(nextProps.PlayIndex), nextProps.PlayIndex);
        }

        // 是否更新暂停状态
        if (nextProps.IsPause !== undefined && this.state.IsPause !== nextProps.IsPause) {
            this.PlayOrPause(nextProps.IsPause);
        }
    }

    /**
     * 
     * 从Playlist中取得单个Audio
     * @private
     * @param {number} index 
     * @param {Audio[]} [playlist=this.state.PlayList] 
     * @returns {Audio} 
     * 
     * @memberOf AudioPlayer
     */
    private GetAudio(index: number, playlist: Audio[] = this.state.Playlist): Audio {
        if (playlist.length <= 0) {
            return new Audio();
        }
        if (index === -1) {
            return new Audio();
        }
        try {
            return playlist[index];
        } catch (error) {
            return new Audio();
        }
    }

    /**
     * 将Audio前置为正播放放曲目
     * 
     * @private
     * @param {Audio} audio 
     * @param {number} index 
     * 
     * @memberOf AudioPlayer
     */
    private SetAudio(audio: Audio = new Audio(), index: number = -1): void {
        // 廣播事件
        this.props.AudioChanging && this.props.AudioChanging(this.state.PlayingAudio, audio, this.state.PlayingAudioIndex, index);

        this.setState({
            ParsedLyric: audio.Lyric.length > 0 ? this.ParseLyric(audio.Lyric) : [],
            PlayingAudio: audio,
            PlayingAudioIndex: index,
            LastPlayAudioIndex: this.state.PlayingAudioIndex,
            SkipTimespanIndex: 0,
            CurrentTime: audio.SkipTimespan.length > 0 ? audio.SkipTimespan[0].EnteringTime : 0,
        }, () => {
            (this.refs.audio as HTMLAudioElement).currentTime = this.state.CurrentTime;

            if (this.state.IsPause === false && (this.refs.audio as HTMLAudioElement).paused) {
                (this.refs.audio as HTMLAudioElement).play();
            }
        });
    }

    /**
     * 计算上一曲索引
     * 
     * @private
     * @returns {number} 
     * 
     * @memberOf AudioPlayer
     */
    private CalculatePreviousAudioIndex(): number {
        switch (this.state.PlayMode) {
            case PlayMode.SingleLoop:
                return this.state.PlayingAudioIndex;
            case PlayMode.ListLoop:
                // 如果下首歌的索引已达到播放列表最大值，那么重置为播放列表最后一首歌
                if (this.state.PlayingAudioIndex <= 0) {
                    return this.state.Playlist.length - 1;
                }
                return this.state.PlayingAudioIndex - 1;
            case PlayMode.UnorderLoop:
                // 无序播放模式，点击上一首歌按钮不是当前播放歌曲index-1，而应该是上一首歌得真是索引，并且只能假设，用户没有从播放列表删除上一首歌，若删除了，则使用其索引在删除后的播放列表中的数据
                return this.state.LastPlayAudioIndex;
            default:
                return 0;
        }
    }

    /**
     * 计算正播放音频索引
     * 
     * @private
     * @returns {number} 
     * 
     * @memberOf AudioPlayer
     */
    private CalculatePlayingAudioIndex(): number {
        for (let i = 0; i < this.state.Playlist.length; i++) {
            if (this.props.AudioComparer && this.props.AudioComparer(this.state.PlayingAudio, this.state.Playlist[i])) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 计算下一曲所以
     * 
     * @private
     * @returns {number} 
     * 
     * @memberOf AudioPlayer
     */
    private CalculateNextAudioIndex(): number {
        switch (this.state.PlayMode) {
            case PlayMode.SingleLoop:
                return this.state.PlayingAudioIndex;
            case PlayMode.ListLoop:
                // 如果下首歌的索引已达到播放列表最大值，那么重置为播放列表第一首歌
                if (this.state.PlayingAudioIndex + 1 === this.state.Playlist.length) {
                    return 0;
                }
                return this.state.PlayingAudioIndex + 1;
            case PlayMode.UnorderLoop:
                if (this.state.Playlist.length === 0) {
                    return -1;
                }
                if (this.state.Playlist.length === 1) {
                    return 0;
                }
                let nextMusicIndex = -1;
                while (nextMusicIndex === this.state.PlayingAudioIndex || nextMusicIndex === -1) {
                    nextMusicIndex = Math.floor(0 + Math.random() * (this.state.Playlist.length - 0));
                }
                return nextMusicIndex;
            default:
                return -1;
        }
    }

    /**
     * 播放器播放时每帧执行方法
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private Playing(): void {
        this.setState({
            CurrentTime: (this.refs.audio as HTMLAudioElement).currentTime,
        }, () => {
            // 如果使用者传入了enterTimespans数据，则需要判断是否需要跳跃到下一个enterTimespan时刻播放l.反之则从0秒播放到歌曲实际时长
            if (this.state.PlayingAudio.SkipTimespan.length > 0) {
                const endingTime = this.state.PlayingAudio.SkipTimespan[this.state.SkipTimespanIndex].EndingTime;
                if (!endingTime) {
                    return;
                }
                // 当前播放片段区间索引
                if (this.state.SkipTimespanIndex >= this.state.PlayingAudio.SkipTimespan.length - 1 && this.state.CurrentTime >= endingTime) {
                    this.End();
                    return;
                }
                if (this.state.CurrentTime >= endingTime) {
                    // 取得下一个播放片段的进入和结束时间，如果没取到结束时间，则默认播放到街区结尾
                    const nextEnteringTime = this.state.PlayingAudio.SkipTimespan[this.state.SkipTimespanIndex + 1].EnteringTime;
                    this.setState({
                        CurrentTime: nextEnteringTime,
                        SkipTimespanIndex: this.state.SkipTimespanIndex + 1,
                    }, () => {
                        (this.refs.audio as HTMLAudioElement).currentTime = this.state.CurrentTime;
                    });
                }
            }
        });
    }


    /**
     * 音頻時長變化事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private DurationChange(): void {
        // 如果音頻對象時長等於實際時長，則不需要更新duration屬性
        if (this.state.PlayingAudio.Duration === (this.refs.audio as HTMLAudioElement).duration) {
            return;
        }
        this.setState({
            PlayingAudio: _.merge({}, this.state.PlayingAudio, { Duration: (this.refs.audio as HTMLAudioElement).duration })
        });
    }

    /**
     * 切换播放或暂停状态
     * 
     * @private
     * @param {boolean} [isPause=true] 
     * 
     * @memberOf AudioPlayer
     */
    private PlayOrPause(isPause: boolean = true): void {
        this.setState({
            IsPause: isPause,
        }, () => {
            if (this.state.IsPause) {
                (this.refs.audio as HTMLAudioElement).pause();
            } else {
                (this.refs.audio as HTMLAudioElement).play();
            }
        })
    }


    /**
     * 结束当前音频播放，切换至下一曲音频
     * 
     * @private
     * @returns {void} 
     * 
     * @memberOf AudioPlayer
     */
    private End(): void {
        // 播放列表为空不执行切歌代码并且将正在播放歌曲切换为默认歌曲对象
        if (this.state.Playlist.length <= 0) {
            this.SetAudio();
            return;
        }

        const nextToPlayAudioIndex = this.CalculateNextAudioIndex();
        const nextToPlayAudio = this.GetAudio(nextToPlayAudioIndex)
        this.props.End && this.props.End(this.state.PlayingAudio, nextToPlayAudio, this.state.PlayingAudioIndex, nextToPlayAudioIndex);

        this.SetAudio(nextToPlayAudio, nextToPlayAudioIndex);
    }

    /**
     * 切换至上一曲
     * 
     * 
     * @memberOf AudioPlayer
     */
    public Pervious(): void {
        const perviousAudioIndex = this.CalculatePreviousAudioIndex();
        this.SetAudio(this.GetAudio(perviousAudioIndex), perviousAudioIndex);
    }

    /**
     * 切换至下一曲
     * 
     * 
     * @memberOf AudioPlayer
     */
    public Next(): void {
        const nextAudioIndex = this.CalculateNextAudioIndex();
        this.SetAudio(this.GetAudio(nextAudioIndex), nextAudioIndex);
    }
    /**
     * 上一首按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private SkipPerviousButton_Click(): void {
        this.Pervious();
    }

    /**
     * 下一首按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private SkipNextButton_Click(): void {
        this.Next();
    }

    /**
     * 播放按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private PlayButton_Click(): void {
        this.props.Play && this.props.Play(this.state.PlayingAudio, this.state.PlayingAudioIndex);
        this.PlayOrPause(false);
    }

    /**
     * 暂停按钮点击事件
     * 
     * @private
     * 
     * @memberOf AudioPlayer
     */
    private PauseButton_Click(): void {
        this.props.Pause && this.props.Pause(this.state.PlayingAudio, this.state.PlayingAudioIndex);
        this.PlayOrPause(true);
    }

    /**
     * 格式化時間，如果時為0，則不顯示時
     * 
     * @private
     * @param {number} seconds 
     * @returns {string} 
     * 
     * @memberOf AudioPlayer
     */
    private FormatTime(seconds: number): string {
        const dateTime = new DateTime().AddSeconds(seconds);
        if (dateTime.GetHour() > 0) {
            return dateTime.ToString("HH:mm:ss");
        }

        return dateTime.ToString('mm:ss');
    }

    /**
     * 格式化藝術家名字
     * 
     * @private
     * @param {string[]} artists
     * @returns {string} 
     * 
     * @memberOf AudioPlayer
     */
    private FormatArtistsName(artists: string[]): string {
        if (artists.length == 0) {
            return '';
        }

        return _.join(artists, '、');
    }

    /**
   * 解析歌词
   *
   * @param {any} lyric  歌词字符串已\n分割
   * @returns 解析后的歌词数组
   *
   * @memberOf AudioPlayer
   */
    private ParseLyric(lyric: string): Lyric[] {
        const lyricArray = lyric.split('\n');
        let lrc = [];
        const lyricLen = lyricArray.length;
        for (let i = 0; i < lyricLen; i++) {
            // match lrc time
            const lrcTimes = lyricArray[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
            // match lrc text
            const lrcText = lyricArray[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

            if (lrcTimes != null) {
                // handle multiple time tag
                const timeLen = lrcTimes.length;
                for (let j = 0; j < timeLen; j++) {
                    const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]) || [];
                    const lrcTime = parseInt(oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000);
                    lrc.push(new Lyric(lrcTime, lrcText));
                }
            }
        }
        // sort by time
        lrc.sort((a, b) => a.Time - b.Time);
        return lrc;
    };

    /**
     * 生成播放模式按钮
     * 
     * @private
     * @param {React.CSSProperties} [iconStyle={ width: 24, height: 24 }] 
     * @param {React.CSSProperties} [style={ width: 48, height: 48 }] 
     * @returns {React.ReactElement<IconButtonProps>} 
     * 
     * @memberOf AudioPlayer
     */
    private GeneratePlayModeButton(iconStyle: React.CSSProperties = { width: 24, height: 24 }, style: React.CSSProperties = { width: 48, height: 48 }): React.ReactElement<IconButtonProps> {
        switch (this.state.PlayMode) {
            case AudioPlayer.PlayMode.SingleLoop:
                return (
                    <IconButton
                        touch={true}
                        iconStyle={iconStyle}
                        style={style}
                        onClick={(event) => {
                            this.setState({
                                PlayMode: AudioPlayer.PlayMode.UnorderLoop,
                            });
                        }}
                    >
                        <AVRepeatOne />
                    </IconButton >
                );
            case AudioPlayer.PlayMode.ListLoop:
                return (
                    <IconButton
                        touch={true}
                        iconStyle={iconStyle}
                        style={style}
                        onClick={(event) => {
                            this.setState({
                                PlayMode: AudioPlayer.PlayMode.SingleLoop,
                            });
                        }}
                    >
                        <AVRepeat />
                    </IconButton>
                );
            case AudioPlayer.PlayMode.UnorderLoop:
                return (
                    <IconButton
                        touch={true}
                        iconStyle={iconStyle}
                        style={style}
                        onClick={(event) => {
                            this.setState({
                                PlayMode: AudioPlayer.PlayMode.ListLoop,
                            });
                        }}
                    >
                        <AVShuffle />
                    </IconButton>
                );
        }
    }

    /**
     * 生成上一曲按钮
     * 
     * @private
     * @param {React.CSSProperties} [iconStyle={ width: 24, height: 24 }] 
     * @param {React.CSSProperties} [style={ width: 48, height: 48 }] 
     * @returns {(React.ReactElement<IconButtonProps> | void)} 
     * 
     * @memberOf AudioPlayer
     */
    private GenerateSkipPerviousButton(iconStyle: React.CSSProperties = { width: 24, height: 24 }, style: React.CSSProperties = { width: 48, height: 48 }): React.ReactElement<IconButtonProps> | void {
        if (this.props.SkipPerviousButtonVisibility === false) {
            return;
        }
        return <IconButton
            touch={true}
            disabled={!this.state.IsCanPlay}
            iconStyle={iconStyle}
            style={style}
            onClick={this.SkipPerviousButton_Click.bind(this)}
        >
            <AVSkipPrevious />
        </IconButton>;
    }

    /**
     * 生成播放和暫停按鈕
     * 
     * @private
     * @param {React.CSSProperties} [iconStyle={ width: 36, height: 36 }] 
     * @param {React.CSSProperties} [style={ width: 72, height: 72 }] 
     * @returns {React.ReactElement<IconButtonProps>} 
     * 
     * @memberOf AudioPlayer
     */
    private GeneratePlayAndPauseButton(iconStyle: React.CSSProperties = { width: 36, height: 36 }, style: React.CSSProperties = { width: 40, height: 40, padding: 0 }): React.ReactElement<IconButtonProps> {
        if (this.state.IsPause) {
            return <IconButton
                touch={true}
                disabled={!this.state.IsCanPlay}
                iconStyle={iconStyle}
                style={style}
                onClick={this.PlayButton_Click.bind(this)}
            >
                <AVPlayArrow />
            </IconButton>;
        }

        return <IconButton
            touch={true}
            disabled={!this.state.IsCanPlay}
            iconStyle={iconStyle}
            style={style}
            onClick={this.PauseButton_Click.bind(this)}
        >
            <AVPause />
        </IconButton>;
    }

    /**
     * 生成下一曲按鈕
     * 
     * @private
     * @param {React.CSSProperties} [iconStyle={ width: 24, height: 24 }] 
     * @param {React.CSSProperties} [style={ width: 48, height: 48 }] 
     * @returns {React.ReactElement<IconButtonProps>} 
     * 
     * @memberOf AudioPlayer
     */
    private GenerateSkipNextButton(iconStyle: React.CSSProperties = { width: 24, height: 24 }, style: React.CSSProperties = { width: 48, height: 48 }): React.ReactElement<IconButtonProps> | void {
        if (this.props.SkipNextButtonVisibility === false) {
            return;
        }
        return <IconButton
            touch={true}
            disabled={!this.state.IsCanPlay}
            iconStyle={iconStyle}
            style={style}
            onClick={this.SkipNextButton_Click.bind(this)}
        >
            <AVSkipNext />
        </IconButton>
    }

    /**
     * 生成播放列表按鈕
     * 
     * @private
     * @param {React.CSSProperties} [iconStyle={ width: 24, height: 24 }] 
     * @param {React.CSSProperties} [style={ width: 48, height: 48 }] 
     * @returns {React.ReactElement<IconButtonProps>} 
     * 
     * @memberOf AudioPlayer
     */
    private GeneratePlaylistButton(iconStyle: React.CSSProperties = { width: 24, height: 24 }, style: React.CSSProperties = { width: 48, height: 48 }): React.ReactElement<IconButtonProps> | void {
        if (this.props.PlaylistVisibility) {
            return <IconButton
                disabled={this.state.Playlist.length <= 0}
                iconStyle={iconStyle}
                style={style}
                onClick={() => {
                    this.setState({
                        IsPlaylistPopoverOpen: true,
                    });
                }}
            >
                <AVQueueMusic />
            </IconButton>
        }
    }

    /**
     * 生成音量按钮
     * 
     * @returns {React.ReactElement<IconButtonProps>} 
     * 
     * @memberOf AudioPlayer
     */
    private GenerateVolumeButton(): React.ReactElement<IconButtonProps> | void {
        if (this.state.Volume <= 0) {
            return (
                <IconButton
                    touch={true}
                    onClick={(event) => {
                        this.setState({
                            AnchorElement: event.currentTarget,
                            IsVolumePopoverOpen: true,
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
                    onClick={(event) => {
                        this.setState({
                            AnchorElement: event.currentTarget,
                            IsVolumePopoverOpen: true,
                        });
                    }}
                >
                    <AVVolumeDown />
                </IconButton>);
        } else {
            return (
                <IconButton
                    touch={true}
                    onClick={(event) => {
                        this.setState({
                            AnchorElement: event.currentTarget,
                            IsVolumePopoverOpen: true,
                        });
                    }}
                >
                    <AVVolumeUp />
                </IconButton>);
        }
    }

    /**
     * 播放列表
     * 
     * @private
     * @returns {HTMLDivElement} 
     * 
     * @memberOf AudioPlayer
     */
    private GeneratePlaylist(): any {
        return (
            <div className='playlist-wrapper'
                style={{
                    width: this.props.DeviceFamily === DeviceFamily.Phone ? document.body.clientWidth : '700px',
                    fontSize: this.props.DeviceFamily === DeviceFamily.Phone ? 14 : 15
                }}
            >
                {
                    _.map(this.state.Playlist, (playlistItem, index) => {
                        return (
                            <div className='playlist-item-wrapper'
                                key={index}
                                onClick={() => {
                                    if (index === this.state.PlayingAudioIndex) {
                                        return;
                                    }

                                    this.SetAudio(playlistItem, index);
                                }}>
                                <div className='status-wrapper'>
                                    {this.state.PlayingAudioIndex === index && <AVPlayArrow />}
                                </div>
                                <div className='title-wrapper'
                                    style={{
                                        width: '55%',
                                    }}
                                >
                                    <span>
                                        {playlistItem.Title}
                                    </span>
                                </div>
                                <div className='artist-wrapper'>
                                    <span>
                                        {this.FormatArtistsName(playlistItem.Artists)}
                                    </span>
                                </div>
                                <div className='duration-wrapper'>
                                    <span>
                                        {this.FormatTime(playlistItem.Duration)}
                                    </span>
                                </div>
                                {this.props.IsCanRemoveItemFromPlaylist &&
                                    <div className='operation-wrapper'>
                                        <IconButton
                                            iconStyle={{
                                                width: 30,
                                                height: 30,
                                            }}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                padding: 5,
                                            }}
                                            onClick={() => {
                                                let clonePlaylist = _.clone(this.state.Playlist);
                                                clonePlaylist = _.filter(clonePlaylist, (clonePlaylistItem, indexOfClonePlaylistItem) => indexOfClonePlaylistItem !== index)
                                                this.setState({
                                                    Playlist: clonePlaylist,
                                                    PlayingAudioIndex: _.findIndex(clonePlaylist, clonePlaylistItem => this.props.AudioComparer && this.props.AudioComparer(clonePlaylistItem, playlistItem)),
                                                });
                                            }}
                                        >
                                            <ContentRemove color='red' />
                                        </IconButton>
                                    </div>
                                }
                            </div>
                        );
                    })
                }
            </div>
        );

    }

    render() {
        return (
            <MuiThemeProvider>
                <div
                    ref='wrapper'
                    className='audio-palyer-wrapper'
                    style={{
                        width: this.props.Width,
                        height: this.props.Height,
                        justifyContent: super.CalculateHorizontalAlignment(),
                        alignItems: super.CalculateVerticalAlignment(),
                        border: this.props.Border,
                        borderRadius: this.props.BorderRadius,
                        fontSize: this.props.DeviceFamily === DeviceFamily.Phone ? 12 : 15
                    }}>

                    {/* 封面 */}
                    {this.props.CoverImageVisibility &&
                        <div className='cover-image-wrapper'>
                            <img src={this.state.PlayingAudio.CoverImage} />
                        </div>
                    }

                    {/* 播放、暂停、上一首、下一首按钮 （非手機模式）*/}
                    {this.props.DeviceFamily !== DeviceFamily.Phone &&
                        <div className='play-pause-button-wrapper'>
                            {this.GenerateSkipPerviousButton()}
                            {this.GeneratePlayAndPauseButton()}
                            {this.GenerateSkipNextButton()}
                        </div>
                    }

                    <div className='progress-audioinfomation-wrapper'>
                        <div className='audio-information-wrapper'>
                            <div className='title-artists-wrapper'>
                                {
                                    this.props.TitleVisibility &&
                                    <span>{this.state.PlayingAudio.Title}</span>
                                }
                                <span>{this.state.PlayingAudio.Artists.length > 0 && this.props.TitleVisibility ? '-' : ''}</span>
                                {
                                    this.props.ArtistsVisibility &&
                                    <span>{this.FormatArtistsName(this.state.PlayingAudio.Artists)}</span>
                                }
                            </div>
                            <div className='inline-lyric-wrapper'>
                                {this.props.LyricMode === AudioPlayer.LyricMode.Inline &&
                                    <InlineLyric
                                        CurrentTime={this.state.CurrentTime}
                                        Lyric={this.state.ParsedLyric}
                                    />}
                            </div>
                            <div className='currenttime-duration-wrapper'>
                                <span>
                                    {this.FormatTime(this.state.CurrentTime)}
                                </span>
                                <span style={{
                                    marginLeft: 5,
                                    marginRight: 5
                                }}>
                                    /
                                </span>
                                <span>
                                    {this.FormatTime(this.state.PlayingAudio.Duration)}
                                </span>
                            </div>
                        </div>
                        <div className='play-progress-wrapper'>
                            <div className='progress-wrapper'>
                                <Slider
                                    disabled={!this.state.IsCanPlay}
                                    min={0}
                                    max={this.state.PlayingAudio.Duration}
                                    sliderStyle={{
                                        margin: 0,
                                    }}
                                    defaultValue={0}
                                    value={this.state.CurrentTime}
                                    onChange={(event: object, newValue: number) => {
                                        // 由於用戶可能會拖動播放進度條導致多段SkipTimespanIndex不正確，所以需要根據當前播放進度計算SkipTimespanIndex值
                                        if (this.state.PlayingAudio.SkipTimespan.length > 1) {
                                            const correctSkipTimespan = _.find<SkipTimespan>(this.state.PlayingAudio.SkipTimespan, skipTimespan => newValue >= skipTimespan.EnteringTime && newValue < skipTimespan.EndingTime);
                                            let correctSkipTimespanIndex = 0;
                                            let correctCurrentTime = this.state.PlayingAudio.SkipTimespan[0].EnteringTime;
                                            if (correctSkipTimespan) {
                                                correctSkipTimespanIndex = this.state.PlayingAudio.SkipTimespan.indexOf(correctSkipTimespan);
                                                correctCurrentTime = correctSkipTimespan.EnteringTime;
                                            }
                                            this.setState({
                                                SkipTimespanIndex: correctSkipTimespanIndex,
                                                CurrentTime: correctCurrentTime,
                                            }, () => {
                                                (this.refs.audio as HTMLAudioElement).currentTime = this.state.CurrentTime;
                                            });
                                            return;
                                        }

                                        this.setState({
                                            CurrentTime: newValue,
                                        }, () => {
                                            (this.refs.audio as HTMLAudioElement).currentTime = this.state.CurrentTime;
                                        });
                                    }}
                                />
                            </div>

                            {this.props.DeviceFamily === DeviceFamily.Phone &&
                                <div className='operation-phone-button-wrapper'>
                                    {this.GeneratePlayModeButton({ width: 20, height: 20 }, { width: 24, height: 24, padding: 0 })}
                                    {this.GenerateSkipNextButton({ width: 24, height: 24 }, { width: 24, height: 24, padding: 0 })}
                                    {this.GeneratePlayAndPauseButton({ width: 24, height: 24 }, { width: 24, height: 24, padding: 0 })}
                                    {this.GeneratePlaylistButton({ width: 22, height: 22 }, { width: 24, height: 24, padding: 0 })}
                                </div>
                            }

                        </div>
                    </div>
                    {this.props.DeviceFamily !== DeviceFamily.Phone &&
                        <div className='volume-playlist-button-wrapper'>
                            {
                                this.GeneratePlayModeButton()
                            }

                            {
                                this.GenerateVolumeButton()
                            }
                            {
                                this.GeneratePlaylistButton()
                            }
                        </div>
                    }

                    {/* HTML5音频播放对象 */}
                    <audio
                        ref='audio'
                        muted={this.state.Volume <= 0}
                        loop={this.state.PlayMode === PlayMode.SingleLoop}
                        src={this.state.PlayingAudio.Url}
                        onTimeUpdate={this.Playing.bind(this)}
                        onDurationChange={this.DurationChange.bind(this)}
                        onError={() => {
                            this.props.Error && this.props.Error('出錯啦！');
                        }}
                        onCanPlay={() => {
                            this.DurationChange();
                            if (this.state.IsCanPlay === false) {
                                this.setState({
                                    IsCanPlay: true,
                                });
                            }
                        }}
                        onEnded={() => {
                            this.End();
                        }}
                    />
                    {/* 音量控制弹出层 */}
                    <Popover
                        open={this.state.IsVolumePopoverOpen}
                        anchorEl={this.state.AnchorElement}
                        anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                        canAutoPosition={true}
                        onRequestClose={() => {
                            this.setState({
                                IsVolumePopoverOpen: false,
                            });
                        }}>
                        <Slider
                            axis='y'
                            sliderStyle={{
                                marginLeft: 10,
                                marginRight: 0,
                                marginTop: 15,
                                marginBottom: 15,
                                width: 30,
                                height: 200
                            }}
                            defaultValue={this.state.Volume / 100}
                            onChange={(event: object, newValue: number) => {
                                this.setState({
                                    Volume: newValue * 100,
                                }, () => {
                                    (this.refs.audio as HTMLAudioElement).volume = this.state.Volume / 100;
                                });
                            }}
                        />
                    </Popover>
                    {/* 播放列表彈出層 */}
                    <Popover
                        open={this.state.IsPlaylistPopoverOpen}
                        anchorEl={this.refs.wrapper}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        onRequestClose={() => {
                            this.setState({
                                IsPlaylistPopoverOpen: false,
                            });
                        }}>
                        {
                            this.GeneratePlaylist()
                        }
                    </Popover>
                </div>
            </MuiThemeProvider >
        );
    }
}
