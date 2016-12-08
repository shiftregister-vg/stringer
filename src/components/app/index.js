import React from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { AppBar } from 'material-ui'
import { ContentState, EditorState } from 'draft-js'
import { stateFromMarkdown } from 'draft-js-import-markdown'


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
      project: {path: '', name: '', contentTree: {}},
      menuOpen: false,
      newFileDialogOpen: false,
      browseForProjectDialogOpen: false,
      openFile: null,
      editorState: EditorState.createEmpty(),
      contentDirty: false
    }

    this.openLeftMenu = this.openLeftMenu.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.handleRequestChange = this.handleRequestChange.bind(this)
    this.handleCreateNewFile = this.handleCreateNewFile.bind(this)
    this.handleOpenAProject = this.handleOpenAProject.bind(this)
    this.handleNewFileDialogRequestClose = this.handleNewFileDialogRequestClose.bind(this)
    this.handleProjectDirectorySelected = this.handleProjectDirectorySelected.bind(this)
    this.onFileTreeToggle = this.onFileTreeToggle.bind(this)
    this.handleFileOpened = this.handleFileOpened.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.saveContent = this.saveContent.bind(this)
  }

  componentWillMount() {
    // ipc event handlers
    ipcRenderer.on('create-new-file', this.handleCreateNewFile)
    ipcRenderer.on('project-directory-selected', this.handleProjectDirectorySelected)
    ipcRenderer.on('file-opened', this.handleFileOpened)
  }

  componentWillUnmount() {
    ipcRenderer.removeAll()
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

  handleProjectDirectorySelected(event, directoryPath, contentTree) {
    this.setState({
      browseForProjectDialogOpen: false,
      selectedProjectPath: directoryPath,
      project: {
        path: directoryPath,
        name: this.getProjectName(directoryPath),
        contentTree
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

  onFileTreeToggle(node, toggled){
    if(this.state.cursor){
      this.state.cursor.active = false
    }

    node.active = true

    if(node.children){
      node.toggled = toggled
    }

    let openFile = this.state.openFile
    if (node.extension){
      openFile = node
      ipcRenderer.send('open-file', node.path)
    }

    this.setState({ cursor: node, openFile });
  }

  handleFileOpened(event, openFileContents) {
    this.setState({
      contentDirty: false,
      editorState: EditorState.createWithContent(stateFromMarkdown(openFileContents))
    })
  }

  handleEditorChange(editorState) {
    this.setState({editorState, contentDirty: true})
  }

  saveContent() {
    console.log('Saving content')
    this.setState({contentDirty: false})
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

          <EditorFrame
            project={this.state.project}
            onToggle={this.onFileTreeToggle}
            openFile={this.state.openFile}
            editorState={this.state.editorState}
            contentDirty={this.state.contentDirty}
            save={this.saveContent}
            onEditorChange={this.handleEditorChange} />
        </div>
      </MuiThemeProvider>
    )
  }
}
