import ReactQuill from "react-quill";
import React from "react";

export default function Editor({value,onChange}){
    return (
        <ReactQuill 
        value={value} 
        onChange={onChange} />
    );
}