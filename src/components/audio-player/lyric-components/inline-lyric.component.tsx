import * as React from 'react';
import { BaseComponent, IPropsBase, IStateBase } from '../../base-component';
import { Lyric } from '../models';
import './inline-lyric.view.scss';

export interface InlineLyricProps extends IPropsBase {
    /**
     * 當前時間
     * 
     * @type {number}
     * @memberOf InlineLyricProps
     */
    CurrentTime: number,
    /**
     * 歌詞數組
     * 
     * @type {Lyric[]}
     * @memberOf InlineLyricProps
     */
    Lyric: Lyric[],
}

export interface InlineLyricState extends IStateBase {
    /**
     * 時刻所在歌詞數組索引
     * 
     * @type {number}
     * @memberOf InlineLyricState
     */
    CurrentLyricIndex: number;
    /**
     * Y軸偏移
     * 
     * @type {number}
     * @memberOf InlineLyricState
     */
    TranslateY: number;
}

/**
 * 行内歌词显示控件
 *
 * @export
 * @class InlineLyric
 * @extends {React.Component}
 */
export class InlineLyric extends BaseComponent<InlineLyricProps, InlineLyricState> {
    constructor(props: InlineLyricProps) {
        super(props);
        this.state = {
            CurrentLyricIndex: 0,
            TranslateY: 0,
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps: InlineLyricProps) {
        if (this.props.CurrentTime !== nextProps.CurrentTime) {
            this.RollingLyric(nextProps.CurrentTime, nextProps.Lyric);
        }
    }

    /**
     * 滚动显示歌词
     *
     *
     * @memberOf InlineLyric
     */
    RollingLyric(currentTime: number, lyric: Lyric[]) {
        let currentLyricIndex = 0;
        for (let i = 0; i < lyric.length; i++) {
            // 当前播放时刻在上一句歌词的时刻和下一句歌词的时刻区间内。就应该显示当前时刻的歌词
            if (currentTime >= lyric[i].Time &&
                (!lyric[i + 1] || currentTime < lyric[i + 1].Time)) {
                currentLyricIndex = i;
                break;
            }
        }

        this.setState({
            TranslateY: -((currentLyricIndex) * 18),
            CurrentLyricIndex: currentLyricIndex,
        });
    }

    render() {
        return (
            <div className='inline-lyric-wrapper'>
                <div
                    className='lyric-wrapper'
                    style={{
                        WebkitTransform: `translateY(${this.state.TranslateY}px)`,
                        transform: `translateY(${this.state.TranslateY}px)`,
                    }}
                >
                    {
                        (this.props.Lyric).map((lyric, index) => {
                            return (
                                <div
                                    className='lyric-text'
                                    key={index} style={{
                                        opacity: this.state.CurrentLyricIndex === index ? 1 : 0.4,
                                    }}>
                                    {lyric.Paragraph}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
