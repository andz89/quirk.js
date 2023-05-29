import { Global } from "./_global.js";

export class Utilities extends Global {
  //click on object in the canvas event
  canvasOn() {
    const select_object = (o) => {
      var activeObj = o.selected[0];

      //select object name
      document.querySelector("#object-name").value = activeObj.name;

      if (activeObj.lockMovementX == true) {
        document.querySelector("#lock").innerHTML = " &#x1F512;";
      } else {
        document.querySelector("#lock").innerHTML = "<small> lock </small>";
      }

      //selecting multiple objects
      if (activeObj.group !== undefined) {
        let group = activeObj.group;
        this.groupObjectStyle(group);
      }

      // fontSize
      if (activeObj.type == "textbox") {
        let bold = document.querySelector("#fontWeight");
        //bold
        if (activeObj.fontWeight == "bold") {
          bold.style.backgroundColor = "#06343b";
        } else {
          bold.style.backgroundColor = "";
        }

        //italic
        if (activeObj.fontStyle == "italic") {
          document.querySelector("#fontStyle").style.backgroundColor =
            "#06343b";
        } else {
          document.querySelector("#fontStyle").style.backgroundColor = "";
        }

        //font
        document.querySelector("#fontSize").value = activeObj.fontSize;

        let a = (document.getElementById("fontFamilySelect").selectedIndex =
          activeObj.fontFamily);
        document.getElementById("fontFamilySelect").value = a;
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

    const moving_object = (o) => {
      if (o) {
        let activeObj = o.target;

        activeObj.set({ opacity: 0.5 });

        this.canvas.getObjects().forEach((e) => {
          if (activeObj.name == "footer-name") {
            if (e.name == "footer-name") {
              e.top = activeObj.top;

              this.canvas.setActiveObject(e);
              this.canvas.renderAll();
              this.canvas.discardActiveObject(e);
            }
          }
          if (activeObj.name == "footer-position") {
            if (e.name == "footer-position") {
              e.top = activeObj.top;
              this.canvas.setActiveObject(e);

              this.canvas.renderAll();
              this.canvas.discardActiveObject(e);
            }
          }
        });
      }
    };

    const mouse_up = (o) => {
      let activeObj = o.target;
      if (activeObj.name == "grid") {
        return false;
      }
      if (activeObj.name == "bg-image") {
        return false;
      }
      activeObj.set({ opacity: 1 });
      this.canvas.renderAll();
    };
    const modified = (o) => {
      let activeObject = o.target;
      if (!activeObject) {
        return false;
      }
      if (activeObject.getBoundingRect().width > this.canvas.width) {
        activeObject.set({
          width: 300,
        });
        this.canvas.viewportCenterObjectH(activeObject);
        this.canvas.renderAll();
      }
      // if(activeObject.getBound)
    };

    this.canvas.on({
      "selection:updated": select_object,
      "selection:created": select_object,
      "object:modified": modified,
      // 'mouse:down': mouse_down,
      // "object:moving": moving_object,
      "mouse:up": mouse_up,
    });
  }

  canvas_option() {
    window.onclick = (e) => {
      if (e.target.classList.contains("files-btn")) {
        let el = e.target.parentElement.querySelector(
          ".files-container .dropdown-content"
        );

        if (el.style.display == "block") {
          el.style.display = "none";
        } else {
          el.style.display = "block";
        }
      }

      if (e.target.parentElement.classList.contains("dropdown-content")) {
        e.target.parentElement.style.display = "none";
      }
    };
  }
}
