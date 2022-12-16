import SideNav from "../SideNav/SideNav";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Document.css";
import axios from "axios";
import { windowAlert } from "../Error/Alerts";

const Document = () => {
 
 
  let nav = useNavigate()
  const [Document, setDocument] = useState([]);


  const getDocuments = async () => {
    await axios(options)
    .then(documents=>{
      // eslint-disable-next-line no-lone-blocks
      {if(documents.data.data.length>0){
        localStorage.setItem("documents",JSON.stringify(documents.data.data))
        setDocument(documents.data.data)
      }}
    })
    .catch(error=>{
      console.log(error);
      windowAlert(error.response.data.message);
    })
}
  useEffect(() => {
    getDocuments();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

let options={
  url:"http://localhost:3001/documents",
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    jwt: localStorage.getItem('token')
  }
};

 const viewProduct=(file)=>{   
  window.open(file, "_blank");
 }
 
 const deleteDocument = async (Id) => {
  await axios(`http://localhost:3001/documents/${Id}`, {
   method: "Delete",
   headers:{
     Accept: "application/json",
     "Content-Type": "application/json;charset=UTF-8",
     jwt: localStorage.getItem('token')
   }
 }).then(res=>{
     localStorage.setItem("availableStorage",res.data.availableStorage)
      windowAlert("deleted successfully")
      window.location.reload();
 }).catch(err=>{
   windowAlert(err.message)
 })

};
 
  return (
    <div className="document-container">
      <SideNav />
      <div className="documents"> 
      {
       Document.length===0?
       <h1>No document found</h1>
       :Document.map((element,index)=>(
       
        <ul key={index}>
        <li >
          {
        <div className='card' >
          {}
        <img className="image" src={require(`../../assets/images/${element.extension}.jpg`)} alt={document.file}/>
        <article>  {element.fileName}</article><br/>
           <div className='bttn' >
          <button  onClick={() => viewProduct(element.fileLink)}>View</button>
           <button  onClick={() => nav(`/document/${element._id}/to-text`)}>convert to text</button>
           <button  onClick={() => deleteDocument(element._id)}>Delete</button>
           </div>
           </div>
     
        } </li>
      </ul>
    ))
      }
       
    </div>
    </div>

       )
      }

export default Document;
