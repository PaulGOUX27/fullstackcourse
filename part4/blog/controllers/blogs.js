const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(!blog.title || !blog.url) {
        response.status(400).end();
    }

    if(!blog.likes) {
        blog.likes = 0;
    }

    const result = await blog.save();
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
