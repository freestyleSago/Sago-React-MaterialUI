export class Audio {
    Title: string;
    Artists: string[];
    Lyric: string[];
    CoverImage: string;
    Url: string;
    Duration: number;
    SkipTimespan: SkipTimespan[];
}

export class Lyric {
    Time: number;
    Paragraph: string;
}

export class SkipTimespan {
    EnteringTime: number;
    EndingTime: number
}