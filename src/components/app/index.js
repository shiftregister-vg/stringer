import React from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { AppBar, Drawer } from 'material-ui'
import DefaultTheme from '../../themes/stringer-default'
import Logo from '../logo'

const styles = {
  app: {
    width: '100%',
    height: '100%'
  },
  logo: {
    cursor: 'pointer'
  },
  title: {
    cursor: 'pointer'
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }

    this.openLeftMenu = this.openLeftMenu.bind(this)
  }

  openLeftMenu() {
    this.setState({menuOpen: true})
  }

  render() {
    const logo = <Logo md style={styles.logo} />

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(DefaultTheme)}>
        <div style={styles.app}>
          <Drawer
            docked={false}
            open={this.state.menuOpen}
            onRequestChange={(menuOpen) => this.setState({menuOpen})} />

          <AppBar
            title='Stringer'
            titleStyle={styles.title}
            iconElementLeft={logo}
            onLeftIconButtonTouchTap={this.openLeftMenu}
            onTitleTouchTap={this.openLeftMenu} />
        </div>
      </MuiThemeProvider>
    )
  }
}
