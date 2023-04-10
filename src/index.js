
import {fabric} from 'fabric';
import { Canvas } from "./canvas/canvas";
let FontFaceObserver = require('fontfaceobserver');

import '../sass/canvas-css/main-canvas.scss'


const open_file = () => {
  
  function replaceBreakLine(valueToEscape) {
    if (valueToEscape != null && valueToEscape != "") {
   
       return valueToEscape.replaceAll('<-br->','\n');
    } else {
       return valueToEscape;
    } 
  }
  
  function replaceQoute(valueToEscape){
  if (valueToEscape != null && valueToEscape != "") {
  
    return valueToEscape.replaceAll('<-q->',"'");
  } else {
    return valueToEscape;
  } 
  }
   
   
  let json_parsed = JSON.parse(template_json);
  let a = json_parsed.json.objects
  a.forEach((e)=>{
  if(e.type === 'textbox'){
  e.text = replaceQoute(replaceBreakLine(e.text)) 
  }
  })
  
  
       
  let canvasScale = 1;
  let SCALE_FACTOR = 1.1;
  let width = json_parsed.size.w;
  let height = json_parsed.size.h;
  document.querySelector("#file_name").innerHTML = template_name
  
//create new canvas
const canvas = () => {
let c = document.createElement("canvas");
c.id = "canvas";
document.querySelector("#canvas-background").appendChild(c);
return new fabric.Canvas("canvas", {
width: json_parsed.size.w,
height: json_parsed.size.h,
backgroundColor: "#fff",
preserveObjectStacking: true,
 
selection:false,
imageSmoothingEnabled: false

});
};
      
const canvas_created = canvas();
//load json file after creating canvas
canvas_created.loadFromJSON(json_parsed.json, function(){
let a = canvas_created.getObjects()
a.forEach((e)=>{
if(e.type === 'textbox'){
 

e.centeredScaling = true
e.setControlsVisibility({mt: false,mb: false,tr: false,tl: false,br: false,bl: false, mtr: false})
if(e.name === 'Column-2-textbox'){
e.editable = false
}
if(e.name === 'Column-1-textbox'){
e.editable = false
}
e.lockMovementX = true
canvas_created.renderAll()

}
if(e.name === 'bg-image'){
e.lockMovementX = true
e.lockMovementY = true
e.lockScalingX = true
e.lockScalingX = true
e.lockRotation = true
e.selectable = false;
e.hoverCursor = "default";
}


})
//create grid

// let canvas_created = canvas(width, height);
let partition_width = canvas_created.getWidth() / 36
let partition_height = canvas_created.getHeight() / 36

for (var i = 0; i <  36; i++) {

if(i == 9 * 2){//50%

  // vertical position
canvas_created.add(new fabric.Line([ partition_width * i , 0, partition_width * i, canvas_created.getHeight()], { type:'line',name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', strokeWidth: 2, selectable: false,opacity:1 }));

}
if(i == 9){// 25%

  // vertical position
canvas_created.add(new fabric.Line([ partition_width * i , 0, partition_width * i, canvas_created.getHeight()], { type:'line',name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', strokeWidth: 2, selectable: false,opacity:1 }));

}
if(i == 9 * 3){//75%

  // vertical position
canvas_created.add(new fabric.Line([ partition_width * i , 0, partition_width * i, canvas_created.getHeight()], { type:'line',name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', strokeWidth: 2, selectable: false,opacity:1 }));

}

else{
// vertical position
canvas_created.add(new fabric.Line([ partition_width * i , 0, partition_width * i, canvas_created.getHeight()], { type:'line',name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', selectable: false,opacity:1 }));

}


if(i == 9 * 2){//50%

canvas_created.add(new fabric.Line([ 0,partition_height * i, canvas_created.getWidth(), partition_height * i], { type: 'line', name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', strokeWidth: 2, selectable: false,opacity:1 }))

}
if(i == 9){// 25%

canvas_created.add(new fabric.Line([ 0,partition_height * i, canvas_created.getWidth(), partition_height * i], { type: 'line', name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', strokeWidth: 2,selectable: false,opacity:1 }))

}
if(i == 9 * 3){//75%

canvas_created.add(new fabric.Line([ 0,partition_height * i, canvas_created.getWidth(), partition_height * i], { type: 'line', name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', strokeWidth: 2,selectable: false,opacity:1 }))

}

else{
// vertical position
canvas_created.add(new fabric.Line([ 0,partition_height * i, canvas_created.getWidth(), partition_height * i], { type: 'line', name:'grid-lines', stroke: 'rgba(14, 146, 128, 0.671)', selectable: false,opacity:1 }))

}
// horizontal position
// canvas_created.add(new fabric.Line([ 0, i * grid, canvas_created.getWidth(), i * grid], { type: 'line', name:'grid-lines', stroke: '#000', selectable: false,opacity:1 }))
}

let objs = canvas_created.getObjects().filter(function(obj){
return obj.name == 'grid-lines';
});
//group all the objects 
var alltogetherObj = new fabric.Group(objs,{
// top:200,left:250,
lockMovementY:true,
lockMovementX:true,
selectable:false,
excludeFromExport: true,
opacity:0,
name:'grid',
originX:'center',
originY:'center'});
canvas_created.add(alltogetherObj);
let bg = canvas_created.getObjects().filter((obj)=>{
  return obj.name == 'bg-image' && obj.opacity == 1;
})
if(bg){
  let index = canvas_created.getObjects().indexOf(bg[0]); 
 alltogetherObj.moveTo(index + 1);
}else{
  canvas_created.sendToBack(alltogetherObj);
}


canvas_created.viewportCenterObject(alltogetherObj);




//remove previously created grid lines
objs.forEach(function(obj){
canvas_created.remove(obj);
});

});

canvas_created.template_id = template_id //saving the template id in canvas



 
                  let index = 1
                  let arr = [{w:632.6070623591283,h:447.0323065364387,z:0.7513148009015777},
                    {w:842,h:595,z:1},
                    {w:1232.7722000000003, h:871.1395000000002, z:1.4641000000000006}]
                    let per = ['75%', '85%', '100%']
                 
                function zoomIn(selector) {

                let zoomIn = document.querySelector(selector);
                zoomIn.addEventListener("click", () => {
 
                console.log(arr.length);
                if(index  == arr.length -1){
                return false
                }
                index += 1
                document.querySelector('#canvas').style.transition = 'none'
                document.querySelector('.upper-canvas').style.transition = 'none'

                canvasScale = canvasScale * SCALE_FACTOR;
                canvas_created.setHeight(arr[index].h);
                canvas_created.setWidth(arr[index].w);
                canvas_created.setZoom(arr[index].z);

                document.querySelector('.zoom-container span').innerText = per[index]

                });
                }
                zoomIn("#zoomIn");

                function zoomOut(selector) {
                let zoomOut = document.querySelector(selector);

                zoomOut.addEventListener("click", (e) => {
                document.querySelector('#canvas').style.transition = 'none'
                document.querySelector('.upper-canvas').style.transition = 'none'

                if(index == 0){
                return false
                }
                index -= 1
                canvasScale = canvasScale * SCALE_FACTOR;
                canvas_created.setHeight(arr[index].h);
                canvas_created.setWidth(arr[index].w);
                canvas_created.setZoom(arr[index].z);

                document.querySelector('.zoom-container span').innerText = per[index]


                });
                }

                zoomOut("#zoomOut");
                  
    
         
                  let canvasInit = new Canvas({
                    canvas: canvas_created,
                    width: fabric.util.parseUnit(width),
                    height: fabric.util.parseUnit(height),
                    canvasScale: canvasScale,
                    SCALE_FACTOR: SCALE_FACTOR,
              
                    });
                    canvasInit.create_main_canvas();
           
        
          
}

 
    
        var fonts = [
          "Roboto",
          "Scope One",
          "Zen Kurenaido",
          "Rubik Mono One",
          "Annie Use Your Telescope",
          "Dancing Script",
          "Work Sans",
          "Open Sans",
          "Titan One",
          "Fredoka One",
          "Arial"
        ];
        const loadAndUse = (font) => {
           return new Promise((resolve, reject) => {
            for(let i=0; i< font.length; i++) {
              var myfont = new FontFaceObserver(font[i]);
              myfont
                .load()
                .then(() => {
                  // when font is loaded, use it.
        
                  
                  resolve()
                })
                .catch((e) => {
                  let log = 'error loading font';
                  reject(log)
                });
            }
    
           })
       
         
        };   
          loadAndUse(fonts).then(()=>{
           
        
          }).catch((e)=>{
          
          }); 
      
          open_file()

