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

 
   
   
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
       
          let data = JSON.parse(xhttp.responseText);
          setTimeout(()=>{
            this.loading_save('visible','Saved');

          },1000)
      
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
        `http://localhost:5000/saved-template?saved_json=  `+ encodeURIComponent(json_file) + `&template_id=${this.canvas.template_id}&purchased_id=${purchased_id}`,
        true
      );
      xhttp.send();
    });
  }