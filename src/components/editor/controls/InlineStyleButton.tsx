import * as React from "react";
import {
    Button,
} from 'material-ui';
import { EditorState } from "draft-js";
import { Delete } from 'material-ui-icons';

export interface InlineStyleButtonProps {
    /**
     * 图标
     * 
     * @type {typeof SvgIcon}
     * @memberof InlineStyleButtonProps
     */
    Icon: any;
    /**
     * 是否激活状态
     * 
     * @type {boolean}
     * @memberof InlineStyleButtonProps
     */
    IsActive?: boolean;
    /**
     * 激活状态前景色
     * 
     * @type {string}
     * @memberof InlineStyleButtonProps
     */
    ActiveColor?: string;
    /**
     * 未激活状态前景色
     * 
     * @type {string}
     * @memberof InlineStyleButtonProps
     */
    UnActiveColor?: string;
    /**
     * 热键
     * 
     * @type {string}
     * @memberof InlineStyleButtonProps
     */
    Hotkey?: string;
    /**
     * Click事件
     * 
     * @memberof InlineStyleButtonProps
     */
    Click: () => EditorState;
    /**
     * ChangeState事件
     * 
     * @memberof InlineStyleButtonProps
     */
    ChangeState: (editorState: EditorState) => void;
}

export interface InlineStyleButtonState {
}

export class InlineStyleButton extends React.Component<InlineStyleButtonProps, InlineStyleButtonState> {
    public static defaultProps: Partial<InlineStyleButtonProps> = {
        IsActive: false,
        ActiveColor: '#000000',
        UnActiveColor: '#928F8F',
    };

    constructor(props: InlineStyleButtonProps) {
        super(props);

        this.state = {
        };
    }
    render() {
        return <Button
            style={{
                minWidth: 36,
            }}
            onClick={() => {
                this.props.ChangeState(this.props.Click());
            }}
        >
            <Delete />
        </Button>;
    }
}