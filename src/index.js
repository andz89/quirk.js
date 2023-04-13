
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
 
selection: user_role == 'admin'? true: false,
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
 
 
// Set the canvas dimensions
var canvasWidth =canvas_created.getWidth() + 10;
var canvasHeight =canvas_created.getHeight() + 5;

// Create a new Fabric.js canvas


// Create the vertical grid lines
for (var x = 0; x <= canvasWidth; x += 50) {
 
if(x == 100){
var line = new fabric.Line([x, 0, x, canvasHeight], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1,
});
}
else if(x == 200){
var line = new fabric.Line([x, 0, x, canvasHeight], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1,
});
}
else if(x == 300){
var line = new fabric.Line([x, 0, x, canvasHeight], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1,
});
}
else if(x == 550){
var line = new fabric.Line([x, 0, x, canvasHeight], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1,
});
}
else if(x == 650){
var line = new fabric.Line([x, 0, x, canvasHeight], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1,
});
}
else if(x == 750){
var line = new fabric.Line([x, 0, x, canvasHeight], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1,
});
}
 
else{
var line = new fabric.Line([x, 0, x, canvasHeight], {
stroke: 'gray',
selectable: false,
name: 'grid-lines',
strokeDashArray: [5, 5],
});
}
canvas_created.add(line);
}

// Create the horizontal grid lines
for (var y = 0; y <= canvasHeight; y += 50) {

if(y == 300){
var line = new fabric.Line([0, y, canvasWidth, y], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:2,
  
});



}

else if(y == 150){
var line = new fabric.Line([0, y, canvasWidth, y], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1
});



}
else if(y == 450){
var line = new fabric.Line([0, y, canvasWidth, y], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeWidth:1
});



}
else{
var line = new fabric.Line([0, y, canvasWidth, y], {
  stroke: 'gray',
  selectable: false,
  name: 'grid-lines',
  strokeDashArray: [5, 5],
});

}



canvas_created.add(line);


}
//center line 


// Create a new Fabric.js canvas


// Calculate the x position of the center of the canvas
var centerX = canvasWidth / 2;

// Create the vertical line
var line_center = new fabric.Line([centerX, 0, centerX, canvasHeight], {
stroke: 'gray',
selectable: false,
stroke: 'gray',
strokeWidth:2,
name: 'grid-lines'
});
canvas_created.add(line_center);



let objs = canvas_created.getObjects().filter(function(obj){
return obj.name == 'grid-lines';
});
//group all the objects 
var alltogetherObj = new fabric.Group(objs,{
 
lockMovementY:true,
lockMovementX:true,
selectable:false,
excludeFromExport: true,
opacity:0,
name:'grid',
hoverCursor:'default',
 });
canvas_created.add(alltogetherObj);
let bg = canvas_created.getObjects().filter((obj)=>{
  return obj.name == 'bg-image' && obj.opacity == 1;
})

if(bg){

  canvas_created.sendToBack(bg[0]);

  let index =canvas_created.getObjects().indexOf(bg[0]); 
  alltogetherObj.moveTo(index + 1);
 
} else{
  

  canvas_created.sendToBack(alltogetherObj);

}

canvas_created.viewportCenterObject(alltogetherObj);




//remove previously created grid lines
objs.forEach(function(obj){
canvas_created.remove(obj);
});
canvas_created.renderAll()
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

