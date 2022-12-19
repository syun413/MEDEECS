//new server temporaily developed by yoyo
import express from 'express'
import cors from 'cors'

const app=express()
app.use(cors())
const { spawn } = require('child_process')

app.get('/api/getAnswer',function(req,res,next){
    console.log(String(req.query.targetText))
    var targetText=String(req.query.targetText)
    var position=req.query.position
    const pythonProcess = spawn('python', ['demo.py',targetText,position])
    //pythonProcess.stdin.write(position,targetText)
    pythonProcess.stdin.end()
    pythonProcess.stdout.on('data', data => {
        // The data returned from the Python script will be available here
        // You can parse it using JSON.parse() if necessary
        const result = data.toString('utf8')
        console.log(result)
        res.send({ answer: result })
    })
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
})
const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log('server is up on port 4000')
})