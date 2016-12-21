export const preProcessMarkdown = (projectRoot, markdownIn) => {
  let markdownOut = markdownIn

  console.log(`Need to set relative paths to absolute paths starting with ${projectRoot}`)

  markdownOut = processImages(projectRoot, markdownOut)

  return markdownOut
}

const processImages = (projectRoot, markdownIn) => {
  let markdownOut = markdownIn

  const pattern = /^(\!\[)(.+)(\]\()(.+)(\))$/gm
  markdownOut = markdownOut.replace(pattern, '<img src="file://' + projectRoot + '/static$4" alt="$2" />')

  console.log(markdownOut)

  return markdownOut
}
