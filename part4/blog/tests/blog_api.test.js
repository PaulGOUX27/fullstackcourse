const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
}, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
}, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}, {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
}, {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
}, {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}]

beforeEach(async () => {
    await Blog.deleteMany({})

    const noteObjects = initialBlogs
        .map(note => new Blog(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

describe('viewing all blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('blog identifier name is id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "I'm speed",
            author: "Tomas",
            url: "tomas.fi",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(
            'I\'m speed'
        )
    })

    test('a blog without likes can be added and likes is equal to 0', async () => {
        const newBlog = {
            title: "I'm speed",
            author: "Tomas",
            url: "tomas.fi",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.find(blog => blog.title === "I'm speed").likes).toEqual(0)
    })

    test('a blog without title cannot be added', async () => {
        const newBlog = {
            author: "Tomas",
            url: "tomas.fi",
            likes: 69
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('a blog without url cannot be added', async () => {
        const newBlog = {
            title: "I'm speed",
            author: "Tomas",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deleting a blog', () => {
    test('delete a blog return 204', async () => {
        const blogToDelete = initialBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        const blogs = response.body
        expect(blogs).toHaveLength(initialBlogs.length - 1)

        const titles = blogs.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('delete a blog whose id does not exist return 204', async () => {
        await api
            .delete('/api/blogs/5f8353a947448605a461626e')
            .expect(204)

        const response = await api.get('/api/blogs')
        const blogs = response.body
        expect(blogs).toHaveLength(initialBlogs.length)
    })
})

describe('editing a blog', () => {
    test('update a blog return 200', async () => {
        let response = await api
            .put(`/api/blogs/${initialBlogs[0]._id}`)
            .send({
                title: "I'm speed",
                author: "Tomas",
                url: "tomas.fi",
                likes: 69,
            })
            .expect(200)

        expect(response.body.title).toEqual("I'm speed")

        response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(initialBlogs.length)
        expect(titles).toContain(
            'I\'m speed'
        )
    })

    test('update a blog whose id does not exist return 404', async () => {
        await api
            .put('/api/blogs/5f8353a947448605a461626e')
            .send({
                title: "I'm speed",
                author: "Tomas",
                url: "tomas.fi",
                likes: 69,
            })
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
