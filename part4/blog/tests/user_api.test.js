const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

initialUsers = [
    {
        username: "wola",
        passwordHash: "aRandomHash",
        name: "Test"
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('create new user', () => {
    test('with valid body should return 201', async () => {
        const newUser = {
            username: 'pgoux',
            password: 'bonjour',
            name: 'Paul GOUX'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        const users = await usersInDb()
        expect(users).toHaveLength(initialUsers.length + 1)
    })

    test('without name should return 201', async () => {
        const newUser = {
            username: 'pgoux',
            password: 'bonjour',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        const users = await usersInDb()
        expect(users).toHaveLength(initialUsers.length + 1)
    })

    test('without username should return 400', async () => {
        const newUser = {
            password: 'bonjour',
            name: 'Paul GOUX'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const users = await usersInDb()
        expect(users).toHaveLength(initialUsers.length)
    })

    test('without password should return 400', async () => {
        const newUser = {
            username: 'pgoux',
            name: 'Paul GOUX'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const users = await usersInDb()
        expect(users).toHaveLength(initialUsers.length)
    })

    test('with username.length < 3 should return 400', async () => {
        const newUser = {
            username: 'pg',
            password: 'bonjour',
            name: 'Paul GOUX'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const users = await usersInDb()
        expect(users).toHaveLength(initialUsers.length)
    })

    test('without password.length < 3 should return 400', async () => {
        const newUser = {
            username: 'pgoux',
            password: 'bo',
            name: 'Paul GOUX'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const users = await usersInDb()
        expect(users).toHaveLength(initialUsers.length)
    })

    test('without unique username should return 400', async () => {
        const newUser = {
            username: 'wola',
            password: 'bonjour',
        }

        // The other way don't work
        let users = await usersInDb()
        const previousLength = users.length

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        users = await usersInDb()
        expect(users).toHaveLength(previousLength)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
