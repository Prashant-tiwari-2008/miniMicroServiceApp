const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

const posts = {};
app.get("/post", (req, res) => {
    res.send(posts)
})

function hanleEvent(type, data) {
    if (type == "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
        console.log("post created successfully")
    };

    if (type == "CommentCreated") {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status })
        console.log("comment created successfully")
    }

    if (type == "CommentModerated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;
        comment.content = content;
    }
}

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    
    res.status(200).json({
        "message": `${req.body.type} successfully`
    })
})

app.listen(4002, async () => {
    console.log("server is listening at port no 4002");
    try {
        const res = await axios.get("http://localhost:4005/event");
        for (let event of res.data) {
            console.log("Processing event :", event.type);
            hanleEvent(event.type, event.data)
        }
    } catch (error) {

    }
})