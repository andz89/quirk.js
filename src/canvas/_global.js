export class Global {
  constructor(property) {
    this.canvas = property.canvas;
    this.canvasScale = property.canvasScale;
    this.SCALE_FACTOR = property.SCALE_FACTOR;
    this.fileHandle = property.fileHandle;
    this.width = property.width;
    this.height = property.height;
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
