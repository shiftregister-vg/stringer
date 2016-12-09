const editorFrameStyles = {
  frame: {
    display: 'flex',
    padding: 7,
    position: 'absolute',
    top: 65,
    right: 0,
    left: 0,
    bottom: 0
  },
  fileTree: {
    width: 300,
    marginRight: 7,
    padding: 0,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    display: 'block'
  },
  treebeard: {
    tree: {
      base: {
        listStyle: 'none',
        backgroundColor: 'white',
        margin: 0,
        padding: 0,
        color: 'black',
        fontFamily: 'lucida grande,tahoma,verdana,arial,sans-serif',
        fontSize: 14
      },
      node: {
        base: {
          position: 'relative'
        },
        link: {
          cursor: 'pointer',
          position: 'relative',
          padding: '0px 5px',
          display: 'block'
        },
        activeLink: {
          background: '#00ADF7'
        },
        toggle: {
          base: {
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: -5,
            height: 24,
            width: 24
          },
          wrapper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-7px 0 0 -7px',
            height: 14
          },
          height: 14,
          width: 14,
          arrow: {
            fill: 'black',
            strokeWidth: 0
          }
        },
        header: {
          base: {
            display: 'inline-block',
            verticalAlign: 'top',
            color: 'black'
          },
          connector: {
            width: 2,
            height: 12,
            borderLeft: 'solid 2px black',
            borderBottom: 'solid 2px black',
            position: 'absolute',
            top: 0,
            left: -21
          },
          title: {
            lineHeight: 24,
            verticalAlign: 'middle'
          }
        },
        subtree: {
          listStyle: 'none',
          paddingLeft: 19
        },
        loading: {
          color: '#E2C089'
        }
      }
    }
  }
}

export default editorFrameStyles
