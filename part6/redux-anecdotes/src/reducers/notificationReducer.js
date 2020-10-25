let timeoutHandle

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const notificationChange = (notification, sec = 5) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })

        clearTimeout(timeoutHandle)

        timeoutHandle = setTimeout(() => {
            dispatch(removeNotification())
        }, sec * 1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        notification: ''
    }
}

export default notificationReducer
