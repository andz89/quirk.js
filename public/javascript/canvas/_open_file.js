import { Canvas } from "./canvas.js";

export class Open_file {
  get_file_json(json,template_id,user_json) {
  
    let a = JSON.parse(json);
    
    let canvas_saved = {
      json: { version: "5.2.0", objects: a.json.objects, background: "#fff" },
    };

    let fileName = "project.json";

    const run_json_file = (canvas_saved, fileName) => {
      let canvasScale = 1;
      let SCALE_FACTOR = 1.1;
      let width = "1754";
      let height = "1240";

      document.querySelector("#file_name").innerHTML = fileName.replace(
        ".json",
        ""
      ); // file name

      const canvas = (width, height) => {
        let c = document.createElement("canvas");
        c.id = "canvas";
        document.querySelector("#canvas-background").appendChild(c);
        return new fabric.Canvas("canvas", {
          width: width,
          height: height,
          backgroundColor: "#fff",
          preserveObjectStacking: true,
        });
      };
      let canvas_created = canvas(width, height);

      canvas_created.loadFromJSON(canvas_saved.json);
     
      let c = JSON.parse(user_json)
      canvas_created.template_id = template_id //saving the template id in canvas
      c.forEach(element => {
       
      let a = canvas_created.getObjects().filter((e)=>{
        return e.id == element.id
      })
     
      a[0].top = element.top;
      a[0].left = element.left;
      
      canvas_created.renderAll()
    });


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

      function lock_image(object, bollean) {
        object.lockMovementX = bollean;
        object.lockMovementY = bollean;
        object.lockScalingX = bollean;
        object.lockScalingY = bollean;
      }
    };
    run_json_file(canvas_saved, fileName);
  }
}
