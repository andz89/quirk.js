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
                  <img src='http://localhost:5000/images/ci/${e.thumbnail_image}' width="150px">
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
                      return  e ==='http://localhost:5000/images/ci/'+ image_name 
                  
                     })
                    
                   if(b != ''){
                    //kung naa
                let a = this.canvas.getObjects().filter((e)=>{
                        return e.type == 'image';
                      })
                    
                   
                     a.forEach((e)=>{

                        if(e._originalElement.currentSrc == 'http://localhost:5000/images/ci/'+ image_name){
                        e.opacity = 1;
                        this.canvas.renderAll()
                        }
                     })

                     add_bg_image.style.display ="none"
                   }else{
                    //kung wala
                    console.log('wala');

                    link ='http://localhost:5000/images/ci/'+ image_name 
                    link_save.push(link)
                    console.log(b);
                   
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
                 });

                 add_bg_image.style.display ="none"
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
    
if(a ==  false){
  console.log('execute');
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

  download_as_image() {
    const download_image = document.querySelector("#download-image");
    download_image.onclick = () => {
      var scaleFactor = 1;
      this.canvas.setWidth(this.width * scaleFactor);
      this.canvas.setHeight(this.height * scaleFactor);
      this.canvas.setZoom(scaleFactor);

      this.canvas.renderAll();

      let display_name = document.querySelector("#file_name").innerHTML;
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = this.canvas.toDataURL({
        format: "png",
        // quality:  1
      });
      a.download = `${display_name}.png`;
      a.click();
      document.body.removeChild(a);

      this.canvas.setHeight(this.canvas.current_height);
      this.canvas.setWidth(this.canvas.current_width);
      this.canvas.setZoom(this.canvas.current_canvasScale);
    };
  }

  paste_text() {
    window.addEventListener("paste", (e) => {
    
    
      let obj = this.canvas.getActiveObject()
      if(obj){
        e.preventDefault()
        let text = e.clipboardData.getData("text");
        obj.text = text
        this.canvas.renderAll()
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

 

 save_file_json() {
  //limit maximum 10,500 characters
  //target limit 10,000 characters
    document.getElementById("save_json").addEventListener("click", () => {
 this.loading_save('visible','Saving . .  Please wait...');
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
        "fontStyle",
        "lineHeight",
        "charSpacing",
        "styles",
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
"selectionStyle",
        
    ];
  
    let json = this.canvas.toJSON([
      "id",
      "name",
    
      
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

  textbox_property.forEach((c)=>{
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

 
   
   
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
       
          let data = JSON.parse(xhttp.responseText);
          if(data === 'ok'){
            this.loading_save('visible','Saved successfuly.');
            setTimeout((e)=>{
              document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
            },500)
       
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
        `http://localhost:5000/saved-template?saved_json=  `+ encodeURIComponent(json_file) + `&template_id=${this.canvas.template_id}`,
        true
      );
      xhttp.send();
    });
  }

  
 

  //insert data
  insertData() {

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
  
     


        `;
        document.querySelector(".list-name-container table tbody ").appendChild(div)
        
     
  div.scrollIntoView();
 
 
  
  if(i + 2 > count ){
    resolve()
  
   }
 } 


  })
 }
 




createTable().then(()=>{
    if(list){
      let excel_data =  JSON.parse(list);
  
        let inputs = document.querySelectorAll(".list-name-container table tbody tr ");
 
        for(let i = 0; i < excel_data.length; ) {
      
          for(let x = 0; x < inputs.length; x++) {
            
           
        
              inputs[x].children[1].innerText = excel_data[i].data_1 
              inputs[x].children[2].innerText = excel_data[i].data_2 
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
      <td class="xl65 column-1" style="border-right:.5pt solid black;
     " contenteditable="true"></td>
      <td class="xl65 column-2" style="border-right:.5pt solid black;
    border-left:none; " contenteditable="true"></td>
 
      `;
      document.querySelector(".list-name-container table tbody").appendChild(div)
   
      }
  
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
        if(e.target.classList.contains('xl65')){
          let tr = document.querySelectorAll(
            ".list-name-container .list-names  table tbody tr"
          ) 
      
          Array.from(tr).forEach((ev)=>{
            ev.classList.remove('active')
           
          })
          e.target.parentElement.classList.add('active');
          let textbox= this.canvas.getObjects().filter((el) => el.name === 'Column-1-textbox' || el.name === 'Column-2-textbox');


          textbox[0].set({text: e.target.parentElement.children[1].innerText ? e.target.parentElement.children[1].innerText:'Column-1-textbox'}) 
          textbox[1].set({text: e.target.parentElement.children[2].innerText ? e.target.parentElement.children[2].innerText:'Column-2-textbox'}) 
          this.canvas.renderAll()
        }
        if(e.target.classList.contains('select-all')){
          let tr = document.querySelectorAll(
            ".list-name-container .list-names  table tbody tr"
          ) 
      
          Array.from(tr).forEach((ev)=>{
            ev.classList.add('active')
           
          })
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


            // names.forEach((element) => {
          
           
            //   if(element.children[1].innerText.length && element.children[2].innerText.length || element.children[1].innerText.length || element.children[2].innerText.length) {
            //     let a = element.children[1].innerText 
            //     let b = element.children[2].innerText;
            //     element.children[1].innerText = b
            //     element.children[2].innerText = a
            //   }
           
          
            // });
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
              }
            
             
            })
      
          }
          if(e.target.classList.contains('sentence-case')){

              //to change the column text to sentence case
              // let names = document.querySelectorAll(
              //   ".list-name-container .list-names table tr"
              // );
           
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


                // names.forEach((element) => {
                 
                // });
              
 
          }
      
    })



    add_name_btn.addEventListener("click", () => {
      this.canvas.discardActiveObject()
      this.canvas.renderAll()
      parent.style.right = 0

 
      // document.querySelector('main').style.alignItems = 'flex-start'
     let a = document.querySelector('.list-name-container').offsetWidth
      let b = window.innerWidth
    let c = b -a
      document.querySelector('main').style.width = c +'px'

 
 
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
       let a = element.children[1].innerText.trim()
     let b =   element.children[2].innerText.trim()
     element.children[1].innerText = a
     element.children[2].innerText = b
        let x = {}
        if(element.children[1].innerText.length && element.children[2].innerText.length || element.children[1].innerText.length|| element.children[2].innerText.length) {
      
          x.data_1 = a;
          x.data_2 = b ;
          data.push(x)
        }
       



      });
      let json_file = JSON.stringify(data);
      //ajax request send
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
 
 
 
           
          parent.style.right = '-550px'
         

         document.querySelector('main').style.width = '100%'
          
          this.loading_save('visible','Saved successfuly.');
           document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
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
      console.log('ckicj');
      this.loading("visible",null);
      
      setTimeout(()=>{
        let arrayName = [];
    
        let a = document.querySelectorAll(
          ".list-name-container .list-names table tbody tr"
        );
 
      
        a.forEach((element) => {
          if(element.children[1].innerText.length && element.children[2].innerText.length
          || element.children[1].innerText.length || element.children[2].innerText.length) {
            let data = {
              dataOne: element.children[1].innerText,
              dataTwo: element.children[2].innerText,
            }

        
            arrayName.push(data);
          }
        
        
        });
    
     
      let names = arrayName;
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
          urls.push(e.src);
        });
        downloadZip().then(()=>{
          this.loading("visible",`<h4> Successfuly Downloaded  ${names.length}  certifcates</h4> <br>  <div class="btn  btn-md btn-success done-download">Close</div>`);
  
          document.querySelector('.done-download').addEventListener('click',  ()=>{
            this.loading("hidden",null);
           })
        });
        function downloadZip() {

          return new Promise((resolve, reject) => {
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
        
            resolve()
          })
    
        }
  
 
     
       }

      
    
    }
    again()

   


      
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
