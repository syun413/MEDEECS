import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})  

export default{
    getAnswer:(targetText)=>{
        //const payload=instance.get('/getAnswer',{params:{mode:aidMode,target:targetText}})
        const fakeReturn=["free oxygen radicals",0.9,"functional residual capacity",0.1]
        return fakeReturn
    }
}