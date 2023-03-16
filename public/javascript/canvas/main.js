// import { Canvas } from "canvas.js";
import { Open_file } from "./_open_file.js";

 

// ====================== canvas tools ========================//
 
let file = new Open_file();


  file.get_file_json(template_json,template_id,template_name);

let upload_img = document.querySelector('#input_img')
let upload_img_btn = document.querySelector('#upload_img_btn')
upload_img_btn.addEventListener('click',(e)=>{
  const xhr = new XMLHttpRequest()
  const formData = new FormData()
  console.log(upload_img);

  formData.append("input_img", upload_img.files[0]);
  call_link()
  async  function call_link(){
    await fetch('http://localhost:5000/user_upload_img', {
      method: "POST", 
      body: formData
    }); 
  }



 
})

 