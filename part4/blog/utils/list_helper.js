const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((n, {likes}) => n + likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.sort((blog_a, blog_b) => blog_b.likes - blog_a.likes)[0];
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}
