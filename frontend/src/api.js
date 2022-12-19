import axios from 'axios'
import getAnswer from './getAnswer'
/*const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})*/

export default {
    getAnswer: (targetText, position) => {
        const pythonProcess = spawn('python', ['../../backend/demo.py'])
        pythonProcess.stdin.write(position,targetText)
        pythonProcess.stdin.end()
        pythonProcess.stdout.on('data', data => {
            // The data returned from the Python script will be available here
            // You can parse it using JSON.parse() if necessary
            const result = JSON.parse(data)
            res.send({ answer: result })
        })
        /*const payload = instance.get('/getAnswer'
            , { headers: {
                'Access-Control-Allow-Origin': '*',
              },params: { position: position, targetText: targetText } })
        return payload*/
        //const fakeReturn=["free oxygen radicals",0.9
        //      ,"functional residual capacity",0.1]
        //return fakeReturn
    }
}