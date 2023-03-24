import { Modification } from "./_modification.js";

export class Menu_tools extends Modification {
  add_background(){
 

      let add_bg_image =  document.querySelector("#modal-container-add-background")
      let modal_body =   add_bg_image.querySelector('.modal-body')

    
        document.querySelector("#canvas-image-background").addEventListener("click", ()=>{
  
       console.log(modal_body.innerHTML.length)
          if(modal_body.innerHTML.length){
        
            console.log('wala ng request');
            add_bg_image.style.display ="flex"
         
    
          }else{
            console.log(' nag request');
     
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                let data = JSON.parse(xhttp.responseText);
             
    
       
                data.forEach((e)=>{
                  let div = document.createElement('div')
                  div.innerHTML = 
                  ` 
                  <img src='http://localhost:5000/images/canvas_image/${e.thumbnail_image}' width="150px">
                  <input type="hidden" name="background_name" class="bg_name" value="${e.background_image}">

                  <span class="btn btn-sm btn-success apply-btn">Apply</span>`
      
                  modal_body.appendChild(div)
                })
                
                add_bg_image.style.display ="flex"
                let link_save = []
                let link;
                modal_body.addEventListener("click", (e)=>{

                  //remove all existing background images
                    if(e.target.classList.contains("apply-btn")){
                      let a = this.canvas.getObjects().filter((e)=>{
                        return e.name == "bg-image";
                      })
                      a.forEach((e)=>{
                        e.opacity = 0
                        this.canvas.renderAll();
                      })
               
              

                     let image_name =e.target.parentElement.querySelector(".bg_name").value
                   
                    let b = link_save.filter((e)=>{
                      return  e ==='http://localhost:5000/images/canvas_image/'+ image_name 
                  
                     })
                    
                   if(b != ''){
                  //kung naa
                  let a = this.canvas.getObjects().filter((e)=>{
                  return e.type == 'image';
                  })

        a.forEach((e)=>{
 
            if(e._originalElement.currentSrc == 'http://localhost:5000/images/canvas_image/'+ image_name){
              e.opacity = 1;
              this.canvas.renderAll()
              }
          
       
        })

                     add_bg_image.style.display ="none"
                   }else{
                    //kung wala
                    console.log('wala');

                    link ='http://localhost:5000/images/canvas_image/'+ image_name 
                    link_save.push(link)
                    console.log(b);
                   
                  fabric.Image.fromURL(link, (img) => {
                 
                   img.name = "bg-image";
                   this.canvas.add(img);
                   img.scaleToWidth(this.canvas.getWidth());
                   this.canvas.viewportCenterObject(img);
                   this.canvas.sendToBack(img);
                   img.selectable = false;
                   img.hoverCursor = "default";
                  img.tae = 'tae'
                   img.set("lockMovementX", true);
                   img.set("lockMovementY", true);
                   img.set("lockScalingX", true)
                   img.set("lockScalingY", true);
                   img.set("lockRotation", true);
                   this.canvas.discardActiveObject();
                   this.canvas.renderAll();
                   img.setControlsVisibility({
                     mt: false,
                     mb: false,
                     ml: false,
                     mr: false,
                     tr: false,
                     tl: false,
                     br: false,
                     bl: false,
                     mtr: false,
                   });
                   this.canvas.renderAll();
             
                   add_bg_image.style.display ="none"
                 });
               
                   }
                  
                    }
                })
              }

            
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/get-all-background-image`,
              true
            );
            xhttp.send();
    
          }
          
    
        })  

     
      add_bg_image.querySelector('.close').addEventListener("click",()=>{
 
        add_bg_image.style.display ="none"
      })
 
  
  }
  loadPage() {
    
 
    let link = canvas_image;
    let a = this.canvas.getObjects().filter((e)=>{
      return e.name == "bg-image";
    })
  
if(link != null ){//dili null
  if(a ==  false){
 
    fabric.Image.fromURL(link, (img) => {
      // img.excludeFromExport = true;
      img.name = "bg-image";
      this.canvas.add(img);
      img.scaleToWidth(this.canvas.getWidth());
      this.canvas.viewportCenterObject(img);
      this.canvas.sendToBack(img);
      img.selectable = false;
      img.hoverCursor = "default";
  
      img.set("lockMovementX", true);
      img.set("lockMovementY", true);
      // img.set("lockScalingX", true)
      img.set("lockScalingY", true);
      img.set("lockRotation", true);
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
      img.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tr: false,
        tl: false,
        br: false,
        bl: false,
        mtr: false,
      });
      this.canvas.renderAll();
    });
  } 
}

  }
resetCanvas(){
  if(role == 'user'){
    document.querySelector('#reset').addEventListener('click', ()=>{
        
  
      let a = template_id 
   
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
         
            window.location.reload();
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/resetCanvas?template_id=${a}`,
          true
        );
        xhttp.send();
    })
  }else{
    document.querySelector('#reset').style.display = 'none';
  }
 
}


  // textbox
  insertText( ) {
    let insert_text = document.querySelector(".dropbtn-insert-text");
    insert_text.addEventListener("click", () => {
        console.log('gg')
      let object = new fabric.Textbox("Your Text Here", {
        textAlign: "center",

      
        id: this.uniqueId() ,
        dirty: true,
   
         width: 100,
        splitByGrapheme: true,
    
        centeredScaling: true,
      });
      
      object.fontSize = 12
      object.scaleToWidth(800)
      object.name = 'user-custom';
      object.lockMovementX = true
      this.adding_object_style(object);
    });
  }

  uploadImageLocalFile(selector) {
    document.querySelector(selector).addEventListener("click", async () => {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Images",
            accept: {
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "image/svg+xml": [".svg"],
            },
          },
        ],
      });
      this.loaderShow();
      const file = await fileHandle.getFile();

      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        fabric.Image.fromURL(reader.result, (img) => {
          img.name = img.type;
          img.id = this.uniqueId();
          this.adding_object_style(img);

          this.loaderHide();
        });
      };
    });
  }
  upload_user_image(){
    let photo_container = document.querySelector('#photos-container')
    
  let add_photo_btn = document.querySelector('#add-photos')
  add_photo_btn.addEventListener('click', (e)=>{
    let parent = document.querySelector('.display-photos-container')
 
if(parent.querySelector('.img-container')){
  

  photo_container.style.display = 'flex'
 

}else{
   //get images users
   var xhttp = new XMLHttpRequest();
   
   xhttp.onreadystatechange = () => {
     if (xhttp.readyState == 4 && xhttp.status == 200) {
       let data = JSON.parse(xhttp.responseText);
      
   
    
      setTimeout(()=>{
      photo_container.style.display = 'flex'
      })
  
         data.forEach((e)=>{
     
          let div = document.createElement('div');
         div.className = 'img-container'
         div.innerHTML = `<div>
         <div class="container hide"></div>
          <img src="images/users/${e.image_path}" class="user-image"   >
          <div id="${e.image_path}" class="btn btn-sm btn-primary use-btn" >Use</div>

          
          
          <img src="images/canvas/list-black.png" class="hover-opactiy  option" width="15"
          alt="">
          <div class="delete-template text hide text-dark">Delete</div>
     
    
         </div>`;
         parent.appendChild(div);

         })
       
            } 
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/get_user_image`,
            true
          );
          xhttp.send( );
}
})

// use image to canvas and send request to server
parent.addEventListener('click', (e)=>{
  if(e.target.classList.contains('use-btn')){
   let id = e.target.id;
 
     //get images users
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = () => {
     if (xhttp.readyState == 4 && xhttp.status == 200) {
       let data = JSON.parse(xhttp.responseText);
 
              fabric.Image.fromURL('images/users/'+data[0].image_path, (img) => {
              img.name = img.type;
           
              img.scaleToWidth(600);
              img.id = this.uniqueId(); 
              this.canvas.add(img)
         
              this.canvas.renderAll()
              });

              photo_container.style.display = 'none';
 
    


            } 
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/get_user_image_toCanvas?id=${id}`,
            true
          );
          xhttp.send( );
  }
  if(e.target.classList.contains('option')){
    if(e.target.parentElement.querySelector('.delete-template').classList.contains('hide')){
      e.target.parentElement.querySelector('.container').classList.add('show');
      e.target.parentElement.querySelector('.container').classList.remove('hide');

      e.target.parentElement.querySelector('.delete-template').classList.add('show');
      e.target.parentElement.querySelector('.delete-template').classList.remove('hide');


    }else{
      e.target.parentElement.querySelector('.delete-template').classList.add('hide');
      e.target.parentElement.querySelector('.delete-template').classList.remove('show');

      e.target.parentElement.querySelector('.container').classList.add('hide');
      e.target.parentElement.querySelector('.container').classList.remove('show');

    }
  }
  if(e.target.classList.contains('container')){
    e.target.parentElement.querySelector('.delete-template').classList.add('hide');
    e.target.parentElement.querySelector('.delete-template').classList.remove('show');

    e.target.parentElement.querySelector('.container').classList.add('hide');
    e.target.parentElement.querySelector('.container').classList.remove('show');
   }

   if(e.target.classList.contains('delete-template')){
     let id = e.target.parentElement.querySelector('.use-btn').id;

     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = () => {
       if (xhttp.readyState == 4 && xhttp.status == 200) {
         let data = JSON.parse(xhttp.responseText);
   
     e.target.parentElement.parentElement.remove()
          
  
              } 
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/delete_user_image?id=${id}`,
              true
            );
            xhttp.send( );
   }
})
 
let upload_img = document.querySelector('#input_img')
let upload_img_btn = document.querySelector('#upload_img_btn')
//upload image
upload_img_btn.addEventListener('click',(e)=>{
  const xhr = new XMLHttpRequest()
  const formData = new FormData()
   

  formData.append("input_img", upload_img.files[0]);
 if(document.querySelector("#input_img").value){
  var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);
       
              let parent = document.querySelector('.display-photos-container')
              let div = document.createElement('div');
              const imageSrc = URL.createObjectURL(upload_img.files[0]);
      
             div.className = 'img-container'
              div.innerHTML =  `<div>
              <div class="container hide"></div>
               <img src="${imageSrc}" class="user-image"   >
               <div id="${data}" class="btn btn-sm btn-primary use-btn" >Use</div>
     
               
               
               <img src="images/canvas/list-black.png" class="hover-opactiy  option" width="15"
          alt="">
               <div class="delete-template text hide text-dark">Delete</div>
          
         
              </div>`;
              parent.appendChild(div);
      
 
                 } 
               };
               xhttp.open(
                 "POST",
                 `http://localhost:5000/user_upload_img?template_id=${template_id}&purchased_id=${purchased_id}`,
                 true
               );
               xhttp.send(formData);

 } 


 
})
photo_container.querySelector('.close').addEventListener('click',(e)=>{
  photo_container.style.display = 'none'
  
   

})

  }
  download_as_image() {
  
    //  if(e.target){
    //   const download_image = document.querySelector("#download-image")
    //   download_image.onclick = () => {
    //     console.log('ss');
    //     var scaleFactor = 1;
    //     this.canvas.setWidth(this.width * scaleFactor);
    //     this.canvas.setHeight(this.height * scaleFactor);
    //     this.canvas.setZoom(scaleFactor);
  
    //     this.canvas.renderAll();
  
    //     let display_name = document.querySelector("#file_name").innerHTML;
    //     const a = document.createElement("a");
    //     document.body.appendChild(a);
    //     a.href = this.canvas.toDataURL({
    //       format: "png",
    //       // quality:  1
    //     });
    //     a.download = `${display_name}.png`;
    //     a.click();
    //     document.body.removeChild(a);
  
    //     this.canvas.setHeight(this.canvas.current_height);
    //     this.canvas.setWidth(this.canvas.current_width);
    //     this.canvas.setZoom(this.canvas.current_canvasScale);
    //   };
    //  }
  
   
  }

  paste_text() {
    window.addEventListener("paste", (e) => {
    
    
      let obj = this.canvas.getActiveObject()
      if(obj){
        // e.preventDefault()
        // let text = e.clipboardData.getData("text");

        // obj.text = text
        // this.canvas.renderAll()
      }
   
      // if(obj){
      //   this.canvas.text = obj.text
      //   setTimeout(()=>{
         
      //     let obj = this.canvas.getActiveObject()
      //     obj.removeStyle('styles')
      //     obj.removeStyle('fontStyle')
      //     obj.removeStyle('stroke')
      //     obj.removeStyle('strokeWidth')
      //     obj.removeStyle('fontWeight')
   
         
      //     this.canvas.renderAll();
      //   })
      // }
    
   
    });
  }

