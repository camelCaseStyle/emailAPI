const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const email = require('./email')
const server = app.listen(7080, ()=>{
    console.info(`Server listening on ${server.address().address}:${server.address().port}`)
})
app.use(bodyParser.json())

app.post('/sendEmail', (req, res) => {
    if(req.body){
        const message = {
            "from": req.body.from, 
            "to": req.body.to,
            "message": req.body.message, 
            "subject": req.body.subject, 
            "html": req.body.html
        }    
    }else{
        return res.send("Invalid request")
    }
    return email(message)
})

