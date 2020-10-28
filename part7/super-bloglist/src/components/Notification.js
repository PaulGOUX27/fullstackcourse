import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => {
        return state.notification
    })

    if (!notification) return (<></>)

    return (
        <div id="notification" className={notification.type}>
            {notification.message}
        </div>
    )
}

export default Notification
