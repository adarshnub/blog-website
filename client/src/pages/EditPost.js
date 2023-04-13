import { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";


export default function EditPost(){
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(()=> {
    fetch('http://localhost:4000/post/'+id)
    .then(response =>{
        response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
        })
    })
  },[]);

  async function updatePost(ev){
    ev.preventDefault();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    if(files?.[0]) {                  //files can be empty
        data.set('file',files?.[0]);
    }
    const data = new FormData();
    await fetch('http://localhost:4000/post', {
        method: 'PUT',
        body: data,
    });
    setRedirect(true);    //after update
  }  
  
  if(redirect){
    return <Navigate to={'/post'+id} />
  }
  return (
    <form
    onSubmit={updatePost}>
        <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file"  onChange={ev=> setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button class="button-48" role="button-48" style={{ border: 5 }}>
        {" "}
        <span class="text">Update Post</span>
      </button>
    </form>
  );
    
}