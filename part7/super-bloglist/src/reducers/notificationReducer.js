let timeoutHandle

const notificationReducer = (state = {}, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.notification
    default:
        return state
    }
}

export const successNotification = (message, sec = 5) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: {
                message,
                type: 'success'
            }
        })

        clearTimeout(timeoutHandle)

        timeoutHandle = setTimeout(() => {
            dispatch(removeNotification())
        }, sec * 1000)
    }
}

export const errorNotification = (message, sec = 5) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: {
                message,
                type: 'error'
            }
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
        notification: null
    }
}

export default notificationReducer
