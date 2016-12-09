import React, { Component } from 'react'
import { Paper } from 'material-ui'
import { Treebeard } from 'react-treebeard'
import editorFrameStyles from './editor-frame-styles'
import ContentEditor from './content-editor'

const EditorFrame = (props) => {
  const {
    project,
    onToggle,
    openFile,
    editorState,
    save,
    contentDirty,
    onEditorChange,
    contentMetaData,
    onTagDelete,
    onTagAdd
  } = props

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

      <ContentEditor
        editorState={editorState}
        contentMetaData={contentMetaData}
        dirty={contentDirty}
        save={save}
        onChange={onEditorChange}
        onTagDelete={onTagDelete}
        onTagAdd={onTagAdd}/>

    </div>
  )
}

export default EditorFrame
