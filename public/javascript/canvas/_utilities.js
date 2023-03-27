import { Global } from "./_global.js";
 
export class Utilities extends Global {
 

  //click on object in the canvas event
  canvasOn() {
    const select_object = (o) => {
      var activeObj = o.selected[0];

     
      // bold text
      let bold = document.querySelector("#bold");
      if (activeObj.type == "textbox" && activeObj.fontWeight === "bold") {
        bold.style.backgroundColor = "rgba(87, 86, 86, 0.733)";
      }
      if (activeObj.type == "textbox" && activeObj.fontWeight === "normal") {
        bold.style.backgroundColor = "";
      }
      if (activeObj.type !== "textbox") {
        bold.style.backgroundColor = "";
      }
      // -------------------------------------//

      // italic text
      let italic = document.querySelector("#italic");
      if (activeObj.type == "textbox" && activeObj.fontStyle === "italic") {
        italic.style.backgroundColor = "rgba(87, 86, 86, 0.733)";
      }
      if (activeObj.type == "textbox" && activeObj.fontStyle === "normal") {
        italic.style.backgroundColor = "";
      }
      if (activeObj.type !== "textbox") {
        italic.style.backgroundColor = "";
      }
      // -------------------------------------//

      // fontSize
      if (activeObj.type == "textbox") {
        document.querySelector("#fontSize").value = activeObj.fontSize
       
      let a =  document.getElementById("fontFamilySelect").selectedIndex = activeObj.fontFamily;
      document.getElementById("fontFamilySelect").value= a
      } else {
        document.querySelector("#fontSize").value = "";
      }
      // -------------------------------------//

 
      activeObj.set("cornerSize", 8);
      activeObj.setControlsVisibility({ mtr: false });
      activeObj.set("borderColor", "#333");
      activeObj.set("cornerColor", "#17a2b8");

      activeObj.set("cornerStyle", "circle");
      activeObj.set("transparentCorners", false);
      activeObj.set("lockUniScaling", true);
 

   
    };

  

  
 


    const moving_object =(o)=>{
   
      if(o){
        let activeObj = o.target;
         this.canvas.getObjects().forEach((e)=>{

          if(activeObj.name == 'footer-name' ){
            if(e.name == 'footer-name'){
         
              e.top = activeObj.top;

       
                this.canvas.setActiveObject(e);
                 this.canvas.renderAll()
                 this.canvas.discardActiveObject(e)
            }
          }
          if(activeObj.name == 'footer-position' ){
            if(e.name == 'footer-position'){
              e.top = activeObj.top;
                this.canvas.setActiveObject(e)
               
                this.canvas.renderAll()
                this.canvas.discardActiveObject(e)
            }
          }
        
         
        })

        
    
      }
   
    }

    this.canvas.on({
      "selection:updated": select_object,
      "selection:created": select_object,
 
  
      'object:moving': moving_object,
    
    });
  }

  // arrow movement // mirror
  mirror_movement() {
    var Direction = {
      LEFT: 0,
      UP: 1,
      RIGHT: 2,
      DOWN: 3,
    };
    document.body.addEventListener('keydown', function(e){
      if(e.code == 'ArrowUp' || e.code == 'ArrowDown'){
        e.preventDefault();

        // return false;
      };
    })
    fabric.util.addListener(document.body, "keydown", (options) => {

      if (options.repeat) {
        return;
      }
      let object = this.canvas.getActiveObject();

   
      const mirror =()=>{
        if(object){
          let activeObj = object
           this.canvas.getObjects().forEach((e)=>{
  
            if(activeObj.name == 'footer-name' ){
              if(e.name == 'footer-name'){
           
                e.top = activeObj.top;
                if(e !== object){
                  this.canvas.setActiveObject(e);
                  e.set('borderColor', 'transparent')
                  e.set('cornerColor', 'transparent')
            
                }
        
                   this.canvas.renderAll()
              }
            }
            if(activeObj.name == 'footer-position' ){
              if(e.name == 'footer-position'){
                e.top = activeObj.top;
                if(e !== object){
                  this.canvas.setActiveObject(e);
                  e.set('borderColor', 'transparent')
                  e.set('cornerColor', 'transparent')
            
                }
                  this.canvas.renderAll()
   
              }
            }
   
          })
  
          
      
        }
      }
      if (object) {


       
         
          var key = options.which || options.keyCode; // key detection
          if (key === 37) {
            // handle Left key
            
 
            this.moveSelected(Direction.LEFT);
           
          } else if (key === 38) {
           
            
            // handle Up key
            this.moveSelected(Direction.UP);
            mirror()
          
          } else if (key === 39) {
            
            // handle Right key
            this.moveSelected(Direction.RIGHT);
       

          } else if (key === 40) {
            
            // handle Down key
            this.moveSelected(Direction.DOWN);
            mirror()
  

          } 
      }
      
     
    });
  }

 
  canvas_option() {
    document.querySelector(".files-btn").onclick = (e) => {
      let el = document.querySelector(".files-container .dropdown-content");

      if (el.style.display == "block") {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }
    };
  }
  paste_text(){
    window.addEventListener("copy", (e)=>{
      let obj = this.canvas.getActiveObject();
     obj.disableStyleCopyPaste = true

      setTimeout(() => {
        obj.removeStyle('font-family');

   
        this.canvas.renderAll();
      });


        if(obj){
     
//           setTimeout( ()=>{
//             // obj.text 
//             let span = document.createElement("span");
//             span.textContent = obj.text;
//             span.className = 'text-span'
//             document.body.appendChild(span);
//             document.querySelector('.text-span').style.fontFamily = obj.fontFamily;
         
//             let text_content = document.querySelector('.text-span').textContent
//             // text_content.removeAttribute("style")
            
//             // obj.set('text',te)
            
//            // Assume we have an existing Textbox on the canvas
 

// // Create a clone of the original Textbox
// var clonedTextbox = fabric.util.object.clone(obj);

// // Set a new position for the cloned Textbox
// clonedTextbox.set({ left: 100, top: 100 });
//             clonedTextbox.set({text: 'sdfdsf'})
// // Add the cloned Textbox to the canvas
// this.canvas.add(clonedTextbox);

// // Render the this.canvas
// this.canvas.renderAll();
//           })
 
        }
    })
  }
}
