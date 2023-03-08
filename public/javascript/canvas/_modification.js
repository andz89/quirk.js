export class Modification {
  constructor(property) {
    this.canvas = property.canvas;
    this.canvasScale = property.canvasScale;
    this.SCALE_FACTOR = property.SCALE_FACTOR;
    this.fileHandle = property.fileHandle;
    this.width = property.width;
    this.height = property.height;
  }

  objectSizeOnCanvas(object) {
    if (this.width > 3000) {
      object.scaleToWidth(700);
    } else if (this.height > 2000) {
      object.scaleToWidth(450);
    } else if (this.height == 800 && this.width == 400) {
      object.scaleToWidth(200);
    } else {
      object.scaleToWidth(250);
    }
    object.originX = "center";
    object.originY = "center";
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

  loaderShow() {
    document.querySelector(".modal-loader").classList.add("spinner-1");
    document.querySelector(".modal-loader").style.display = "block";
  }
  loaderHide() {
    document.querySelector(".modal-loader").classList.remove("spinner-1");
    document.querySelector(".modal-loader").style.display = "none";
  }

  groupObjectStyle(object) {
    object.set("borderColor", "#333");
    object.set("cornerColor", "#17a2b8");
    object.set("cornerSize", 12);
    object.set("cornerStyle", "circle");
    object.set("transparentCorners", false);
    object.set("lockUniScaling", true);
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

 

  alert(text) {
    let alert_container = document.querySelector("#alert-header");
    alert_container.innerHTML = "";
    alert_container.style.display = "flex";
    let span = document.createElement("span");
    span.innerHTML = `${text}`;
    alert_container.appendChild(span);

    setTimeout(() => {
      alert_container.removeChild(span);
      alert_container.style.display = "none";
    }, 5000);
  }

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

  
  
  returnToOriginalSize() {
    this.canvas.setHeight(this.canvas.current_height);
    this.canvas.setWidth(this.canvas.current_width);
    this.canvas.setZoom(this.canvas.current_canvasScale);
  }

  

  loading(display,message) {
    document.querySelector(".lds-spinner-container-generate").style.visibility = display;
    if(message){
      document.querySelector(".lds-spinner-container-generate .loader").innerHTML = message;
    }
    
    if(message === null){
      message = document.querySelector(".lds-spinner-container-generate .loader").innerHTML = 'Loading Please Wait...'
    }
   
  }
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
