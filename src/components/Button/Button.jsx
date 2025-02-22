import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames';

function Button({ content, isPrimary }) {
  const { button, buttonPrimary, buttonGreen } = styles;
  return (
    <div className={classNames(button, {
      [buttonPrimary]: isPrimary,
      [buttonGreen]: !isPrimary
    })}>{content}</div>
  )
}

export default Button