//  text_submit(){
   
// // let upload_img_btn = document.querySelector('#text_submit')
// // let upload_img = document.querySelector('#file_input')

// //upload image
// upload_img_btn.addEventListener('click',(e)=>{

//   const xhr = new XMLHttpRequest()
//   const form = document.querySelector('#upload-form');
  
//   const formData = new FormData(form);

//   // formData.append("file_input", upload_img.files[0]);
//   var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = () => {
//           if (xhttp.readyState == 4 && xhttp.status == 200) {
//             let data = JSON.parse(xhttp.responseText);
       

//                  } 
//                };
//                xhttp.open(
//               "POST",
//         `http://localhost:5000/text_submit?template_id=${this.canvas.template_id}&purchased_id=${purchased_id}`,
//         true
//                );
//                xhttp.send(formData);

 

// })
//  }

 save_file_json() {
  //limit maximum 10,500 characters
  //target limit 10,000 characters
    document.getElementById("save_json").addEventListener("click", () => {
     
      let ab = this.canvas.toJSON([
       "id",
       "name",
       'tae'
     ]);
     console.log(ab);
 this.loading_save('visible','Saving . . .');
    function replaceBreakLine(valueToEscape) {
      if (valueToEscape != null && valueToEscape != "") {
         return valueToEscape.replaceAll(/\\n|\n/g,"<-br->");
      } else {
         return valueToEscape;
      } 
   }
   function replaceQoute(valueToEscape){
    if (valueToEscape != null && valueToEscape != "") {
      return valueToEscape.replaceAll(/'/g,"<-q->");
   } else {
      return valueToEscape;
   } 
   }
 //delete not used bg
 this.canvas.getObjects().filter((e)=>{
  return e.name === 'bg-image' && e.opacity === 0 
  
}).forEach((e)=>{
   e.excludeFromExport = true;
 
  this.canvas.renderAll()
})

      let textbox_property = [
        "filters",
        "originX",
        "originY",
        "version",
        "stroke",
        "strokeWidth",
       "strokeDashArray",
        "strokeLineCap",
        "strokeDashOffset",
        "strokeLineJoin",
        "strokeUniform",
        "strokeMiterLimit",
        "angle",
        "flipX",
        "flipY",
        "opacity",
        "shadow",
        "visible",
        "fillRule",
        "paintFirst",
        "globalCompositeOperation",
        "skewX",
        "skewY",
        "underline",
        "overline",
        "linethrough",
        // "fontStyle",
        "lineHeight",
        "charSpacing",
        // "styles",
        "direction",
        "path",
        "pathStartOffset",
        "pathSide",
        "pathAlign",
        "splitByGrapheme",
        "editable",
        "borderColor",
        "cornerColor",
        "cornerSize",
        "cornerStyle",
        "transparentCorners",
        "_controlsVisibility",
       "lockMovementX",
        "lockMovementY",
        // "lockScalingX",
        // "lockScalingY",
        "underline",
        "selectable",
        "overline",
"linethrough",
"deltaY",
// "selectionStyle",
        
    ];
  
    let json = this.canvas.toJSON([
      "id",
      "name",
      'tae'
      
    ]);
 
 
json.objects.forEach((e)=>{
 
        if(e.type === 'textbox'){
        e.text =  replaceQoute(replaceBreakLine(e.text)) 
        
        }
      
        if(e.name === 'bg-image'){
          delete e['left'];
          delete e['top'];
          delete e['crossOrigin'];
          delete e['scaleY'];
          delete e['scaleX'];
          delete e['width'];
          delete e['height'];
          }
        
{
 
}  textbox_property.forEach((c)=>{
     delete e[c];
    if(e.cropY === 0 || e.cropX === 0){
      delete e['cropY'];
      delete e['cropX'];
    }
   
    if(e.fill ==="rgb(0,0,0)" || e.fill === "#000000"){
      delete e["fill"];
    }
    if(e.backgroundColor === ""||e.backgroundColor === "transparent" )
    delete e["backgroundColor"];
     })
     if(e.textBackgroundColor === ""){
    delete e["textBackgroundColor"];
     }
     if(e.fontWeight === "normal"){
      delete e["fontWeight"];
     }
 
     if(e.fontFamily === "Times New Roman"){
      delete e["fontFamily"];
     }
     if(e.minWidth === 20){
      delete e["minWidth"];
     }
    
})

 

let size = {
  w: this.width,
  h: this.height,
};

let merge = {
  json,
  size,
};
let json_file = JSON.stringify(merge);
let json_text = document.querySelector('#text-input')
json_text.value = json_file;
const xhr = new XMLHttpRequest()
const form = document.querySelector('#upload-form');

const formData = new FormData(form);

// formData.append("file_input", upload_img.files[0]);
var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let data = JSON.parse(xhttp.responseText);
          if(data === 'ok'){
       
            setTimeout((e)=>{
              this.loading_save('hidden',null);
              // document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
            },3000)
          }

     if(data === 'error'){
            document.querySelector('.lds-spinner-container-saving-json .text-container .loader').style.display = 'none'; 

            document.querySelector('.lds-spinner-container-saving-json ').style.display = 'flex';
            document.querySelector('.lds-spinner-container-saving-json .text-container .error').style.display = 'block';

            document.querySelector('.lds-spinner-container-saving-json .text-container .error .btn').addEventListener('click', function(){
              document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
            })

          }







               } 
             };
             xhttp.open(
            "POST",
      `http://localhost:5000/saved-template?template_id=${this.canvas.template_id}&purchased_id=${purchased_id}`,
      true
             );
             xhttp.send(formData);


   ///////////////////////////////////////////////
   
      // var xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = () => {
      //   if (xhttp.readyState == 4 && xhttp.status == 200) {
       
      //     let data = JSON.parse(xhttp.responseText);
      //     setTimeout(()=>{
      //       this.loading_save('visible','Saved');

      //     },1000)
      
      //     if(data === 'ok'){
       
      //       setTimeout((e)=>{
      //         this.loading_save('hidden',null);
      //         // document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
      //       },3000)
       
      //     }
      //     if(data === 'error'){
      //       document.querySelector('.lds-spinner-container-saving-json .text-container .loader').style.display = 'none'; 

      //       document.querySelector('.lds-spinner-container-saving-json ').style.display = 'flex';
      //       document.querySelector('.lds-spinner-container-saving-json .text-container .error').style.display = 'block';

      //       document.querySelector('.lds-spinner-container-saving-json .text-container .error .btn').addEventListener('click', function(){
      //         document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
      //       })

      //     }

      //   }
      // };
      // xhttp.open(
      //   "POST",
      //   `http://localhost:5000/saved-template?saved_json=  `+ encodeURIComponent(json_file) + `&template_id=${this.canvas.template_id}&purchased_id=${purchased_id}`,
      //   true
      // );
      // xhttp.send();
    });
  }

  
 

  //insert data
  insertData() {
    let resize_canvas_event;
    //load names from database
 const createTable = ()=>{
  return new Promise((resolve, reject)=>{
    let count = 101
    
 for(let i = 1;i < count; i++) {
  let div = document.createElement("tr");
 div.setAttribute('data',`${i}`)
 
  div.innerHTML = `
  <td class="sequence ">${i}.</td>
  <td class="xl65 column-1" style="border-right:.5pt solid black;
 " contenteditable="true"></td>
  <td class="xl65 column-2" style="border-right:.5pt solid black;
border-left:none; " contenteditable="true"></td>
<td>
<img src="./images/canvas/eye-solid.png" class="eye-show" width="18">
<img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
</td>

<td style="margin-left:-51px">
<img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
<img src="./images/canvas/download-solid.png"   class="able-download " width="18">
<img src="./images/canvas/download-solid-disable.png"  class="disable-download" width="18">
</td>


     


        `;
        document.querySelector(".list-name-container table tbody ").appendChild(div)
        
     
  div.scrollIntoView();
 
 
  
  if(i + 2 > count ){
    resolve()
  
   }
 } 


  })
 }
 



//insert names from database
createTable().then(()=>{
    if(list){
      let excel_data =  JSON.parse(list);
  
        let inputs = document.querySelectorAll(".list-name-container table tbody tr ");
 
        for(let i = 0; i < excel_data.length; ) {
      
          for(let x = 0; x < inputs.length; x++) {
            
           
      
              inputs[x].children[1].innerText = excel_data[i].data_1 
              inputs[x].children[2].innerText = excel_data[i].data_2 
                 
              inputs[x].className = `${excel_data[i].data_3}` 
              if(excel_data[i].data_3 == 'disable'){
              
                inputs[x].children[1].contentEditable = false;
                inputs[x].children[2].contentEditable = false;
                inputs[x].querySelector('.eye-hide').style.display = 'inline-block'
                inputs[x].querySelector('.disable-download').style.display = 'inline-block'
                inputs[x].children[3].style.backgroundColor = '#fff';
                inputs[x].children[4].style.backgroundColor = '#fff';
              }else{
                inputs[x].querySelector('.eye-show').style.display = 'inline-block'
                inputs[x].querySelector('.able-download').style.display = 'inline-block'
                inputs[x].children[3].style.backgroundColor = '#fff';
                inputs[x].children[4].style.backgroundColor = '#fff';
              }
        

              i++
              if(i > excel_data.length - 1){
 
                break;
              }
         
            
    
          }
          }
  
      
          document.querySelector('.list-names').scrollTop = 0;
  
    }
 

})




    //  insert-data
    let element = document.querySelector(".excel-html-view-data");
  
    let parent = document.querySelector(".list-name-container");
    let add_name_btn = document.querySelector("#insert-names");

    function addRow(){
      let div = document.createElement("tr");

      div.innerHTML = `
      <td class="sequence">.</td>
      <td class="xl65 column-1" spellcheck="false"  style="border-right:.5pt solid black;
     " contenteditable="true"> </td>
      <td  spellcheck="false"  class="xl65 column-2" style="border-right:.5pt solid black;
    border-left:none; " contenteditable="true"></td>
    <td>
    <img src="./images/canvas/eye-solid.png" class="eye-show" width="18">
    <img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
    </td>
    
    <td>
    <img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
    <img src="./images/canvas/download-solid.png"   class="able-download " width="18">
    <img src="./images/canvas/download-solid-disable.png"  class="disable-download" width="18">
    </td>
    

 
      `;
      document.querySelector(".list-name-container table tbody").appendChild(div)
   
      }
      parent.addEventListener('input',(e)=>{
 
        if(e.target.parentElement.children[1].innerText.length > 0 ||e.target.parentElement.children[2].innerText.length > 0 ){
          e.target.parentElement.querySelector('.eye-show').style.display = 'inline-block'
          e.target.parentElement.querySelector('.able-download').style.display = 'inline-block'
        }else{
          e.target.parentElement.querySelector('.eye-show').style.display = 'none'
          e.target.parentElement.querySelector('.able-download').style.display = 'none'
        }
        let textbox= this.canvas.getObjects().filter((el) => el.name === 'Column-1-textbox' || el.name === 'Column-2-textbox');
         e.target.innerText
         if(e.target.classList.contains('column-1')){
 
          textbox[0].set({text: e.target.innerText}) 
         };
         if(e.target.classList.contains('column-2')){
 
          textbox[1].set({text: e.target.innerText}) 
         };
         this.canvas.renderAll()
      })

    
    parent.addEventListener("click", (e)=>{
      
      //remove row
      if(e.target.classList.contains('delete')){
        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr"
        ) 

        Array.from(tr).forEach((ev)=>{
          if(  ev.classList.contains('active') ){
            ev.remove()
            addRow()
            let names = document.querySelectorAll(
              ".list-name-container .list-names table tbody tr"
            );
            let i = 1
              names.forEach((e)=>{
                e.setAttribute("data", i++)
                e.children[0].innerText = i - 1 + "."
              })
          }
        
         
        })
      }
      //click on the table
        if(e.target.classList.contains('xl65')){
          let tr = document.querySelectorAll(
            ".list-name-container .list-names  table tbody tr"
          ) 
      
          Array.from(tr).forEach((ev)=>{
            ev.classList.remove('active')
           
          })
          if(!e.target.parentElement.classList.contains('disable')){
            e.target.parentElement.classList.add('active');
            e.target.parentElement.children[3].style.backgroundColor = '#fff';
            e.target.parentElement.children[4].style.backgroundColor = '#fff';
            let textbox= this.canvas.getObjects().filter((el) => el.name === 'Column-1-textbox' || el.name === 'Column-2-textbox');
  
            textbox[0].set('splitByGrapheme', true)
            textbox[1].set('splitByGrapheme', true) 
            textbox[0].set({text: e.target.parentElement.children[1].innerText ? e.target.parentElement.children[1].innerText:'--'}) 
            textbox[1].set({text: e.target.parentElement.children[2].innerText ? e.target.parentElement.children[2].innerText:'--'}) 
         
            this.canvas.renderAll()
          }
       
        }

        if(e.target.classList.contains('select-all')){
          let tr = document.querySelectorAll(
            ".list-name-container .list-names  table tbody tr"
          ) 
      
          Array.from(tr).forEach((ev)=>{
      
            if(ev.children[1].innerText.length > 0 || ev.children[2].innerText.length > 0)
              if(!ev.classList.contains('disable')){
                ev.classList.add('active')
          ev.children[3].style.backgroundColor = '#fff';
            ev.children[4].style.backgroundColor = '#fff';
              }
           
          })
        }
        //eye show
        if(e.target.classList.contains('eye-show')){
        

          e.target.parentElement.parentElement.classList.remove('active');
          e.target.parentElement.parentElement.classList.add('disable');
          e.target.parentElement.parentElement.children[1].contentEditable = false;
          e.target.parentElement.parentElement.children[2].contentEditable = false;
          e.target.parentElement.parentElement.querySelector('.eye-show').style.display = 'none';
          e.target.parentElement.parentElement.querySelector('.eye-hide').style.display = 'inline-block';
          e.target.parentElement.parentElement.querySelector('.able-download').style.display = 'none';
          e.target.parentElement.parentElement.querySelector('.disable-download').style.display = 'inline-block';
           e.target.parentElement.parentElement.children[3].style.backgroundColor = '#fff';
            e.target.parentElement.parentElement.children[4].style.backgroundColor = '#fff';

        }
        //eye hide
        if(e.target.classList.contains('eye-hide')){
           
          e.target.parentElement.parentElement.classList.remove('disable');
          e.target.parentElement.parentElement.children[1].contentEditable = true;
          e.target.parentElement.parentElement.children[2].contentEditable = true;
          e.target.parentElement.parentElement.querySelector('.eye-show').style.display = 'inline-block';
          e.target.parentElement.parentElement.querySelector('.eye-hide').style.display = 'none';
          e.target.parentElement.parentElement.querySelector('.able-download').style.display = 'inline-block';
          e.target.parentElement.parentElement.querySelector('.disable-download').style.display = 'none';
        }
          //swap column
          if (e.target.classList.contains("swap-column")) {
            let tr = document.querySelectorAll(
              ".list-name-container .list-names  table tbody tr"
            ) 
    
            Array.from(tr).forEach((ev)=>{
              if(ev.classList.contains('active') ){
                let a = ev.children[1].innerText;
                let b = ev.children[2].innerText;
                ev.children[1].innerText = b
                ev.children[2].innerText = a
          
              }
            
             
            })

 
          }
          //clear all rows
          if (e.target.classList.contains("clear-all")) {
          
            let tr = document.querySelectorAll(
              ".list-name-container .list-names  table tbody tr"
            ) 
    
            Array.from(tr).forEach((ev)=>{
              if(ev.classList.contains('active') ){
                ev.children[1].innerText = ''
                ev.children[2].innerText = ''
                ev.querySelector('.eye-show').style.display = 'none'
                ev.querySelector('.able-download').style.display = 'none'
              }
            
             
            })
      
          }
          if(e.target.classList.contains('sentence-case')){
 
           
              let tr = document.querySelectorAll(
                ".list-name-container .list-names  table tbody tr"
              ) 
      
              Array.from(tr).forEach((ev)=>{
                if(ev.classList.contains('active') ){
                  let b = ev.children[1].innerText.replace(/,(?=[^\s])/g, ", ");
                  let c = b.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  });
                  ev.children[1].innerText = c;
      
                  let d = ev.children[2].innerText.replace(/,(?=[^\s])/g, ", ");
                  let e= d.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  });
                  ev.children[2].innerText = e;
                }
              
               
              })

 
              
 
          }
        
     if(e.target.classList.contains('able-download')){
      let tr = document.querySelectorAll(
        ".list-name-container .list-names  table tbody tr"
      ) 
  
      Array.from(tr).forEach((ev)=>{
        ev.classList.remove('active')
       
      })
      e.target.parentElement.classList.add('active');
      let textbox= this.canvas.getObjects().filter((el) => el.name === 'Column-1-textbox' || el.name === 'Column-2-textbox');


      textbox[0].set({text: e.target.parentElement.parentElement.children[1].innerText ? e.target.parentElement.parentElement.children[1].innerText:''}) 
      textbox[1].set({text: e.target.parentElement.parentElement.children[2].innerText ? e.target.parentElement.parentElement.children[2].innerText:''}) 
      
      if( textbox[0].text.trim() || textbox[1].text.trim()){

        this.canvas.renderAll()
        var scaleFactor = 1;
        this.canvas.setWidth(this.width * scaleFactor);
        this.canvas.setHeight(this.height * scaleFactor);
        this.canvas.setZoom(scaleFactor);
  
        this.canvas.renderAll();
  
        
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = this.canvas.toDataURL({
          format: "png",
          // quality:  1
        });
        a.download =  `${textbox[0].text.trim() || textbox[1].text.trim()}`;
        a.click();
        document.body.removeChild(a);
  
        this.canvas.setHeight(this.canvas.current_height);
        this.canvas.setWidth(this.canvas.current_width);
        this.canvas.setZoom(this.canvas.current_canvasScale);

      }else{
        console.log('no download');
      }
    
 
     }
    })



    add_name_btn.addEventListener("click", () => {
      
      parent.style.right = 0

       resize_canvas_event = true
       
          let a = document.querySelector('.list-name-container').offsetWidth
          let b = window.innerWidth
          let c = b -a
          document.querySelector('main').style.width = c +'px'
 
        add_name_btn.style.display = 'none'

      this.canvas.discardActiveObject()
      this.canvas.renderAll()

      if(resize_canvas_event == true){
        window.addEventListener('resize', ()=>{
         
          let a = document.querySelector('.list-name-container').offsetWidth
          let b = window.innerWidth
          let c = b -a
          document.querySelector('main').style.width = c +'px'
                })
      }
 
    });

    let saveCloseBtn = document.querySelector(".list-name-container .save");
    // Close
    saveCloseBtn.addEventListener("click", () => {
      this.loading_save('visible','Saving . .  Please wait...');

    
      let names = document.querySelectorAll(
        ".list-name-container .list-names table tbody tr"
      );
        let data = []

      names.forEach((element) => {
        element.classList.remove('active')
       let a = element.children[1].innerText.trim()
     let b =   element.children[2].innerText.trim()
     let c =   element.className
   
        let x = {}
        if(element.children[1].innerText.length && element.children[2].innerText.length || element.children[1].innerText.length|| element.children[2].innerText.length) {
      
          x.data_1 = a;
          x.data_2 = b ;
          x.data_3 = c
          data.push(x)
        }
       



      });
      let json_file = JSON.stringify(data);
      //ajax request send
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          parent.style.right = '-503px'
        add_name_btn.style.display = 'block'

         document.querySelector('main').style.width = '100%'
          resize_canvas_event = false

          if(resize_canvas_event == false){
            window.addEventListener('resize', ()=>{
              document.querySelector('main').style.width = '100%'
                    })
  
          }





          this.loading_save('visible','Saved successfuly.');
          this.loading_save('hidden', null);

         
        }
      };
      xhttp.open(
        "POST",
        `http://localhost:5000/saveList?list_data=${json_file} `,
        true
      );
      xhttp.send();
 

    });

    window.addEventListener("paste",   (e) =>{
 
        if(e.target.parentElement.parentElement.parentElement){
          if(e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('list-names')){

          
   
            element.innerHTML = e.clipboardData.getData("text/html");
      
         
         
            let excel_data = element.querySelectorAll("table tr");
        
     
          let inputs = document.querySelectorAll(".list-name-container table tbody tr");
          let a = inputs.length - parseInt(e.target.parentElement.getAttribute('data')) 
       
            if(element.querySelector("table tr")){
              e.preventDefault()
              if(excel_data.length  > a + 1){
                return false
            }else{
       
                // if copied data is 1 column only
                if(excel_data[0].children.length < 2){
               
                 if(e.target.classList.contains('column-1')){
                   for(let i = 0; i < excel_data.length; ) {
               
                     for(let x = 0; x < inputs.length; x++) {
                       if(!excel_data[i].children[0]){
                       
                         break;
                       }
                      if(parseInt(inputs[x].getAttribute('data'))  >= parseInt(e.target.parentElement.getAttribute('data')) ){
                       inputs[x].children[1].innerText = excel_data[i].children[0].innerText
                       inputs[x].querySelector('.eye-show').style.display = 'inline-block';
                       inputs[x].querySelector('.able-download').style.display = 'inline-block';
                       i++
                       if(i > excel_data.length - 1){
                         break;
                       }
                       } 
               
                     }
                     }
                 }
                 if(e.target.classList.contains('column-2')){
                   for(let i = 0; i < excel_data.length; ) {
               
                     for(let x = 0; x < inputs.length; x++) {
                    
                        if(parseInt(inputs[x].getAttribute('data'))  >= parseInt(e.target.parentElement.getAttribute('data')) ){
                        
                       inputs[x].children[2].innerText = excel_data[i].children[0].innerText
                       inputs[x].querySelector('.eye-show').style.display = 'inline-block';
                       inputs[x].querySelector('.able-download').style.display = 'inline-block';
                       i++
                        if(i > excel_data.length - 1){
                          break;
                        }
                       } 
               
                     }
                     }
                 }
               
               
                }
      
      
                 // if copied data is 2 column 
                if( excel_data[0].children.length > 1){
                  if(e.target.classList.contains('column-1')){
                    for(let i = 0; i < excel_data.length; ) {
                      for(let x = 0; x < inputs.length; x++) {
                       
                            if(parseInt(inputs[x].getAttribute('data'))  >= parseInt(e.target.parentElement.getAttribute('data')) ){
                              inputs[x].children[1].innerText = excel_data[i].children[0].innerText
                              inputs[x].children[2].innerText = excel_data[i].children[1].innerText
                              inputs[x].querySelector('.eye-show').style.display = 'inline-block';
                              inputs[x].querySelector('.able-download').style.display = 'inline-block';
                              i++
                              if(i > excel_data.length - 1){
                               break;
                             }
                                } 
                              
                              
                           
                      }
                     
                      
                  }
                  }
                  if(e.target.classList.contains('column-2')){
                    for(let i = 0; i < excel_data.length; ) {
                      for(let x = 0; x < inputs.length; x++) {
                       
                            if(parseInt(inputs[x].getAttribute('data'))  >= parseInt(e.target.parentElement.getAttribute('data')) ){
                              
                              inputs[x].children[2].innerText = excel_data[i].children[0].innerText
                              inputs[x].querySelector('.eye-show').style.display = 'inline-block';
                              inputs[x].querySelector('.able-download').style.display = 'inline-block';
                              i++
                              if(i > excel_data.length - 1){
                               break;
                             }
                                } 
                              
                              
                           
                      }
                     
                      
                  }
                  }
                 
               
                }
       
            }
            }
            //this area exucute after paste event to change the column text in textbox canvas
            let textbox= this.canvas.getObjects().filter((el) => el.name === 'Column-1-textbox' || el.name === 'Column-2-textbox');
            e.target.innerText
            if(e.target.classList.contains('column-1')){
    
             textbox[0].set({text: e.target.innerText}) 
             textbox[1].set({text: e.target.parentElement.children[2].innerText}) 
             
            };
            if(e.target.classList.contains('column-2')){
    
           
            };
            this.canvas.renderAll()
    
          }
        } 
     
   

    });

 

    document
      .querySelector(".list-name-container")
      .addEventListener("click", (e) => {
      

        //remove row
        // if (e.target.classList.contains("delete")) {
        //   e.target.parentElement.remove();
      
          
        // }
      
      });
  }

  // generate certificate
  generate_certificate() {
    const preview_image = document.querySelector("#preview-image");
    const modal = document.querySelector("#modal-container-generate-certificate");
    const closeBtn = document.querySelector("#modal-container-generate-certificate .close");
    closeBtn.addEventListener("click", closeModal);
  

    // Close
    function closeModal() {
      modal.querySelector('.modal-canvas').style.display = "none";

      let printImageView = document.querySelectorAll(".print-view-img");
      printImageView.forEach((item) => {
        item.remove();
      });
    }

   

    preview_image.addEventListener("click", () => {
   
      this.loading("visible",null);
      
      setTimeout(()=>{
        let arrayName = [];
    
        let a = document.querySelectorAll(
          ".list-name-container .list-names table tbody tr"
        );
 
      
        a.forEach((element) => {
          
          if(element.className !== 'disable'){
            if(element.children[1].innerText.length && element.children[2].innerText.length
              || element.children[1].innerText.length || element.children[2].innerText.length) {
                let data = {
                  dataOne: element.children[1].innerText,
                  dataTwo: element.children[2].innerText,
                }
    
            
                arrayName.push(data);
              }
          }
       
        
        
        });
    
     
      let names = arrayName;
      if(names.length){
        let i = 0
    
        const again =()=>{
         let a = this.canvas.getObjects().filter((e) => {
           return e.name === "Column-1-textbox";
         });
         a[0].set({ text: names[i].dataOne });
   
         let b = this.canvas.getObjects().filter((e) => {
           return e.name === "Column-2-textbox";
         });
         b[0].set({ text: names[i].dataTwo });
         var scaleFactor = 1;
         this.canvas.setWidth(this.width  );
         this.canvas.setHeight(this.height );
         this.canvas.setZoom(scaleFactor);
         this.canvas.renderAll();
               let imgSrc = this.canvas
               .toDataURL("image/jpeg", [0.0, 1.0])
     
               const img = document.createElement("img");
               img.setAttribute('name',  a[0].text.trim() || b[0].text.trim());
               img.src = imgSrc
               img.width = "600";
               img.className = "print-view-img";
               document.querySelector("#modal-container-generate-certificate .modal-body").appendChild(img);
                 this.canvas.setHeight(this.canvas.current_height);
           this.canvas.setWidth(this.canvas.current_width);
           this.canvas.setZoom(this.canvas.current_canvasScale);
           this.canvas.renderAll();
     
           i++
           let x = i + 1
          if(i < names.length){
           this.loading("visible",`Generating ${names.length}  certifcates:<br> ${x} completed`);
             setTimeout(()=>{
               
               again()
             })
      
          
          }else{
           let images = document.querySelectorAll(".print-view-img");
   
           var urls = [];
           images.forEach((e) => {
            let data = {}
            data.src = e.src;
            data.name = e.getAttribute('name')
             urls.push(data);
           });
           downloadZip().then(()=>{
             this.loading("visible",`<h4> Successfuly Downloaded  ${names.length}  certifcates</h4> <br>  <div class="btn  btn-md btn-success done-download">Close</div>`);
     
             document.querySelector('.done-download').addEventListener('click',  ()=>{
               this.loading("hidden",null);
              })

              //delete created images after download
              document.querySelector("#modal-container-generate-certificate .modal-body").innerHTML = ''
           });
           function downloadZip() {
   
             return new Promise((resolve, reject) => {
               var zip = new JSZip();
               var count = 0;
               var zipFilename = "zipFilename.zip";
       
               urls.forEach(function (url) {
                 var filename =url.name;
                 // loading a file and add it in a zip file
                 JSZipUtils.getBinaryContent(url.src, function (err, data) {
                   if (err) {
                     throw err; // or handle the error
                   }
                   var img = zip.folder("images");
                   img.file(filename + ".png", data, { binary: true });
                   count++;
                   if (count == urls.length) {
                     zip.generateAsync({ type: "blob" }).then(function (content) {
                       const a = document.createElement("a");
                       a.href = URL.createObjectURL(content);
                      
                       document.body.appendChild(a);
                       a.download = zipFilename;
                       a.click();
                       document.body.removeChild(a);
       
                       // saveAs(content, "zipFilename");
                     });
                   }
                 });
               });
           
               resolve()
             })
       
           }
     
    
        
          }
   
         
       
       }
       again()
      }else{
        this.loading("visible",`<h4> No names added </h4> <br>  <div class="btn  btn-md btn-danger text text-white done-download">Close</div>`);
     
             document.querySelector('.done-download').addEventListener('click',  ()=>{
               this.loading("hidden",null);
              })
      }
    

   


      
      },1000)
 
     
   
    });
  }

  //insert name on textbox
  insert_textbox() {
    const doubleClick = (e) => {

      if (e.target && e.target.name == "Column-1-textbox") {
       
       document.querySelector(".list-name-container").style.display = "block"    
  
      }
      if (e.target && e.target.name == "Column-2-textbox") {
       
        document.querySelector(".list-name-container").style.display = "block"    
   
       }
 
    };
    this.canvas.on({
      "mouse:dblclick": doubleClick,
    });

  
  
  }

  download_as_Zip() {
    const download_as_Zip = document.querySelector("#download_as_Zip");
    download_as_Zip.onclick = () => {
      let images = document.querySelectorAll(".print-view-img");

      var urls = [];
      images.forEach((e) => {
        urls.push(e.src);
      });
      downloadZip();
      function downloadZip() {
        var zip = new JSZip();
        var count = 0;
        var zipFilename = "zipFilename.zip";

        urls.forEach(function (url) {
          var filename = "filename";
          // loading a file and add it in a zip file
          JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
              throw err; // or handle the error
            }
            var img = zip.folder("images");
            img.file(filename + "_" + count + ".png", data, { binary: true });
            count++;
            if (count == urls.length) {
              zip.generateAsync({ type: "blob" }).then(function (content) {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);

                document.body.appendChild(a);
                a.download = zipFilename;
                a.click();
                document.body.removeChild(a);

                // saveAs(content, "zipFilename");
              });
            }
          });
        });
      }

      // let images = document.querySelectorAll(".test-image");
      // images.forEach((e) => {
      //   e.remove();
      // });
    };
  }
 

 
  
}
