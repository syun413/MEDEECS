const http = require('http');
const { spawn } = require('child_process');

const pythonProcess = spawn('python3', ['demo.py']);

const server = http.createServer((req, res) => {
    if (req.url === '/api/getAnswer') {
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        const position = queryParams.get('position');
        const targetText = queryParams.get('targetText');

        let answer = '';
        pythonProcess.stdout.on('data', data => {
            answer += data;
        });

        pythonProcess.on('close', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(answer));
        });

        pythonProcess.stdin.write(JSON.stringify({ position, targetText }));
        pythonProcess.stdin.end();
    }
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});

/*
import sys
import json

# read the input from stdin
input_str = sys.stdin.read()

# parse the input as JSON
input_data = json.loads(input_str)

# extract the position and targetText parameters
position = input_data['position']
targetText = input_data['targetText']

# perform any logic or database queries needed to generate a response
response = {
  'answer': 'Some calculated answer based on the position and targetText parameters'
}

# write the response to stdout as JSON
sys.stdout.write(json.dumps(response))
*/