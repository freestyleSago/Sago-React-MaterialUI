import * as defaultCoverImage from './default.jpg';

/**
 * 音频模型
 * 
 * @export
 * @class Audio
 */
export class Audio {
    constructor(title: string = '暂无歌曲', artists: string[] = ['佚名'], lyric: string = '', coverImage: any = defaultCoverImage, url: string = '', duration: number = 0, skipTimespans: SkipTimespan[] = []) {
        this.Title = title;
        this.Artists = artists;
        this.Lyric = lyric;
        this.CoverImage = coverImage;
        this.Url = url;
        this.Duration = duration;
        this.SkipTimespan = skipTimespans;
    }
    /**
     * 音频名
     * 
     * @type {string}
     * @memberOf Audio
     */
    Title: string;

    /**
     * 音频创作者名数组
     * 
     * @type {string[]}
     * @memberOf Audio
     */
    Artists: string[];

    /**
     * 歌词
     * 
     * @type {string}
     * @memberOf Audio
     */
    Lyric: string;

    /**
     * 封面图片url
     * 
     * @type {string}
     * @memberOf Audio
     */
    CoverImage: string;

    /**
     * 音频Url
     * 
     * @type {string}
     * @memberOf Audio
     */
    Url: string;

    /**
     * 音频时长
     * 
     * @type {number}
     * @memberOf Audio
     */
    Duration: number;

    /**
     * 音频跳跃播放时刻区间
     * 
     * @type {SkipTimespan[]}
     * @memberOf Audio
     */
    SkipTimespan: SkipTimespan[];
}


/**
 * 歌词模型
 * 
 * @export
 * @class Lyric
 */
export class Lyric {
    constructor(time: number, paragraph: string) {
        this.Time = time;
        this.Paragraph = paragraph;
    }

    /**
     * 时刻
     * 
     * @type {number}
     * @memberOf Lyric
     */
    Time: number;

    /**
     * 歌词内容
     * 
     * @type {string}
     * @memberOf Lyric
     */
    Paragraph: string;
}


/**
 * 跳跃播放区间模型
 * 
 * @export
 * @class SkipTimespan
 */
export class SkipTimespan {
    constructor(enteringTime: number, endingTime: number) {
        this.EnteringTime = enteringTime;
        this.EndingTime = endingTime;
    }

    /**
     * 进入时刻
     * 
     * @type {number}
     * @memberOf SkipTimespan
     */
    EnteringTime: number;

    /**
     * 退出时刻
     * 
     * @type {number}
     * @memberOf SkipTimespan
     */
    EndingTime: number
}