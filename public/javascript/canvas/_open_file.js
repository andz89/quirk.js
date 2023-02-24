import { Canvas } from "./canvas.js";

export class Open_file {
  get_file_json(json,template_id,template_name) {

 
  let json_parsed = JSON.parse(json);
 
    
 
    const run_json_file = (canvas_saved) => {
      let canvasScale = 1;
      let SCALE_FACTOR = 1.1;
      // let width = "1754";
      // let height = "1240";
       let width = json_parsed.size.w;
       let height = json_parsed.size.h;
      document.querySelector("#file_name").innerHTML = template_name

      const canvas = (width, height) => {
        let c = document.createElement("canvas");
        c.id = "canvas";
        document.querySelector("#canvas-background").appendChild(c);
        return new fabric.Canvas("canvas", {
          width: width,
          height: height,
          backgroundColor: "#fff",
          preserveObjectStacking: true,
          centeredScaling:true
        });
      };
      let canvas_created = canvas(width, height);
 
     
  
            canvas_created.loadFromJSON(canvas_saved.json, function(){
        
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
        
             let a = canvas_created.getObjects()
             a.forEach((e)=>{
              if(e.type === 'textbox'){
                
                e.text = replaceQoute(replaceBreakLine(e.text) ) 
                e.centeredScaling = true
                e.setControlsVisibility({mt: false,mb: false,tr: false,tl: false,br: false,bl: false, mtr: false})
                if(e.name === 'Column-1-textbox' || e.name === 'Column-2-textbox'){
                  e.editable = false
                }
                e.lockMovementX = true
                canvas_created.renderAll()

              }
             })
        
        
              canvas_created.template_id = template_id //saving the template id in canvas
           
           
        
              let canvasInit = new Canvas({
                canvas: canvas_created,
                width: fabric.util.parseUnit(width),
                height: fabric.util.parseUnit(height),
                canvasScale: canvasScale,
                SCALE_FACTOR: SCALE_FACTOR,
              });
              canvasInit.create_main_canvas();
         
              function fitCanvasToScreen() {
                // this.canvasScale = 1;
                if (width >= 3000) {
                  SCALE_FACTOR = 5.2;
                } else if (width <= 2999 && width >= 2000) {
                  SCALE_FACTOR = 2.8;
                } else if (width <= 1999 && width >= 1000) {
                  SCALE_FACTOR = 2.1;
                } else {
                  SCALE_FACTOR = 1.1;
                }
                canvasScale = canvasScale / SCALE_FACTOR;
                canvas_created.setHeight(height * (1 / SCALE_FACTOR));
                canvas_created.setWidth(width * (1 / SCALE_FACTOR));
                canvas_created.setZoom(canvasScale);
        
                canvas_created.current_canvasScale = canvasScale;
                canvas_created.current_width = canvas_created.getWidth();
                canvas_created.current_height = canvas_created.getHeight();
                canvas_created.renderAll();
              }
        
              fitCanvasToScreen();
        
              function zoomIn(selector) {
                SCALE_FACTOR = 1.1;
        
                let zoomIn = document.querySelector(selector);
                zoomIn.addEventListener("click", () => {
                  canvasScale = canvasScale * SCALE_FACTOR;
                  canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
                  canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
                  canvas_created.setZoom(canvasScale);
        
                  canvas_created.current_canvasScale = canvasScale;
                  canvas_created.current_width = canvas_created.getWidth();
                  canvas_created.current_height = canvas_created.getHeight();
                  canvas_created.renderAll();
                });
              }
              zoomIn("#zoomIn");
        
              function zoomOut(selector) {
                let zoomOut = document.querySelector(selector);
                SCALE_FACTOR = 1.1;
        
                zoomOut.addEventListener("click", (e) => {
                  canvasScale = canvasScale / SCALE_FACTOR;
                  canvas_created.setHeight(
                    canvas_created.getHeight() * (1 / SCALE_FACTOR)
                  );
                  canvas_created.setWidth(
                    canvas_created.getWidth() * (1 / SCALE_FACTOR)
                  );
                  canvas_created.setZoom(canvasScale);
        
                  canvas_created.current_canvasScale = canvasScale;
                  canvas_created.current_width = canvas_created.getWidth();
                  canvas_created.current_height = canvas_created.getHeight();
                  canvas_created.renderAll();
                });
              }
        
              zoomOut("#zoomOut");
       
            });
    
   
     
     
  
    
    };

    var fonts = [
      "Roboto",
      "Scope One",
      "Zen Kurenaido",
      "Rubik Mono One",
      "Annie Use Your Telescope",
      "Dancing Script",
      "Work Sans",
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
        run_json_file(json_parsed);
      }).catch((e)=>{
        console.log(e)
      }); 
    
     
      
 


   


  }
}
