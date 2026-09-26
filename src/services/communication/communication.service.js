import api from "../api"

const sendCommunicationService  = (form)=>{
    return api.post("/contact-us",form)
}

export default sendCommunicationService