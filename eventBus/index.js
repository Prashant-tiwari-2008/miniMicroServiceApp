const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const eventList = [];

app.post('/events', (req, res) => {
    console.log(req.body,"req")
    const events = req.body;
    eventList.push(events)
    axios.post('http://localhost:4000/events', events).catch((err) => { console.log(err.message) })
    axios.post('http://localhost:4001/events', events).catch((err) => { console.log(err.message) })
    axios.post('http://localhost:4002/events', events).catch((err) => { console.log(err.message) })
    axios.post('http://localhost:4008/events', events).catch((err) => { console.log(err.message) })

    res.send({ status: 'ok' })
});

app.get("/events",(req,res) =>{
    res.send(eventList);
})

app.listen(4005, () => {
    console.log('Listening on port 4005')
})