import React from 'react'
import {
  Chip,
  FloatingActionButton,
  Paper,
  TextField,
  Toggle
} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { styles } from './content-editor-styles'

export const MetadataEditor = (props) => {
  const {
    title,
    description,
    draft,
    tags,
    onTagAdd,
    onTagDelete
  } = props

  const tagChips = (tags || []).map((tag) => {
    return (
      <Chip
        key={tag}
        style={styles.chip}
        onRequestDelete={() => onTagDelete(tag)}>
        {tag}
      </Chip>
    )
  })

  return (
    <Paper style={styles.metadataContainer} zDepth={3}>
      <TextField
        hintText='Title'
        fullWidth
        value={title} />
      <div style={styles.rowTwoMeta}>
        <TextField
          hintText='Description (optional)'
          fullWidth
          value={description || ''} />
      </div>
      <div style={styles.chipRow}>
        <div style={styles.draft.wrapper}>
          <Toggle
            style={styles.draft.toggle}
            label='Draft'
            labelPosition='left'
            toggled={draft}/>
        </div>
        {tagChips}
        <FloatingActionButton
          mini secondary zDepth={3} onTouchTap={onTagAdd}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </Paper>
  )
}
