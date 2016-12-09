import React, { Component } from 'react'
import { Editor, RichUtils } from 'draft-js'
import { Paper } from 'material-ui'

import { styles } from './content-editor-styles'
import { MetadataEditor } from './metadata-editor'
import { EditorToolbar } from './editor-toolbar'

export default class ContentEditor extends Component {
  constructor(props) {
    super(props)
    this.autoSave()
  }

  autoSave = () => {
    if (this.props.dirty) {
      console.log('We should save and stuff...')
      this.props.save()
    }

    setTimeout(this.autoSave, 5000)
  }

  onChange = (editorState) => {
    this.props.onChange(editorState)
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  handleToolbarIconClick = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style))
  }

  onBoldClick = () => {
    this.handleToolbarIconClick('BOLD')
  }

  onUnderlineClick = () => {
    this.handleToolbarIconClick('UNDERLINE')
  }

  onItalicClick = () => {
    this.handleToolbarIconClick('ITALIC')
  }

  setFocus = () => {
    this.refs.editor.focus()
  }

  render() {
    const { editorState, contentMetaData, onTagDelete, onTagAdd } = this.props

    return (
      <div style={styles.contentEditor}>

        <MetadataEditor {...contentMetaData}
          onTagDelete={onTagDelete}
          onTagAdd={onTagAdd} />

        <Paper style={styles.editor} zDepth={3}>
          <EditorToolbar
            onBoldClick={this.onBoldClick}
            onUnderlineClick={this.onUnderlineClick}
            onItalicClick={this.onItalicClick} />

          <div style={styles.wrapper} onClick={this.setFocus}>
            <Editor
              ref='editor'
              editorState={editorState}
              spellCheck
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange} />
          </div>
        </Paper>
      </div>
    )
  }
}
