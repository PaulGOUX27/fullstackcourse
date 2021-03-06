import React from 'react'
import {useSelector} from "react-redux";

const Notification = () => {
    const notification = useSelector(state => {
        console.log(state.notification)
        return state.notification
    })
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    if (!notification) return (<></>)

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification
