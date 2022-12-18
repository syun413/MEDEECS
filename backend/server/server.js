const express = require('express')
const { spawn } = require('child_process')
const app = express()
var cors = require('cors')
app.use(cors())
app.get('/api/getAnswer', (req, res) => {
    const { position, targetText } = req.query
    const pythonProcess = spawn('python', ['demo.py'])
    pythonProcess.stdin.write(JSON.stringify({ position, targetText }))
    pythonProcess.stdin.end()
    pythonProcess.stdout.on('data', data => {
        // The data returned from the Python script will be available here
        // You can parse it using JSON.parse() if necessary
        const result = JSON.parse(data)
        res.send({ answer: result })
    })
})
const port=process.env.PORT ||4000
app.listen(port, () => {
    console.log('Express server listening on port 4000')
})