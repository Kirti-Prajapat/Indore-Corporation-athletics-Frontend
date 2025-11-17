import axios from "axios"
const Action =()=> async(dispatch)=>{
    try{
        const events = await axios.get("http://localhost:9900/eventdata/getEvent")
        const res = events.data
        dispatch({type:"success", payload:res})
    } catch(error){
        dispatch({type:"fail", payload:error.message})
    }
}


export default Action;