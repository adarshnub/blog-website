import { useState } from "react";

import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


export default function EditPost(){

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  function updatePost(ev){
    ev.preventDefault();
  }  
  
  if(redirect){
    return <Navigate to={'/'} />
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
        <span class="text">Create Post</span>
      </button>
    </form>
  );
    
}