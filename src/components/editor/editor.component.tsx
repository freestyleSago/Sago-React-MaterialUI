import * as React from 'react';
import { IPropsBase, IStateBase, BaseComponent } from '../base-component';
import { MuiThemeProvider, darkBaseTheme } from 'material-ui/styles';
import { Editor, EditorProps, EditorState, EditorBlock, DraftHandleValue, RichUtils, DraftEditorCommand, getDefaultKeyBinding } from 'draft-js';
import { HorizontalAlignment, VerticalAlignment } from '../../common/enums/alignment';
import {
    FlatButton,
    SvgIcon,
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
} from 'material-ui';
import {
    EditorFormatAlignRight,
    EditorFormatBold,
    EditorFormatItalic,
    EditorFormatUnderlined,
    ContentRedo,
    ContentUndo,
} from 'material-ui/svg-icons';
import { fullWhite } from 'material-ui/styles/colors';
import { InlineStyleButton } from './controls/InlineStyleButton';


/**
 * 编辑器Props类型定义
 * 
 * @export
 * @interface MDEditorProps
 * @extends {IPropsBase}
 */
export interface MDEditorProps {
    Placeholder?: string,
}

/**
 * 编辑器State类型定义
 * 
 * @export
 * @interface MDEditorState
 * @extends {IStateBase}
 */
export interface MDEditorState {
    EditorState: EditorState,
}

/**
 * 编辑器
 * 
 * @export
 * @class MDEditor
 * @extends {BaseComponent<MDEditorProps, MDEditorState>}
 */
export class MDEditor extends React.Component<MDEditorProps, MDEditorState> {
    static defaultProps: Partial<MDEditorProps> = {
        Placeholder: '',
    }

    constructor(props: MDEditorProps) {
        super(props);
        this.state = {
            EditorState: EditorState.createEmpty(),
        };
    }

    /**
     * 编辑器内容发生改变方法
     * 
     * @private
     * @param {EditorState} editorState 
     * @memberof MDEditor
     */
    private ChangeState(editorState: EditorState): void {
        this.setState({ EditorState: editorState });
    }

    /**
     * 快捷键映射处理
     * 
     * @private
     * @param {*} command 
     * @param {EditorState} editorState 
     * @returns {DraftHandleValue} 
     * @memberof MDEditor
     */
    private HandleHotkey(command: any, editorState: EditorState): DraftHandleValue {
        const newState = RichUtils.handleKeyCommand(this.state.EditorState, command);
        if (newState) {
            this.ChangeState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    /**
     * 生成toolbar按钮
     * 
     * @private
     * @param {typeof SvgIcon} icon 
     * @param {() => void} clickHandler 
     * @param {React.CSSProperties} [style={ minWidth: 36 }] 
     * @returns {React.ReactElement<FlatButton>} 
     * @memberof MDEditor
     */
    private GenerateToolbarButton(icon: typeof SvgIcon, clickHandler: () => void, style: React.CSSProperties = { minWidth: 36 }): any {
        // return <FlatButton
        //     style={style}
        //     icon={React.createElement(icon, { hoverColor: fullWhite })}
        //     hoverColor='#2E2E2E'
        //     onClick={clickHandler.bind(this)}
        // />;
        return;
    }

    /**
     * 生成toolBar
     * 
     * @private
     * @returns {*} 
     * @memberof MDEditor
     */
    private GenerateToolbar(): any {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={false}>
                    <InlineStyleButton
                        Icon={ContentUndo}
                        ChangeState={this.ChangeState.bind(this)}
                        Click={() => EditorState.undo(this.state.EditorState)} />
                    <InlineStyleButton
                        Icon={ContentRedo}
                        ChangeState={this.ChangeState.bind(this)}
                        Click={() => EditorState.redo(this.state.EditorState)} />
                    <ToolbarSeparator />
                </ToolbarGroup>
                <ToolbarGroup>
                    <InlineStyleButton
                        Icon={EditorFormatBold}
                        ChangeState={this.ChangeState.bind(this)}
                        Click={() => RichUtils.toggleInlineStyle(this.state.EditorState, "BOLD")}
                    />
                </ToolbarGroup>
            </Toolbar>
        );
    }

    // private FormatSelectionStyle(): void {
    //     debugger;
    //     let DraftInlineStyle = this.state.EditorState.getCurrentInlineStyle()
    //     this.ChangeState(RichUtils.toggleInlineStyle(
    //         this.state.EditorState,
    //         "BOLD"
    //     ));
    // }

    render() {
        return (
            <MuiThemeProvider>
                <div className='editor-wrapper'
                    style={{
                        width: '100%',
                        height: '100%',
                    }}>
                    {this.GenerateToolbar()}

                    <Editor
                        placeholder={this.props.Placeholder}
                        editorState={this.state.EditorState}
                        handleKeyCommand={this.HandleHotkey.bind(this)}
                        onChange={this.ChangeState.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}