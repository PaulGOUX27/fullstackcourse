import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

Notification.prototype = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification
