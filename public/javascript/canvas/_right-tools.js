import { Modification } from "./_modification.js";

export class Right_tools extends Modification {
  sentenceCase() {
    document.querySelector("#sentence-case").addEventListener("click", () => {
     
 
        //to change the column text to sentence case
        let names = document.querySelectorAll(
          ".list-name-container .list-names table tr"
        );
     

          names.forEach((element) => {
            let b = element.children[1].innerText.replace(/,(?=[^\s])/g, ", ");
            let c = b.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            element.children[1].innerText = c;

            let d = element.children[2].innerText.replace(/,(?=[^\s])/g, ", ");
            let e= d.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            element.children[2].innerText = e;
          });
        
   

    });
  }

  fontSize(selector) {
    let fontSize = document.querySelector(selector);
    fontSize.oninput = (e) => {
      let object = this.canvas.getActiveObject();
      if (object) {
        if (object.getSelectedText() != "") {
          object.setSelectionStyles({ fontSize: e.target.value });
          // fontSizeinput = e.target.value
          object.dirty = true;
          this.canvas.renderAll();
          // object.set({fontSize: e.target.value })
        } else {
          object.removeStyle("fontSize");
          object.set({ fontSize: e.target.value });
          object.dirty = true;
          this.canvas.renderAll();
        }
      }
    };
  }

  

  

  // font color change
  fontColor(selector) {
    let color = document.querySelector(selector);
    color.addEventListener("input", (e) => {
      let object = this.canvas.getActiveObject();

      if (object != undefined) {
        if (window.getSelection().toString() != "") {
          object.setSelectionStyles({ fill: e.target.value });
          this.canvas.renderAll();
        } else if (window.getSelection().toString() == "") {
          object.removeStyle("fill");
          object.set("fill", e.target.value);
          object.dirty = true;
          this.canvas.renderAll();
        }
      }
    });
  }

  bold_text() {
    document.querySelector("#bold").onclick = () => {
      let object = this.canvas.getActiveObject();

      if (object && object.bold === undefined) {
        if (object.getSelectedText() == "") {
          // empty
          object.removeStyle("fontWeight");
          object.set({ fontWeight: "bold" });
          object.dirty = true;
          this.canvas.renderAll();
          bold.style.backgroundColor = "rgba(87, 86, 86, 0.733)";
          object.bold = true;
        } else {
          object.setSelectionStyles({ fontWeight: "bold" });
          bold.style.backgroundColor = "rgba(87, 86, 86, 0.733)";
          object.bold = true;
          object.dirty = true;
          this.canvas.renderAll();
        }
      } else {
        if (object.getSelectedText() == "") {
          // empty
          object.removeStyle("fontWeight");

          // to check if some text is normal and bold
          if (object.fontWeight == "normal") {
            object.set({ fontWeight: "bold" });
            this.canvas.renderAll();
          } else {
            object.set({ fontWeight: "normal" });
            object.dirty = true;
            this.canvas.renderAll();
            bold.style.backgroundColor = "";
            object.bold = undefined;
          }
        } else {
          object.setSelectionStyles({ fontWeight: "normal" });
          object.dirty = true;
          bold.style.backgroundColor = "";
          this.canvas.renderAll();
          object.bold = undefined;
        }
      }
    };
  }

  italic_text() {
    let italic = document.querySelector("#italic");
    italic.onclick = () => {
      let object = this.canvas.getActiveObject();

      if (object.italic === undefined) {
        if (object.getSelectedText() == "") {
          object.removeStyle("fontStyle");

          object.set({ fontStyle: "italic" });

          object.dirty = true;
          this.canvas.renderAll();
          object.italic = true;
          italic.style.backgroundColor = "rgba(87, 86, 86, 0.733)";
        } else {
          object.setSelectionStyles({ fontStyle: "italic" });
          object.dirty = true;
          this.canvas.renderAll();
          object.italic = true;
          italic.style.backgroundColor = "rgba(87, 86, 86, 0.733)";
        }
      } else {
        if (object.getSelectedText() == "") {
          object.removeStyle("fontStyle");

          // to check if some text is normal and italic
          if (object.fontStyle == "normal") {
            object.set({ fontStyle: "italic" });
            this.canvas.renderAll();
          } else {
            object.set({ fontStyle: "" });
            object.dirty = true;
            this.canvas.renderAll();
            italic.style.backgroundColor = "";
            object.italic = undefined;
          }
        } else {
          object.setSelectionStyles({ fontStyle: "normal" });

          object.dirty = true;
          this.canvas.renderAll();
          object.italic = undefined;
          italic.style.backgroundColor = "";
        }
      }
    };
  }

