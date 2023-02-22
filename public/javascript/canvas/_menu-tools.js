import { Modification } from "./_modification.js";

export class Menu_tools extends Modification {
  loadPage() {
    
 
    let link = canvas_image;
   let a = this.canvas.getObjects().forEach((e)=>{
      return e.name === "background-image";
    })

if(a ==  undefined){
  fabric.Image.fromURL(link, (img) => {
    img.excludeFromExport = true;
    img.name = "background-image";
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
  // textbox
  insertText(selector) {
    let insert_text = document.querySelector(selector);
    insert_text.addEventListener("click", () => {
      let object = new fabric.Textbox("Your Text Here", {
        textAlign: "center",

        // fontSize: Math.floor(this.canvas.getWidth() / 15)  ,
        
        
        id: this.uniqueId() ,
        dirty: true,
        // width: 400,//this.canvas.getWidth() * .80
         width: 100,
        splitByGrapheme: true,
        // height: 1900,
        centeredScaling: true,
      });
      
 
      object.scaleToWidth(400)
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

 

  paste_text() {
    window.addEventListener("paste", (e) => {
      let obj = this.canvas.getActiveObject()
      this.canvas.text = obj.text
      setTimeout(()=>{
       
        let obj = this.canvas.getActiveObject()
        obj.removeStyle('styles')
        obj.removeStyle('fontStyle')
        obj.removeStyle('stroke')
        obj.removeStyle('strokeWidth')
        obj.removeStyle('fontWeight')
 
        if( obj.name === 'footer-position') {
          if(obj.text.length > 120){
            obj.text = this.canvas.text
           
          }
        }
        if(obj.name === 'footer-name'){
          if(obj.text.length > 80){
            obj.text = this.canvas.text
          }
        }
      
        this.canvas.renderAll();
      })
   
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
    //  insert-data
    let element = document.querySelector(".excel-html-view-data");
    let list_names = document.querySelector(".list-name-container .list-names");
    let parent = document.querySelector(".list-name-container");
    let add_name_btn = document.querySelector("#insert-names");
    add_name_btn.addEventListener("click", () => {
      parent.style.display = "block";
    });

    let saveCloseBtn = document.querySelector(".list-name-container .save");
    // Close
    saveCloseBtn.addEventListener("click", () => {
      let textbox_1 = this.canvas.getObjects().filter((el) => el.name === 'Column-1-textbox');
      let textbox_2 = this.canvas.getObjects().filter((el) => el.name === 'Column-2-textbox');
      if(document.querySelector(".list-name-container .list-names .input-container input")){
        let aa = document.querySelector(
          ".list-name-container .list-names .input-container"
        ).children[0];
        let bb = document.querySelector(
          ".list-name-container .list-names .input-container"
        ).children[1];
     
        if(aa){
          textbox_1[0].set({text: aa.value}) 
        }
   
        if(textbox_2 && bb){
          textbox_2[0].set({text: bb.value}) 
        }
        this.canvas.renderAll()
        
      }
    
      parent.style.display = "none";
    });

    window.addEventListener("paste",   (e) =>{

      // setTimeout(()=>{e.target.value = ''})


        element.innerHTML = e.clipboardData.getData("text/html");

        let aa = element.querySelectorAll("table tr");
  
        aa.forEach((element) => {
          if (element.children.length > 1) {
            let a = element.children[0].innerText;
            let b = element.children[1].innerText;
  
            let div = document.createElement("div");
            div.classList.add("input-container");
            div.innerHTML = `
                  
            <input type="text" value="${a}">
            <input type="text" value="${b}">
  
            <div>
            <span class="btn btn-sm btn-danger delete text text-white">Remove</span>
            </div>
  
                  `;
            list_names.appendChild(div);
            div.scrollIntoView();
      
          
          } else {
            let a = element.children[0].innerText;
            let b = " ";
  
            let div = document.createElement("div");
            div.classList.add("input-container");
            div.innerHTML = `
                  
        <input type="text" value="${a}">
        <input type="text" value="${b}">
  
        <div>
        <span class="btn btn-sm btn-danger delete text text-white">Remove</span>
        </div>
  
  
                
  
              `;
  
            list_names.appendChild(div);
            div.scrollIntoView();

        
          }
        });
      

  
    });

    //insert name tools
    document
      .querySelector(".list-name-container")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("add-rows")) {
  
          let div = document.createElement("div");
          div.classList.add("input-container");

          div.innerHTML = `
              
        <input type="text" value="" placeholder="click to type">
        <input type="text" value="" placeholder="click to type">


        <div>
        <span class="btn btn-sm btn-danger delete text text-white">Remove</span>
        </div>

              `;
          list_names.appendChild(div);
          div.scrollIntoView();
        }

        //remove row
        if (e.target.classList.contains("delete")) {
          e.target.parentElement.parentElement.remove();
        }
        //swap column
        if (e.target.classList.contains("swap-column")) {
          let names = document.querySelectorAll(
            ".list-name-container .list-names .input-container"
          );
          let column_A = [];
          let column_B = [];
          names.forEach((element) => {
            column_A.push(element.children[0].value);
            column_B.push(element.children[1].value);

            column_A.forEach((text) => {
              //column B input
              element.children[1].value = text;
              let a = this.canvas.getObjects().filter((e) => {
                return e.name === "Column-1-textbox";
              });

              a[0].set({ text: text });
              this.canvas.renderAll();
            });
            column_B.forEach((text) => {
             //column A input
             element.children[0].value = text;
             let a = this.canvas.getObjects().filter((e) => {
               return e.name === "Column-2-textbox";
             });
             a[0].set({ text: text });
             this.canvas.renderAll();
            });
          });
        }
        //clear all rows
        if (e.target.classList.contains("clear-all")) {
          let names = document.querySelectorAll(
            ".list-name-container .list-names .input-container"
          );
          names.forEach((element) => {
            element.remove();
          });
        }
      });
  }

  // generate certificate
  generate_certificate() {
    const preview_image = document.querySelector("#preview-image");
    const modal = document.querySelector("#modal-container");
    const closeBtn = document.querySelector(".modal-canvas .close");
    closeBtn.addEventListener("click", closeModal);
  

    // Close
    function closeModal() {
      modal.style.display = "none";

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
          ".list-name-container .list-names .input-container"
        );

        a.forEach((element) => {
          let data = {
            dataOne: element.children[0].value,
            dataTwo: element.children[1].value,
          }
          arrayName.push(data);
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
            document.querySelector(".modal-body").appendChild(img);
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
        document.querySelector(".modal-canvas").style.display = "block";
      this.loading("hidden",null);
      
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
