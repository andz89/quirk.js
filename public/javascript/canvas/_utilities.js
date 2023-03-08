import { Modification } from "./_modification.js";
 
export class Utilities extends Modification {
  deleteObjects() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Delete") {
    
        if(role == 'admin'){
          this.canvas.remove(this.canvas.getActiveObject());
        }
        if(role == 'user'){
          if (this.canvas.getActiveObject().name === "textbox") {
            return false;
          }
           
            this.canvas.remove(this.canvas.getActiveObject());
        }

     
      }
    });
  }

  discardActiveObject() {
 
    window.onclick = (e) => {
  
      if (e.target.classList.contains("upper-canvas")) {
        document.querySelector(".files-container .dropdown-content").style.display = "none";
      }
 
      if (e.target.id === "canvas-background") {
        document.querySelector(".files-container .dropdown-content").style.display = "none";
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
      }
    };

    document.querySelector(".files-container .dropdown-content").addEventListener("click", ()=>{
      document.querySelector(".files-container .dropdown-content").style.display = "none";
    })
    
  }

  canvasOn() {
    const select_object = (o) => {
      var activeObj = o.selected[0];

      if(activeObj.type === 'activeSelection') {
        this.canvas.discardActiveObject();
      } else {
        //do nothing
      }
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

      // stroke_width
      // document.querySelector("#strokeWidth").value = activeObj.strokeWidth;
      // -------------------------------------//

      // -------------------------------------//

      if (activeObj.group !== undefined) {
        let group = activeObj.group;
        group.set("borderColor", "#333");
        group.set("cornerColor", "#17a2b8");
        group.set("cornerSize", 8);
        group.set("cornerStyle", "circle");
        group.set("transparentCorners", false);
        group.set("lockUniScaling", true);
        group.setControlsVisibility({ mtr: false });
      }
      activeObj.set("cornerSize", 8);
      activeObj.setControlsVisibility({ mtr: false });
      activeObj.set("borderColor", "#333");
      activeObj.set("cornerColor", "#17a2b8");

      activeObj.set("cornerStyle", "circle");
      activeObj.set("transparentCorners", false);
      activeObj.set("lockUniScaling", true);
 

   
    };

  

 


    // font size change when scaling
    // this.canvas.store_objects = []
    // const mouseUp_object = (o) => {
    //   let activeObj = o.target;
    //   if (activeObj !== null  && activeObj.type === "textbox") {
    //     document.querySelector("#fontSize").value = activeObj.fontSize
    //   }
    
     
    // };

 


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
 
      // "mouse:up": mouseUp_object,
      'object:moving': moving_object,
    
    });
  }

  // arrow movement
  arrowMovement() {
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

 
  filesBtn() {
    document.querySelector(".files-btn").onclick = (e) => {
      let el = document.querySelector(".files-container .dropdown-content");

      if (el.style.display == "block") {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }
    };
  }
  
}
