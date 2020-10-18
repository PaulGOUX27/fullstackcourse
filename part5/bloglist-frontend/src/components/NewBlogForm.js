import React from "react";

const NewBlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleNewLogin}) => (
<div>
    <form onSubmit={handleNewLogin}>
        <h2>Create new blog</h2>
        <div>
        Title :
        <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
        Author :
        <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
        Url :
        <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">Create</button>
    </form>
</div>
)

export default NewBlogForm;
