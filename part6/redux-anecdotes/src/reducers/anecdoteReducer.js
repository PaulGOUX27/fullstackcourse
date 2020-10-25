import anecdotesService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            return state.map(a =>
                a.id !== id ? a : action.data
            )
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const voteFor = (anecdote) => {
    return async dispatch => {
        const modifiedAnecdote = await anecdotesService.modify({...anecdote, votes: anecdote.votes + 1})
        dispatch({
                type: 'VOTE',
                data: modifiedAnecdote
            }
        )
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }


}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

export default anecdoteReducer
