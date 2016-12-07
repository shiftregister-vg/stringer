import React from 'react'
import { Dialog, FlatButton } from 'material-ui'

const NewFileDialog = (props) => {
  return (
    <Dialog
      title='Create New File'
      modal={false}
      open={props.open}
      onRequestClose={props.onRequestClose}>

      Create new content...

    </Dialog>
  )
}

export default NewFileDialog
