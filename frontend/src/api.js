import axios from 'axios'
import getAnswer from './getAnswer'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export default {
    getAnswer: async (targetText, position) => {
        const payload = await instance.get('/getAnswer'
            , { headers: {
                'Access-Control-Allow-Origin': '*',
              },params: { position: position, targetText: targetText } })
        console.log(payload.data.answer)
        return payload.data.answer.split('\n')
        //const fakeReturn=["free oxygen radicals",0.9
        //      ,"functional residual capacity",0.1]
        //return fakeReturn
    }
}