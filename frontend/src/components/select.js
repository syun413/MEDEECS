
function Select({setAidMode}){
    return(
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">輔助資訊模式</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" onChange={e=>setAidMode(e.target.selectedIndex)}>
                <option>Choose...</option>
                <option defaultValue="1">英文版wiki連結</option>
                <option defaultValue="2">中文版wiki連結</option>
                <option defaultValue="3">pubmed延伸論文連結</option>
            </select>
        </div>
    )
}
export default Select
