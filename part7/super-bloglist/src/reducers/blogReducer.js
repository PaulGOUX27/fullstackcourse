import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'GET_BLOGS':
        return action.data
    case 'DELETE_BLOG':
        return state.filter((el) => el.id !== action.data.id)
    case 'VOTE_BLOG': {
        let votedBlog = action.data
        const newState = [...state]
        newState[state.findIndex((el) => el.id === votedBlog.id)] = votedBlog
        newState.sort(function (a, b) {
            return b.likes - a.likes
        })
        return newState
    }
    default:
        return state
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const getAllBlog = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'GET_BLOGS',
            data: blogs.sort(function (a, b) {
                return b.likes - a.likes
            })
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type: 'DELETE_BLOG',
            data: blog
        })
    }
}

export const voteBlog = (blog) => {
    return async dispatch => {
        const votedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
        dispatch({
            type: 'VOTE_BLOG',
            data: votedBlog
        })
    }
}

export default blogReducer