  stroke_color() {
    let strokeColor = document.querySelector("#strokeColor");
    strokeColor.oninput = (e) => {
      let object = this.canvas.getActiveObject();
      object.stroke = e.target.value;
      if (object.type == "rect" && object.strokeWidth == 1) {
        object.strokeWidth = 30;
        document.querySelector("#stroke_width").value = object.strokeWidth;
      }

      if (object.type == "image" && object.strokeWidth == 0) {
        object.strokeWidth = 10;
        document.querySelector("#strokeWidth").value = object.strokeWidth;
      }

      // clip stroke
      if (object.type == "group") {
        let a = object._objects[0];
        if (a.name == "clip-stroke") {
          a.set("stroke", e.target.value);
        }
      }

      (object.objectCaching = false), (object.dirty = true);
      object.paintFirst = "stroke";
      this.canvas.renderAll();
    };
  }
  stroke_width() {
    let strokeWidth = document.querySelector("#strokeWidth");
    strokeWidth.oninput = (e) => {
      let value = e.target.value;
      if (e.target.value == "") {
        value = 0;
      }
      let object = this.canvas.getActiveObject();

      if (object.stroke == null) {
        object.stroke = "#207e7e";
      }

      if (object.type !== "activeSelection") {
        object.strokeWidth = parseInt(value, 10);
        (object.objectCaching = false), (object.dirty = true);
        object.paintFirst = "stroke";
      } else {
        // more objects selected
        object._objects.forEach((e) => {
          if (e.stroke == null) {
            e.stroke = "#207e7e";
          }
          e.strokeWidth = parseInt(value, 10);
          (e.objectCaching = false), (e.dirty = true);
          e.paintFirst = "stroke";
        });
      }

      // clip stroke
      // console.log( object._objects[0])
      if (object.type == "group") {
        if (object._objects[0].name == "clip-stroke") {
          let a = object._objects[0];
          a.strokeWidth = parseInt(value, 10);
          (a.objectCaching = false), (a.dirty = true);
          a.paintFirst = "stroke";

          this.canvas.renderAll();
        }
      }

      this.canvas.renderAll();
    };
  }

 
 

 

 

  textAlign_left() {
    document.querySelector("#alignLeftText");
    alignLeftText.onclick = () => {
      let object = this.canvas.getActiveObject();
      if (!object) {
        return false;
      }
      object.set("textAlign", "left");

      object.dirty = true;
      this.canvas.renderAll();
    };
  }

  textAlign_center() {
    let alignCenterText = document.querySelector("#alignCenterText");
    alignCenterText.onclick = () => {
      let object = this.canvas.getActiveObject();
      if (!object) {
        return false;
      }
      object.set("textAlign", "center");
      object.dirty = true;
      this.canvas.renderAll();
    };
  }

  textAlign_right() {
    let alignRightText = document.querySelector("#alignRightText");
    alignRightText.onclick = () => {
      let object = this.canvas.getActiveObject();
      if (!object) {
        return false;
      }
      object.set("textAlign", "right");
      this.canvas.setActiveObject(object);
      object.dirty = true;
      this.canvas.renderAll();
    };
  }

  fontStyle() {
    // fonts
    var fonts = [
      "Roboto",
      "Dancing Script",
      "Work Sans",
      "Open Sans"
    ];

    fonts.unshift("Times New Roman");
    // Populate the fontFamily select
    let fontFamilySelect = document.querySelector("#fontFamilySelect");
    fonts.forEach((font) => {
      var option = document.createElement("option");
      option.innerHTML = font;
      option.value = font;
      option.style.fontFamily = font;
      option.style.fontSize = "1rem";

      fontFamilySelect.appendChild(option);
    });

    // Apply selected font on change
    fontFamilySelect.onchange = (e) => {
      let object = this.canvas.getActiveObject();
      if (e.target.value !== "Times New Roman") {
        loadAndUse(e.target.value);
      } else {
        object.set("fontFamily", e.target.value);
        this.canvas.renderAll();
      }
    };

    const loadAndUse = (font) => {
      let object = this.canvas.getActiveObject();

      var myfont = new FontFaceObserver(font);
      myfont
        .load()
        .then(() => {
          // when font is loaded, use it.

          object.set("fontFamily", font);
          this.canvas.renderAll();
        })
        .catch((e) => {
          this.alert("unstable internet connection. cannot load google fonts");
        });
    };
  }

 
}
