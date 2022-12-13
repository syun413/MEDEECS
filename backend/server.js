const http = require('http');
const { spawn } = require('child_process');

const pythonScript = 'demo.py';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/getAnswer')) {
        // Get the position and targetText from the query parameters
        const position = req.query.position;
        const targetText = req.query.targetText;

        // Run the python script with the position and targetText as arguments
        const pythonProcess = spawn('python', [pythonScript, position, targetText]);

        pythonProcess.stdout.on('data', (data) => {
            // Send the data from the python script back to the code that called instance.get()
            res.write(data);
        });

        pythonProcess.on('close', (code) => {
            // End the response when the python script finishes executing
            res.end();
        });
    }
});
server.listen(4000);