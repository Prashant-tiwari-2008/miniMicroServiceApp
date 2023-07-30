const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(data.content,"content");
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log("status",status)
        await axios.post('http://localhost:4005/events', {
            type : "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
    return res.status(200).json({"message" : "moderation called"})
})



app.listen(4008, () => {
    console.log('app is listing at port 4008')
})
