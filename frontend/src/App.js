import logo from './logo.svg';
import './App.css';
import Select from './components/select'
import React, { useEffect, useState } from 'react';
import getAnswer from './getAnswer'
import {Table,Button} from 'antd'
import axios from 'axios'
import api from './api'

function App() {
    const [mode,setMode]=useState('entering')
    const [targetText,setTargetTest]=useState(
        "we developed an animal model of chronic allergic airway disease by repeatedly exposing\
nine sheep to tracheal instillation of ascaris antigen until stable increase in RL at \
three times control in six reactive sheep group c was obtained they were then compared \
to the three nonreactive sheep group b and a control group of eight sheep exposed to \
saline only group a in terms of pulmonary CF tests and bronchoalveolar lavage bal \
analyses RL was cm holsec in group a in group b and in group c trapping v")
    const [position,setPosition]=useState(-1)
    const [selectedWord,setSelectedWord]=useState('_')
    const [answer,setAnswer]=useState([])
    const [aidMode,setAidMode] =useState(0)
    const [aid,setAid]=useState('')

    const sendRequest=async()=>{
        const temp=await api.getAnswer(targetText,position)
        console.log(temp)
        var tempDic=[]
        for (var i=0;i<5;i++){
            tempDic.push(
                {key: i,
                outcome: <Button onClick={e=>displayAid(e.target.textContent)}>{temp[i].split(',')[0]}</Button>,
                possibility: temp[i].split(',')[1],})
        }
        setAnswer(tempDic)
        setMode('answering')
    }
    const columns = [
        {title:'Outcome',dataIndex:'outcome',key:'outcome',},
        {title:'Possibility',dataIndex:'possibility',key:'possibility',},
    ];
    var wikiInstance=''
    var wikiURL=''
    var pageID=''
    const displayAid=async(target)=>{
        if(aidMode===1){
            console.log('wiki mode')
            wikiInstance="https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
                +target+"&format=json&formatversion=2&origin=*"
            wikiURL=await axios.get(wikiInstance,{ crossDomain: true })
            pageID=JSON.parse(wikiURL.request.response).query.search[0].pageid
            setAid(<iframe src={"https://en.wikipedia.org/?curid="+pageID} width="80%" height='400px'></iframe>)
        }
        if(aidMode==2){
            console.log('wiki mode')
            wikiInstance="https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch="
                +target+"&format=json&formatversion=2&origin=*"
            wikiURL=await axios.get(wikiInstance,{ crossDomain: true })
            pageID=JSON.parse(wikiURL.request.response).query.search[0].pageid
            setAid(<iframe src={"https://zh.wikipedia.org/?curid="+pageID} width="80%" height='400px'></iframe>)
        }
        function delay(n){
            return new Promise(function(resolve){
                setTimeout(resolve,n*1000);
            });
        }
        const getTitle=async(target)=>{
            var tempURL="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id="+target+"&rettype="
            var test=await axios.get(tempURL,{ crossDomain: true })
            await delay(0.5)
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(test.data,"text/xml");
            var ret=xmlDoc.getElementsByTagName("ArticleTitle")[0].childNodes[0].nodeValue
            console.log(ret)
            return ret
        }
        if(aidMode==3){
            console.log('pubmed mode')
            var base = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
            var url = base + "esearch.fcgi?db=pubmed&term=" + target + "&retmode=json"+"&sort=relevance"
            var re = await axios.get(url,{ crossDomain: true })
            var idList=JSON.parse(re.request.response).esearchresult.idlist
            var titleList=[]
            var ret=''
            for(let id=0;id<10;id++){
                var temp=await getTitle(idList[id])
                titleList.push({key: id,
                    outcome: <a href={"https://pubmed.ncbi.nlm.nih.gov/"+idList[id]+"/"}>{temp}</a>}
                )
            }
            setAid(<Table dataSource={titleList} 
                columns={[{title:'Pubmed Outcome',dataIndex:'outcome',key:'outcome',}]}/>)
        }
    }

    const highlight=(e)=>{
        const isAbb=(e)=>{
            if(e == e.toUpperCase())
                return <a style={{backgroundColor: 'yellow'}}>{e+' '}</a>
            return e+' '
        }
        return(<>{e.split(' ').map(e=>isAbb(e))}</>)
    }

    const findPosition=(e)=>{
        var s = window.getSelection();
        var range = s.getRangeAt(0);
        var node = s.anchorNode;
        while(range.toString().indexOf(' ') != 0) {                 
            try{range.setStart(node,range.startOffset -1)}
            catch(e){break}
        }
        if(range.startOffset!=0)
            range.setStart(node, range.startOffset +1);
        do{
           try{range.setEnd(node,range.endOffset + 1)}catch(e){break}
        }while(range.toString().indexOf(' ') == -1 && range.toString().trim() != '')
        //if(targetText.split(' ')[-1])
        setPosition(targetText.slice(0,range.endOffset).split(' ').length-2)
        //console.log(targetText.slice[range.startOffset].length)
        var temp=targetText.slice(0,range.endOffset).split(' ')
        if(temp.slice(-1)[0]==="")
            setPosition(temp.length-2)
        else
            setPosition(temp.length-1)
        setSelectedWord(range.toString().trim())
    }

    return (
        <div className="container">
            <div className="top">
                <div className='flexbox'>
                    <h1>醫牙電資創意整合專題_nlp組</h1><br></br>
                    <h1>Medical abbreviation to possible words</h1><br></br>
                    <h5>
                        組員：彭鈺峯、林聖硯、謝一陽、鄧立珏、李承祐、杜冠勳<br></br>
                        指導老師：林忠緯、陳縕儂
                    </h5>
                    <br></br>
                    <h5>
                        {(mode!='entering')?<>在左邊輸入想要分析的文章後，按下下一步✅</>:<>在左邊輸入想要分析的文章後，按下下一步</>}
                        <br></br>
                        {(mode!=='answering')?<>點取你想要分析的縮寫，並按下確認</>:<>點取你想要分析的縮寫，並按下確認✅</>}
                    </h5>
                </div>
            </div>
            {(mode!='entering')?
            <>
                <div className="left">
                    <Select setAidMode={setAidMode}></Select>
                    <h3>你選擇了{selectedWord}位於第{position}個字<br></br></h3>
                    <div className='overlap'>
                        <div onClick={e=>findPosition(e)}>{targetText}</div>
                        <div className='unclickable'>{highlight(targetText)}</div>
                    </div>
                </div>
                <div className="middle">
                    <button onClick={e=>setMode('entering')}>上一步</button>
                    <button onClick={e=>sendRequest()}>確認選擇</button>
                </div>
            </>:
            <>
                <div className="left">
                    <Select setAidMode={setAidMode}></Select>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                    defaultValue={targetText} onChange={e=>setTargetTest(e.target.value)}></textarea>
                </div>
                <div className="middle">
                    <button onClick={e=>setMode('choosing')}>下一步</button>
                </div>
            </>}
            <div className="right">
                <Table dataSource={answer} columns={columns}/>
            </div>
            {aid}
        </div>
  );
}

export default App;
