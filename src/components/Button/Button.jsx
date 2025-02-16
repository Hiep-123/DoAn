import React from 'react'
import styles from './styles.module.scss'
<<<<<<< HEAD
function Button({ content }) {
  const { button } = styles;
  return (
    <div className={button}>{content}</div>
=======
import classNames from 'classnames';
function Button({ content, isPrimary }) {
  const { button, buttonPrimary, buttonGreen } = styles;
  return (
    <div className={classNames(button, {
      [buttonPrimary]: isPrimary,
      [buttonGreen]: !isPrimary
    })}>{content}</div>
>>>>>>> 8d49d79 (update code section advanceHeadling)
  )
}

export default Button