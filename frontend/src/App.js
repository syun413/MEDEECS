import logo from './logo.svg';
import './App.css';
import Select from './components/select'
import React, { useEffect, useState } from 'react';
import api from './api'
import {Table,Button} from 'antd'
import axios from 'axios'

function App() {
    const [targetText,setTargetTest]=useState(
        'we developed an animal model of chronic allergic airway disease by repeatedly exposing\
nine sheep to tracheal instillation of ascaris antigen until stable increase in RL at \
three times control in six reactive sheep group c was obtained they were then compared \
to the three nonreactive sheep group b and a control group of eight sheep exposed to \
saline only group a in terms of pulmonary CF tests and bronchoalveolar lavage bal \
analyses RL was cm holsec in group a in group b and in group c trapping v')
    const [position,setPosition]=useState(-1)
    const [answer,setAnswer]=useState([])
    const [aidMode,setAidMode] =useState(0)
    const [aid,setAid]=useState('')

    const sendRequest=async()=>{
        const temp=await api.getAnswer(targetText,position)
        var tempDic=[]
        for (var i=0;i<temp.length/2;i++){
            tempDic.push(
                {key: i,
                outcome: <Button onClick={e=>displayAid(e.target.textContent)}>{temp[2*i]}</Button>,
                possibility: temp[2*i+1],})
        }
        setAnswer(tempDic)
    }
    const columns = [
        {title:'Outcome',dataIndex:'outcome',key:'outcome',},
        {title:'Possibility',dataIndex:'possibility',key:'possibility',},
    ];

    //trying to get the position of the selected words
    /*
    var text = "";
    function getActiveText(e){ 
        text = document.getSelection().toString()
        //document.theform.text.value = text;
        console.log(text)
        //return true;
        console.log(document.getSelection())
    }

    document.onmouseup = getActiveText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
    */
    const displayAid=async(target)=>{
        if(aidMode===1){
            console.log('wiki mode')
            var wikiInstance="https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
                +target+"&format=json&formatversion=2&origin=*"
            var wikiURL=await axios.get(wikiInstance,{ crossDomain: true })
            var pageID=JSON.parse(wikiURL.request.response).query.search[0].pageid
            setAid(<iframe src={"https://en.wikipedia.org/?curid="+pageID} width="80%"></iframe>)
        }
        if(aid===2){
            console.log('wiki mode')
            var wikiInstance="https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch="
                +target+"&format=json&formatversion=2&origin=*"
            var wikiURL=await axios.get(wikiInstance,{ crossDomain: true })
            var pageID=JSON.parse(wikiURL.request.response).query.search[0].pageid
            setAid(<iframe src={"https://zh.wikipedia.org/?curid="+pageID} width="80%"></iframe>)
        }
    }

    return (
        <div className="container">
            <div className="top">
                <h1>醫牙電資創意整合專題_nlp組<br></br>Medical abbreviation to possible words</h1>
                <div><h5>
                    組員：彭鈺峯、林聖硯、謝一陽、鄧立珏、李承祐、杜冠勳<br></br>
                    指導老師：林忠緯、陳縕儂
                </h5></div>
            </div>
            <div className="left">
                  <Select setAidMode={setAidMode}></Select>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                  defaultValue={targetText} onChange={e=>setTargetTest(e.target.value)}></textarea>
            </div>
            <div className="middle">
                <button onClick={e=>sendRequest()}>enter</button>
            </div>
            <div className="right">
                <Table dataSource={answer} columns={columns}/>
            </div>
            {aid}
        </div>
  );
}

export default App;
