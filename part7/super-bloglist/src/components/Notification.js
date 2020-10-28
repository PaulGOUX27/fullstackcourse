import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => {
        return state.notification
    })

    if (!notification) return (<></>)

    return (
        <Alert id="notification" className={notification.type}>
            {notification.message}
        </Alert>
    )
}

export default Notification
