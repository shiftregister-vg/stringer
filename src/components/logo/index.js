import React from 'react'
import classnames from 'classnames'

const Logo = (props) => {
  let classes = classnames('stringer-logo', {
    sm: props.sm,
    md: props.md,
    lg: props.lg,
    xl: props.xl,
    xxl: props.xxl
  })

  return (
    <div className={classes} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Logo
