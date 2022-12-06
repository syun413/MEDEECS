import logo from './logo.svg';
import './App.css';
import Select from './components/select'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})
function App() {
    const [aidMode,setAidMode] =useState(0)
    const [targetText,setTargetTest]=useState('')
    const [answer,setAnswer]=useState('try some text with medical abbreviation')

    const sendRequest=async()=>{
        console.log(aidMode,targetText)
        const temp=await instance.get('/getAnswer',{params:{mode:aidMode,target:targetText}})
        setAnswer(temp)
    }

    return (
        <div className="container">
            <div className="top">
                <h1>MEDEECS nlp demo</h1>
                組員：彭鈺峯、林聖硯、謝一陽、鄧立珏、李承祐、杜冠勳
            </div>
            <div className="left">
                  <Select setAidMode={setAidMode}></Select>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                  defaultValue={targetText} onChange={e=>setTargetTest(e.target.value)}></textarea>
            </div>
            <div className="middle">
                <button onClick={e=>sendRequest()}>enter</button>
            </div>
            <div className="right">
                {answer}
            </div>
        </div>
  );
}

export default App;
