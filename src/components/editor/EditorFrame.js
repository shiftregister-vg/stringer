import React from 'react'
import { Paper } from 'material-ui'

const styles = {
  frame: {
    display: 'flex',
    padding: '7px',
    position: 'absolute',
    top: '65px',
    right: 0,
    left: 0,
    bottom: 0
  },
  fileTree: {
    width: '300px',
    marginRight: '7px',
    padding: '7px'
  },
  editor: {
    width: '100%',
    padding: '7px'
  }
}

const EditorFrame = (props) => {
  const { project } = props
  if (project.path === '') return <div/>
  return (
    <div style={styles.frame}>
      <Paper style={styles.fileTree} zDepth={3}>
        {project.name} file tree
      </Paper>

      <Paper style={styles.editor} zDepth={3}>
        Editor with tabs
      </Paper>
    </div>
  )
}

export default EditorFrame
