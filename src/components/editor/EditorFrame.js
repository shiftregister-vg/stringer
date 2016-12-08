import React, { Component } from 'react'
import { Paper } from 'material-ui'
import { Treebeard } from 'react-treebeard'
import editorFrameStyles from './editorFrameStyles'
import ContentEditor from './content-editor'

const EditorFrame = (props) => {
  const { project, onToggle, openFile, editorState } = props
  if (project.path === '') {
    return <div/>
  }

  return (
    <div style={editorFrameStyles.frame}>
      <Paper style={editorFrameStyles.fileTree} zDepth={3}>
        <Treebeard
          data={project.contentTree}
          style={editorFrameStyles.treebeard}
          onToggle={onToggle} />
      </Paper>

      <Paper style={editorFrameStyles.editor} zDepth={3}>
        <ContentEditor
          editorState={editorState}
          dirty={props.contentDirty}
          save={props.save}
          onChange={props.onEditorChange} />
      </Paper>
    </div>
  )
}

export default EditorFrame
