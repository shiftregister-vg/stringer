import React from 'react'
import { Divider, Drawer, MenuItem, Subheader } from 'material-ui'
import Add from 'material-ui/svg-icons/content/add'
import Build from 'material-ui/svg-icons/action/build'
import FolderOpen from 'material-ui/svg-icons/file/folder-open'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Settings from 'material-ui/svg-icons/action/settings'

export const MainLeftDrawer = (props) => {
  return (
    <Drawer docked={false} {...props}>
      <Subheader>Hugo</Subheader>

      <MenuItem onTouchTap={props.onCreateNewFile} leftIcon={<Add />}
                secondaryText='&#8984;N'>
        New File
      </MenuItem>

      <MenuItem onTouchTap={props.onOpenProject} leftIcon={<FolderOpen />}
                secondaryText='&#8984;O'>
        Open Project
      </MenuItem>

      <MenuItem onTouchTap={props.onMenuItemClick} leftIcon={<Build />}
                secondaryText='&#8679;&#8984;B'>
        Build Project
      </MenuItem>

      <MenuItem onTouchTap={props.onMenuItemClick} leftIcon={<Refresh />}>
        Restart Preview Server
      </MenuItem>

      <Divider />

      <Subheader>Recent Projects</Subheader>

      <Divider />

        <MenuItem onTouchTap={props.onMenuItemClick} leftIcon={<Settings />}
                  secondaryText='&#8984;,'>
          Preferences
        </MenuItem>

    </Drawer>
  )
}
