import React from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { AppBar } from 'material-ui'
import { ContentState, EditorState } from 'draft-js'
import marked from 'marked'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToMarkdown } from 'draft-js-export-markdown'
import YAML from 'yamljs'

import DefaultTheme from '../../themes/stringer-default'
import Logo from '../logo'
import { MainLeftDrawer } from '../navigation'
import NewFileDialog from '../new-file-dialog'
import { EditorFrame } from '../editor'

const styles = {
  app: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left:0,
    overflow: 'hidden'
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
      contentDirty: false,
      contentMetaData: {
        title: '',
        description: '',
        tags: [],
        draft: true
      }
    }

    ipcRenderer.send('app-ready')
  }

  componentWillMount = () => {
    // ipc event handlers
    ipcRenderer.on('create-new-file', this.handleCreateNewFile)
    ipcRenderer.on('project-directory-selected', this.handleProjectDirectorySelected)
    ipcRenderer.on('file-opened', this.handleFileOpened)
  }

  componentWillUnmount = () => {
    ipcRenderer.removeAll()
  }

  handleCreateNewFile = () => {
    let {newFileDialogOpen, browseForProjectDialogOpen} = this.state
    if (!newFileDialogOpen && !browseForProjectDialogOpen) {
      this.setState({newFileDialogOpen: true})
    }
  }

  handleOpenAProject = () => {
    let {newFileDialogOpen, browseForProjectDialogOpen} = this.state
    if (!newFileDialogOpen && !browseForProjectDialogOpen) {
      ipcRenderer.send('open-a-project')
      this.setState({browseForProjectDialogOpen: true})
    }
  }

  handleProjectDirectorySelected = (event, directoryPath, contentTree) => {
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

  handleNewFileDialogRequestClose = (event) => {
    this.setState({newFileDialogOpen: false})
    this.closeDrawer()
  }

  openLeftMenu = () => {
    this.setState({menuOpen: true})
  }

  closeDrawer = () => {
    this.setState({menuOpen: false})
  }

  handleRequestChange = (menuOpen) => {
    this.setState({menuOpen})
  }

  getProjectName = (path) => {
    if (path === '') return ''
    const parts = path.split('/')
    return parts[parts.length - 1]
  }

  onFileTreeToggle = (node, toggled) => {
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

  handleFileOpened = (event, openFileContents) => {
    let contentMetaData
    const isYaml = openFileContents.startsWith('---')

    if (isYaml) {
      const contentParts = openFileContents.split('---')
      contentMetaData = YAML.parse(contentParts[1])
      openFileContents = contentParts[2]
    }

    let content = stateFromHTML(marked(openFileContents))
    this.setState({
      contentDirty: false,
      editorState: EditorState.createWithContent(content),
      contentMetaData
    })
  }

  handleEditorChange = (editorState) => {
    this.setState({editorState, contentDirty: true})
  }

  saveContent = () => {
    const { editorState } = this.state
    const markdown = stateToMarkdown(editorState.getCurrentContent())
    this.setState({contentDirty: false})
  }

  handleTagDelete = (label) => {
    let contentMetaData = this.state.contentMetaData
    const tagToDelete = contentMetaData.tags.indexOf(label)
    contentMetaData.tags.splice(tagToDelete, 1)
    this.setState({contentMetaData})
  }

  handleTagAdd = () => {
    // todo: open a dialog to collect tag info
  }

  handleNewTagWindowDone = (label) => {
    let contentMetaData = this.state.contentMetaData
    contentMetaData.tags.push(label)
    this.setState({contentMetaData})
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
            contentMetaData={this.state.contentMetaData}
            contentDirty={this.state.contentDirty}
            save={this.saveContent}
            onEditorChange={this.handleEditorChange}
            onTagDelete={this.handleTagDelete}
            onTagAdd={this.handleTagAdd} />
        </div>
      </MuiThemeProvider>
    )
  }
}
