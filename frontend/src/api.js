import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export default {
    getAnswer: (targetText, position) => {
        const payload = instance.get('/getAnswer'
            , { headers: {
                'Access-Control-Allow-Origin': '*',
              },params: { position: position, targetText: targetText } })
        return payload
        //const fakeReturn=["free oxygen radicals",0.9
        //      ,"functional residual capacity",0.1]
        //return fakeReturn
    }
}