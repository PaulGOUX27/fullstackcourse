const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});
    response.json(blogs);
})

blogRouter.post('/', async (request, response) => {
    if(!request.body.title || !request.body.url) {
        return response.status(400).end();
    }

    if(!request.body.likes) {
        request.body.likes = 0;
    }

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        ...request.body,
        user: user._id
    })

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const blog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true })

    if(!blog){
        res.status(404).end()
    }

    res.status(200).json(blog);
});

module.exports = blogRouter
