import { Global } from "./_global.js";

export class Utilities extends Global {
  //click on the object and page
  canvasOn() {
    //select header in the canvas page
    document.querySelector(".header").onclick = (e) => {
      if (e.target.parentElement.classList.contains("dropdown-content")) {
        e.target.parentElement.style.display = "none";
      }
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
    };

    const select_object = (o) => {
      var activeObj = o.selected[0];

      //select object name
      document.querySelector("#object-name").value = activeObj.name;
      if (activeObj.lockMovementX == true) {
        document.querySelector("#lock").innerHTML = " &#x1F512;";
      } else {
        document.querySelector("#lock").innerHTML = "<small> lock </small>";
      }

      //selecting multiple objects //for admin canvas
      if (activeObj.group !== undefined) {
        let group = activeObj.group;
        this.groupObjectStyle(group);
      }

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

        // fontSize
        document.querySelector("#fontSize").value = activeObj.fontSize;

        //font family
        let a = (document.getElementById("fontFamilySelect").selectedIndex =
          activeObj.fontFamily);
        document.getElementById("fontFamilySelect").value = a;
      }

      //set style on selected object
      activeObj.set("cornerSize", 8);
      activeObj.setControlsVisibility({ mtr: false });
      activeObj.set("borderColor", "#333");
      activeObj.set("cornerColor", "#17a2b8");
      activeObj.set("cornerStyle", "circle");
      activeObj.set("transparentCorners", false);
      activeObj.set("lockUniScaling", true);
    };

    // object width is modified beyond the canvas width. automatic the width object set to 300
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

      if (activeObject.name == "same-content") {
        this.canvas.getObjects().forEach((e) => {
          if (e.name == "same-content") {
            e.text = activeObject.text;

            this.canvas.renderAll();
          }
        });
      }
    };

    this.canvas.on({
      "selection:updated": select_object,
      "selection:created": select_object,
      "object:modified": modified,
    });
  }

  mirror_movement() {
    var Direction = {
      LEFT: 0,
      UP: 1,
      RIGHT: 2,
      DOWN: 3,
    };
    document.body.addEventListener("keydown", function (e) {
      if (e.code == "ArrowUp" || e.code == "ArrowDown") {
        e.preventDefault();

        // return false;
      }
    });
    fabric.util.addListener(document.body, "keydown", (options) => {
      if (options.repeat) {
        return;
      }
      let object = this.canvas.getActiveObject();

      // const mirror = () => {
      //   if (object) {
      //     let activeObj = object;
      //     this.canvas.getObjects().forEach((e) => {
      //       if (activeObj.name == "footer-name") {
      //         if (e.name == "footer-name") {
      //           e.top = activeObj.top;
      //           if (e !== object) {
      //             this.canvas.setActiveObject(e);
      //             e.set("borderColor", "transparent");
      //             e.set("cornerColor", "transparent");
      //           }

      //           this.canvas.renderAll();
      //         }
      //       }
      //       if (activeObj.name == "footer-position") {
      //         if (e.name == "footer-position") {
      //           e.top = activeObj.top;
      //           if (e !== object) {
      //             this.canvas.setActiveObject(e);
      //             e.set("borderColor", "transparent");
      //             e.set("cornerColor", "transparent");
      //           }
      //           this.canvas.renderAll();
      //         }
      //       }
      //     });
      //   }
      // };
      if (object) {
        var key = options.which || options.keyCode; // key detection
        if (key === 37) {
          // handle Left key

          this.moveSelected(Direction.LEFT);
        } else if (key === 38) {
          // handle Up key
          this.moveSelected(Direction.UP);
        } else if (key === 39) {
          // handle Right key
          this.moveSelected(Direction.RIGHT);
        } else if (key === 40) {
          // handle Down key
          this.moveSelected(Direction.DOWN);
          console.log("down");
        }
      }
    });
  }
}
