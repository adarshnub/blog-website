import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContemt] = useState("");
  const [files,setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev){
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    ev.preventDefault();
    console.log(files,content,summary,title);

  const response = await  fetch('http://localhost:4000/post' , {
        method: 'POST',
        body: data,
        credentials: 'include',
    });
    // console.log(await response.json());

    //redirection of post to homepage
    if(response.ok) {
      setRedirect(true);
    }

  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <form
    onSubmit={createNewPost}>
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
      <ReactQuill value={content} onChange={newValue => setContemt(newValue)}/>
      <button class="button-48" role="button-48" style={{ border: 5 }}>
        {" "}
        <span class="text">Create Post</span>
      </button>
    </form>
  );
}
