import React, { Component } from 'react'
import { Editor, RichUtils } from 'draft-js'
import { IconButton, Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui'
import FormatBold from 'material-ui/svg-icons/editor/format-bold'
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined'
import FormatItalic from 'material-ui/svg-icons/editor/format-italic'
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo'
import InsertLink from 'material-ui/svg-icons/editor/insert-link'
import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered'
import Code from 'material-ui/svg-icons/action/code'
import OndemandVideo from 'material-ui/svg-icons/notification/ondemand-video'
import Save from 'material-ui/svg-icons/content/save'

const styles = {
  editor: {
    contentEditor: {
      // height: '100%'
    },
    wrapper: {
      padding: '7px',
      height: '100%',
      overflow: 'auto',
      whiteSpace: 'nowrap'
    }
  }
}

export default class ContentEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      autoSaveTimeout: 5000
    }

    this.autoSave = this.autoSave.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.onBoldClick = this.onBoldClick.bind(this)
    this.setFocus = this.setFocus.bind(this)

    this.autoSave()
  }

  autoSave() {
    // todo: implement saving and shiz
    if (this.props.dirty) {
      console.log('We should save and stuff...')
      this.props.save()
    }

    setTimeout(this.autoSave, 5000)
  }

  onChange(editorState) {
    this.props.onChange(editorState)
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'))
  }

  setFocus() {
    this.refs.editor.focus()
  }

  render() {
    const { editorState } = this.props
    return (
      <div
        style={styles.editor.contentEditor}
        onClick={this.setFocus}>
        <Toolbar>
          <ToolbarGroup firstChild>
            <IconButton onTouchTap={this.onBoldClick} tooltip='Bold'>
              <FormatBold />
            </IconButton>
            <IconButton>
              <FormatUnderlined />
            </IconButton>
            <IconButton>
              <FormatItalic />
            </IconButton>

            <ToolbarSeparator />

            <IconButton>
              <FormatListBulleted />
            </IconButton>
            <IconButton>
              <FormatListNumbered />
            </IconButton>

            <ToolbarSeparator />

            <IconButton>
              <Code />
            </IconButton>
            <IconButton>
              <InsertLink />
            </IconButton>
            <IconButton>
              <InsertPhoto />
            </IconButton>
            <IconButton>
              <OndemandVideo />
            </IconButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarSeparator />
            <IconButton>
              <Save />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <div style={styles.editor.wrapper} onClick={this.setFocus}>
          <Editor
            ref='editor'
            editorState={editorState}
            spellCheck
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange} />
        </div>
      </div>
    )
  }
}
