import { Global } from "./_global.js";
 
export class Utilities extends Global {
 

  //click on object in the canvas event
  canvasOn() {
 
    const select_object = (o) => {
      var activeObj = o.selected[0];
    

 

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

 
        activeObj.set({opacity: 0.5})
       
 



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
    const mouse_down = (o)=>{
      let activeObj  = o.target
    
    }
    const mouse_up = (o)=>{
   
      let activeObj  = o.target
      if(activeObj.name == 'grid'){
        return false
      }
      activeObj.set({opacity: 1})
      this.canvas.renderAll()
    }
    const modified = (o) =>{
      let activeObject = o.target
      if(!activeObject){
        return false
      }
      if(activeObject.getBoundingRect().width >this.canvas.width){
    
        activeObject.set({
          width: 300
        })
        this.canvas.viewportCenterObjectH(activeObject);
        this.canvas.renderAll()
      };
      // if(activeObject.getBound)
    }

    this.canvas.on({
      "selection:updated": select_object,
      "selection:created": select_object,
      "object:modified": modified,
      'mouse:down': mouse_down,
      'object:moving': moving_object,
      'mouse:up': mouse_up,

    
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
//   paste_text(){
//       let a
//       let b
//       let c
//       let target
//     const mouseUp_object = (o) =>{
    
//       let activeObj = o.target;
//       if(!activeObj){
//         return false
//       }
//       if(activeObj.type == 'textbox'){
      
//         // activeObj.selectAll()
//         let text = activeObj.text;
//         target = o.target.selectionStart
//           c = activeObj.getSelectedText()
      
  
 

//       a = text.slice(0, target)  
//       b = text.slice(target + c.length  )
      


//       }
      
      
//     }
  

//     // b = text.slice(target + c.length)
//     // d = text.slice(target , c.length)

    
//     this.canvas.on({
    
//      'mouse:up': mouseUp_object,
//     // 'mouse:down': mouseDown_object,
 
  
//       });
//       window.addEventListener('keydown',(e)=>{
//         let obj = this.canvas.getActiveObject();
        
//         if(!obj || obj.type !== 'textbox'){
//           return false
//         }
//      target = e.target.selectionStart
//      console.log(target);
   
//      let text = obj.text
//       c = obj.getSelectedText()
//       a = text.slice(0, target)  
//       b = text.slice(target + c.length )
 
 
//       });
 
    
//     window.addEventListener("paste", (e)=>{
//       e.preventDefault()
//       let obj = this.canvas.getActiveObject();
//       if(!obj){
//         return false
//       }
      
     
//       let text = e.clipboardData.getData("text");
     
//       if(obj.text ==''){
//         obj.set('text', '' )
        
//         obj.set('text', text.trim() )
 
//       }else{
 
// console.log(a);
// console.log(b);
//       obj.set('text',a + text.trim() +b)
//       }
      
//       this.canvas.discardActiveObject()
//       this.canvas.renderAll()
//     })
//   }
}
