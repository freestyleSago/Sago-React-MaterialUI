import * as React from 'react';
import {
    HorizontalAlignment,
    VerticalAlignment,
} from '../common/enums/alignment';

export interface IPropsBase {
    ContentHorizontalAlignment?: HorizontalAlignment,
    ContentVerticalAlignment?: VerticalAlignment,
    Width?: number | string,
    Height?: number | string,
    Border?: string,
    BorderRadius?: number | string,
}

export class IStateBase {

}

export class BaseComponent<T extends IPropsBase, K extends IStateBase> extends React.Component<T, K>  {
    public static defaultProps: Partial<IPropsBase> = {
        ContentHorizontalAlignment: HorizontalAlignment.Left,
        ContentVerticalAlignment: VerticalAlignment.Middle,
        Width: '100%',
        Height: '100%',
        Border: 'solid 1px black',
        BorderRadius: 6,
    }
    constructor(props: T) {
        super(props);
    }

    protected CalculateHorizontalAlignment(): "initial" | "inherit" | "unset" | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch" {
        switch (this.props.ContentHorizontalAlignment) {
            case HorizontalAlignment.Left:
                return 'flex-start';
            case HorizontalAlignment.Center:
                return 'center';
            case HorizontalAlignment.Right:
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }

    protected CalculateVerticalAlignment(): "initial" | "inherit" | "unset" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch" {
        switch (this.props.ContentVerticalAlignment) {
            case VerticalAlignment.Top:
                return 'flex-start';
            case VerticalAlignment.Middle:
                return 'center';
            case VerticalAlignment.Bottom:
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }
}