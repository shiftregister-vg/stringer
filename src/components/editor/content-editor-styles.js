export const styles = {
  contentEditor: {
    position: 'absolute',
    top: 7,
    right: 7,
    left: 214,
    bottom: 7
  },
  toolbar: {
    position: 'fixed',
    left: 214,
    right: 7,
    zIndex: 99
  },
  wrapper: {
    position: 'relative',
    top: 55,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 7
  },
  editor: {
    position: 'absolute',
    top: 207,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    overflow: 'auto'
  },
  metadataContainer: {
    height: 200,
    position: 'relative',
    top: 0,
    right: 0,
    left: 0,
    padding: 7
  },
  rowTwoMeta: {
    display: 'flex'
  },
  chipRow: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'flex-start',
    flexWrap: 'wrap',
    height: 50,
    maxHeight: 50
  },
  draft: {
    wrapper: {
      maxWidth: 250,
      marginRight: 7
    },
    toggle: {
      display: 'flex',
      alignItems: 'center'
    }
  },
  chip: {
    marginRight: 3
  }
}
