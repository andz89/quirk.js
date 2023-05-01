export class Global {
  constructor(property) {
    this.canvas = property.canvas;
    this.canvasScale = property.canvasScale;
    this.SCALE_FACTOR = property.SCALE_FACTOR;
    this.fileHandle = property.fileHandle;
    this.width = property.width;
    this.height = property.height;
    this.user_role = property.user_role,
    this.table = property.table,
    this.list = property.list,
    this.purchased_id = property.purchased_id;
    this.template_id = property.template_id,
    this.mode  = property.mode
    this.category  = property.category

  }

 

  adding_object_style(object) { 
    if (object.type === "textbox") {
      object.perPixelTargetFind = false;
      this.canvas.setActiveObject(object);
      this.canvas.add(object);
 
      this.canvas.viewportCenterObject(object);
      this.canvas.renderAll();
  
    } else {
      (object.perPixelTargetFind = false), this.canvas.setActiveObject(object);
      this.canvas.add(object);

      object.set("cornerSize", 11);

      this.canvas.viewportCenterObject(object);

      this.canvas.renderAll();
      this.updateModifications(true);
    }
  }

 

 

  uniqueId() {
    let d = new Date();
    let dateString =
      d.getFullYear().toString() +
      d.getMonth().toString() +
      d.getDate().toString() +
      d.getHours().toString() +
      d.getSeconds().toString() +
      d.getMilliseconds().toString();
    let random = Math.floor(Math.random() * 1000000).toString();
    return dateString + random;
  }

  groupObjectStyle(object) {
    object.set("borderColor", "#333");
    object.set("cornerColor", "#17a2b8");
    object.set("cornerSize", 12);
    object.set("cornerStyle", "circle");
    object.set("transparentCorners", false);
    object.set("lockUniScaling", true);
    object.setControlsVisibility({mt: false, 
      mb: false, 
      ml: false, 
      mr: false, 
      bl: false,
      br: false, 
      tl: false, 
      tr: false,
      mtr: false, })

  }
//user in font selection
  alert(text) {
    let alert_container = document.querySelector("#notification");
    
    let message_notification = document.querySelector("#notification .message-notification");
    message_notification.innerHTML = "";
    alert_container.style.display = "flex";
    let div = document.createElement("div");
    div.className = 'noti-close'
    div.innerHTML = `${text}`;
    message_notification.appendChild(div);


   alert_container.addEventListener('click',  (e)=>{
  
    if(e.target.classList.contains("noti-close")){
 
      alert_container.style.display = "none";
    }
   })
 
  }
//arrow key functionality
  moveSelected(direction) {
    let STEP = 5;

    var Direction = {
      LEFT: 0,
      UP: 1,
      RIGHT: 2,
      DOWN: 3,
    };
    var activeObject = this.canvas.getActiveObject();

    if (activeObject) {
      switch (direction) {
        case Direction.LEFT:
          activeObject.left = activeObject.left - STEP;
          break;
        case Direction.UP:
          activeObject.top = activeObject.top - STEP;
          break;
        case Direction.RIGHT:
          activeObject.left = activeObject.left + STEP;
          break;
        case Direction.DOWN:
          activeObject.top = activeObject.top + STEP;
          break;
      }
      activeObject.setCoords();
      this.canvas.renderAll();
    }
  }

  
//downloading certificates //loader
  loading(display,message) {
    document.querySelector(".lds-spinner-container-generate").style.visibility = display;
    if(message){
      document.querySelector(".lds-spinner-container-generate .loader").innerHTML = message;
    }
    
    if(message === null){
      message = document.querySelector(".lds-spinner-container-generate .loader").innerHTML = 'Loading Please Wait...'
    }
   
  }

  //use in saving json file to server //loader
  loading_save(display,message) {
    document.querySelector(".lds-spinner-container-saving-json").style.visibility = display;
    if(message){
      document.querySelector(".lds-spinner-container-saving-json .loader").innerHTML = message;
    }
    
    if(message === null){
      message = document.querySelector(".lds-spinner-container-saving-json .loader").innerHTML = 'Saving. . Please Wait...'
    }
   
  }
}
