const express = require('express');
const axios = require('axios')
const cors = require('cors');
const { randomBytes } = require('crypto');


const app = express();

const posts = {};
app.use(cors())
app.use(express.json());
app.get("/posts", (req, res) => {
    res.send(posts);
})

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch((err) => {
        console.log(err.message)
    })
    res.status(201).send(posts[id]);
})

app.post("/events", (req, res) => {
    console.log("Recieved Event : ",req.body.type)
    res.send({message : "Recieved Event"})

})


app.listen(4000, () => {
    console.log("listening on port 4000")
})