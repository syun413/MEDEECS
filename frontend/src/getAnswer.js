const { spawn } = require('child_process')
const getAnswer=(targetText,position)=>{
    //const pythonProcess = spawn('python', ['demo.py','This is a demo text AB',5])
    const pythonProcess = spawn('python', 
        ['../../backend/demo.py',targetText,position,
            "--adam_path","../../backend/cache/valid_adam.txt",
            "--model_ckpt","../../backend/models/electra_pretrained.pt"])
    pythonProcess.stdin.write('AB')
    pythonProcess.stdin.end()
    pythonProcess.stdout.on('data', data => {
        // The data returned from the Python script will be available here
        // You can parse it using JSON.parse() if necessary
        //const result = JSON.parse(data)
        console.log(data.toString('utf8'))
        return data.toString('utf8')
        //res.send({ answer: result })
    })
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
}
//getAnswer('AB',0)
export default getAnswer