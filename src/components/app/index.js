import React from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { AppBar } from 'material-ui'
import DefaultTheme from '../../themes/stringer-default'
import Logo from '../logo'
import { MainLeftDrawer } from '../navigation'
import NewFileDialog from '../new-file-dialog'
import { EditorFrame } from '../editor'

const styles = {
  app: {
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'fixed'
  },
  logo: {
    cursor: 'pointer'
  },
  title: {
    cursor: 'pointer'
  },
  editor: {
    marginTop: '60px'
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedProjectPath: null,
      project: {path: '', name: ''},
      menuOpen: false,
      newFileDialogOpen: false,
      browseForProjectDialogOpen: false
    }

    this.openLeftMenu = this.openLeftMenu.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.handleRequestChange = this.handleRequestChange.bind(this)
    this.handleCreateNewFile = this.handleCreateNewFile.bind(this)
    this.handleOpenAProject = this.handleOpenAProject.bind(this)
    this.handleNewFileDialogRequestClose = this.handleNewFileDialogRequestClose.bind(this)
    this.handleProjectDirectorySelected = this.handleProjectDirectorySelected.bind(this)
  }

  componentDidMount() {
    // ipc event handlers
    ipcRenderer.on('create-new-file', this.handleCreateNewFile)
    ipcRenderer.on('project-directory-selected', this.handleProjectDirectorySelected)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('create-new-file', this.handleCreateNewFile)
    ipcRenderer.removeListener('project-directory-selected', this.handleProjectDirectorySelected)
  }

  handleCreateNewFile() {
    let {newFileDialogOpen, browseForProjectDialogOpen} = this.state
    if (!newFileDialogOpen && !browseForProjectDialogOpen) {
      this.setState({newFileDialogOpen: true})
    }
  }

  handleOpenAProject() {
    let {newFileDialogOpen, browseForProjectDialogOpen} = this.state
    if (!newFileDialogOpen && !browseForProjectDialogOpen) {
      ipcRenderer.send('open-a-project')
      this.setState({browseForProjectDialogOpen: true})
    }
  }

  handleProjectDirectorySelected(event, directoryPath) {
    this.setState({
      browseForProjectDialogOpen: false,
      selectedProjectPath: directoryPath,
      project: {
        path: directoryPath,
        name: this.getProjectName(directoryPath)
      }
    })
    this.closeDrawer()
  }

  handleNewFileDialogRequestClose(event) {
    this.setState({newFileDialogOpen: false})
    this.closeDrawer()
  }

  openLeftMenu() {
    this.setState({menuOpen: true})
  }

  closeDrawer() {
    this.setState({menuOpen: false})
  }

  handleRequestChange(menuOpen) {
    this.setState({menuOpen})
  }

  getProjectName(path) {
    if (path === '') return ''
    const parts = path.split('/')
    return parts[parts.length - 1]
  }

  render() {
    const logo = <Logo md style={styles.logo} />

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(DefaultTheme)}>
        <div style={styles.app}>
          <MainLeftDrawer
            open={this.state.menuOpen}
            onRequestChange={this.handleRequestChange}
            onCreateNewFile={this.handleCreateNewFile}
            onOpenProject={this.handleOpenAProject}/>

          <AppBar
            title='Stringer'
            titleStyle={styles.title}
            iconElementLeft={logo}
            onLeftIconButtonTouchTap={this.openLeftMenu}
            onTitleTouchTap={this.openLeftMenu}
            style={styles.appBar} />

          <NewFileDialog
            open={this.state.newFileDialogOpen}
            onRequestClose={this.handleNewFileDialogRequestClose} />

          <EditorFrame project={this.state.project} />
        </div>
      </MuiThemeProvider>
    )
  }
}
