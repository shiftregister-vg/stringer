import React from 'react'
import classnames from 'classnames'

const Logo = (props) => {
  let p = {...props}
  const { sm, md, lg, xl, xxl } = p

  delete p.sm
  delete p.md
  delete p.lg
  delete p.xl
  delete p.xxl

  const classes = classnames('stringer-logo', {
    sm: sm,
    md: md,
    lg: lg,
    xl: xl,
    xxl: xxl
  })

  return (
    <div className={classes} {...p}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Logo
