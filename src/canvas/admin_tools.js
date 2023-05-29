export class Tools {
  admin_tools(canvas) {
    function groupObjectStyle(object) {
      object.set("borderColor", "#333");
      object.set("cornerColor", "#17a2b8");
      object.set("cornerSize", 12);
      object.set("cornerStyle", "circle");
      object.set("transparentCorners", false);
      object.set("lockUniScaling", true);
      object.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mtr: false,
      });
    }

    let close_btn = document.querySelector(".admin-tool-container .close");
    close_btn.addEventListener("click", (e) => {
      if (e.target.classList.contains("hide")) {
        console.log(document.querySelector(".admin-tool-content"));
        document.querySelector(".admin-tool-content").style.display = "none";

        e.target.classList.remove("hide");
        e.target.classList.add("open");
        e.target.innerText = "Show";
      } else {
        document.querySelector(".admin-tool-content").style.display = "block";
        e.target.classList.remove("open");
        e.target.classList.add("hide");
        e.target.innerText = "Hide";
      }
    });

    document.querySelector("#align-canvas").addEventListener("click", (e) => {
      if (e.target.value == "Horizontal") {
        if (canvas.getActiveObject().type === "activeSelection") {
          let obj = canvas.getActiveObject().toGroup();
          canvas.viewportCenterObjectH(obj);

          let selected_objects = canvas.getActiveObject().toActiveSelection();
          groupObjectStyle(selected_objects);

          canvas.renderAll();
        } else {
          let object = canvas.getActiveObject();
          canvas.viewportCenterObjectH(object);
          canvas.setActiveObject(object);
        }
      }
      if (e.target.value == "Vertical") {
        if (canvas.getActiveObject().type === "activeSelection") {
          let obj = canvas.getActiveObject().toGroup();
          canvas.viewportCenterObjectV(obj);
          let selected_objects = canvas.getActiveObject().toActiveSelection();
          groupObjectStyle(selected_objects);

          canvas.renderAll();
        } else {
          let object = canvas.getActiveObject();
          canvas.viewportCenterObjectV(object);
          canvas.setActiveObject(object);
        }
      }
      if (e.target.value == "Center") {
        if (canvas.getActiveObject().type === "activeSelection") {
          let obj = canvas.getActiveObject().toGroup();
          canvas.viewportCenterObject(obj);
          let selected_objects = canvas.getActiveObject().toActiveSelection();
          groupObjectStyle(selected_objects);

          canvas.renderAll();
        } else {
          let object = canvas.getActiveObject();
          canvas.viewportCenterObject(object);

          canvas.setActiveObject(object);
        }
      }
    });

    let align_left = document.querySelector("#align_left");
    align_left.onclick = () => {
      let object = canvas.getActiveObjects();
      if (object.length < 2) {
        return false;
      }

      let group_objects = canvas.getActiveObject().toGroup();

      var groupWidth = group_objects.width;

      object.forEach((obj) => {
        obj.set({
          left: -(groupWidth / 2),
          originX: "left",
        });
      });
      let groupObjects = canvas.getActiveObject().toActiveSelection();
      groupObjectStyle(groupObjects);

      canvas.renderAll();
    };

    let align_center = document.querySelector("#align_center");
    align_center.onclick = () => {
      let object = canvas.getActiveObjects();
      if (object.length < 2) {
        return false;
      }

      let group_objects = canvas.getActiveObject().toGroup();

      var groupWidth = group_objects.width;

      object.forEach((obj) => {
        var itemWidth = obj.getBoundingRect().width;
        obj.set({
          left: 0 - itemWidth / 2,
          originX: "left",
        });
      });
      let groupObjects = canvas.getActiveObject().toActiveSelection();

      groupObjectStyle(groupObjects);

      canvas.renderAll();
    };

    let align_right = document.querySelector("#align-right");
    align_right.onclick = () => {
      let object = canvas.getActiveObjects();
      if (object.length < 2) {
        return false;
      }

      let group_objects = canvas.getActiveObject().toGroup();

      var groupWidth = group_objects.width;

      object.forEach((obj) => {
        var itemWidth = obj.getBoundingRect().width;
        obj.set({
          left: groupWidth / 2 - itemWidth / 2,
          originX: "center",
        });
      });

      let groupObjects = canvas.getActiveObject().toActiveSelection();
      groupObjectStyle(groupObjects);

      canvas.renderAll();
    };

    document.querySelector("#align-top").onclick = () => {
      let object = canvas.getActiveObjects();
      if (object.length < 2) {
        return false;
      }

      let group_objects = canvas.getActiveObject().toGroup();
      var groupHeight = group_objects.height;

      object.forEach((obj) => {
        obj.set({
          top: 0 - groupHeight / 2,
          originY: "top",
        });
      });

      let groupObjects = canvas.getActiveObject().toActiveSelection();
      groupObjectStyle(groupObjects);

      canvas.renderAll();
    };

    document.querySelector("#align-middle").onclick = () => {
      let object = canvas.getActiveObjects();

      if (object.length < 2) {
        return false;
      }
      let group_objects = canvas.getActiveObject().toGroup();
      var groupHeight = group_objects.height;
      object.forEach((obj) => {
        let itemHeight = groupHeight.height;

        obj.set({
          top: 0 - itemHeight / 2,
          originY: "top",
        });
      });
      let groupObjects = canvas.getActiveObject().toActiveSelection();

      groupObjectStyle(groupObjects);

      canvas.renderAll();
    };

    document.querySelector("#align-bottom").onclick = () => {
      let object = canvas.getActiveObjects();
      if (object.length < 2) {
        return false;
      }

      let group_objects = canvas.getActiveObject().toGroup();
      var groupHeight = group_objects.height;

      object.forEach((obj) => {
        var itemHeight = obj.getBoundingRect().height;
        obj.set({
          top: groupHeight / 2 - itemHeight / 2,
          originY: "center",
        });
      });
      let groupObjects = canvas.getActiveObject().toActiveSelection();
      groupObjectStyle(groupObjects);

      canvas.renderAll();
    };
    //object name
    document.querySelector("#object-name").addEventListener("input", (e) => {
      let obj = canvas.getActiveObject();
      obj.set({ name: e.target.value });
    });
    //lock
    let lock = document.querySelector("#lock");
    lock.onclick = () => {
      let object = canvas.getActiveObject();
      let objects = canvas.getActiveObjects();
      if (!objects) {
        return false;
      }
      if (!object) {
        return false;
      }

      if (object.lockMovementX == false) {
        canvas.discardActiveObject();
        object.selectable = true;
        // object.editable = false;
        object.set("lockMovementX", true);

        object.set("lockRotation", true);
        canvas.renderAll();

        document.querySelector("#lock").innerHTML = "&#x1F512;";
      } else {
        document.querySelector("#lock").innerHTML = "<small> lock </small>";
        canvas.discardActiveObject();

        object.set("lockMovementX", false);

        object.set("lockRotation", false);
        canvas.renderAll();
      }

      if (objects.length > 1) {
        objects.forEach((obj) => {
          if (obj.lockMovementX == false) {
            obj.editable = true;
            obj.selectable = true;
            obj.set("lockMovementX", true);

            obj.set("lockRotation", true);
            canvas.discardActiveObject();
            canvas.renderAll();
            document.querySelector("#lock").innerHTML = "&#x1F512;";
          } else {
            obj.editable = true;
            obj.selectable = true;
            obj.set("lockMovementX", false);

            obj.set("lockRotation", false);
            canvas.discardActiveObject();
            canvas.renderAll();
            document.querySelector("#lock").innerHTML = "<small> lock </small>";
          }
        });
      }
    };
    //group objects
    let group = document.querySelector("#group");

    group.onclick = () => {
      let object = canvas.getActiveObject();
      if (!object) {
        return false;
      }
      let obj = canvas.getActiveObject().toGroup();

      obj.editable = true;
      obj.name = obj.type;
      obj.id = this.uniqueId();
      groupObjectStyle(obj);
    };
    //ungroup objects
    let ungroup = document.querySelector("#ungroup");
    ungroup.onclick = () => {
      let object = canvas.getActiveObject();
      if (!object) {
        return false;
      }
      if (object.type == "activeSelection") {
        return false;
      }

      if (object.lockMovementX == true) {
        return false;
      } // to check if object is lock

      let a = object.toActiveSelection();
      groupObjectStyle(a);
    };

    document.querySelector(".admin-tool-container").style.display = "flex";
  }
}
