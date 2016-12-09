import React from 'react'
import {
  IconButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from 'material-ui'

// svg icons
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

import { styles } from './content-editor-styles'

export const EditorToolbar = (props) => {
  return (
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup firstChild>
        <IconButton
          onTouchTap={props.onBoldClick}
          tooltip='Bold'
          tooltipPosition='top-left'>
          <FormatBold />
        </IconButton>
        <IconButton
          onTouchTap={props.onUnderlineClick}
          tooltip='Underline'
          tooltipPosition='top-left'>
          <FormatUnderlined />
        </IconButton>
        <IconButton
          onTouchTap={props.onItalicClick}
          tooltip='Italic'
          tooltipPosition='top-left'>
          <FormatItalic />
        </IconButton>

        <ToolbarSeparator />

        <IconButton
          tooltip='Bullet list'
          tooltipPosition='top-left'>
          <FormatListBulleted />
        </IconButton>
        <IconButton
          tooltip='Numbered list'
          tooltipPosition='top-left'>
          <FormatListNumbered />
        </IconButton>

        <ToolbarSeparator />

        <IconButton
          tooltip='Code'
          tooltipPosition='top-left'>
          <Code />
        </IconButton>
        <IconButton
          tooltip='Link'
          tooltipPosition='top-left'>
          <InsertLink />
        </IconButton>
        <IconButton
          tooltip='Image'
          tooltipPosition='top-left'>
          <InsertPhoto />
        </IconButton>
        <IconButton
          tooltip='Video'
          tooltipPosition='top-left'>
          <OndemandVideo />
        </IconButton>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarSeparator />
        <IconButton
          tooltip='Save'
          tooltipPosition='top-left'>
          <Save />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>
  )
}
