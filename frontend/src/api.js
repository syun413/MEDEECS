import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export default {
    getAnswer: (targetText, position) => {
        const payload = instance.get('/getAnswer'
            , { params: { position: position, target: targetText } })
        return payload
        //const fakeReturn=["free oxygen radicals",0.9
        //      ,"functional residual capacity",0.1]
        //return fakeReturn
    }
}