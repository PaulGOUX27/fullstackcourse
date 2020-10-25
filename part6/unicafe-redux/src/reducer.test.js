import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 2,
        bad: 4
    }

    test('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        deepFreeze(state)
        const newState = counterReducer(undefined, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 0
        })
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 2,
            bad: 4
        })
    })

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 2,
            bad: 5
        })
    })

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 3,
            bad: 4
        })
    })

    test('reset to initial state', () => {
        const action = {
            type: 'ZERO'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 0
        })
    })

    test('should return the same state when called with another action', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        deepFreeze(state)
        const newState = counterReducer(initialState, action)
        expect(newState).toEqual(initialState)
    })
})
