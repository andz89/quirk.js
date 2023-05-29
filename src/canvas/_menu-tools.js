import { Global } from "./_global.js";

let FontFaceObserver = require("fontfaceobserver");
let JSZip = require("jszip");
let JSZipUtils = require("jszip-utils");

export class Menu_tools extends Global {
  //add background
  add_background() {
    let add_bg_image = document.querySelector(
      "#modal-container-add-background"
    );
    let modal_body = add_bg_image.querySelector(".modal-body");
    document
      .querySelector("#canvas-image-background")
      .addEventListener("click", () => {
        if (modal_body.innerHTML.length) {
          add_bg_image.style.display = "flex";
        } else {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              let data = JSON.parse(xhttp.responseText);
              data.forEach((e) => {
                let div = document.createElement("div");
                div.innerHTML = ` 
                  <img class="apply-btn hover-opactiy" src='http://localhost:5000/images/canvas_image/${e.thumbnail_image}' width="150px">
                  <input type="hidden" name="background_name" class="bg_name" value="${e.background_image}">

                 `;

                modal_body.appendChild(div);
              });

              add_bg_image.style.display = "flex";
              let link_save = [];
              let link;
              modal_body.addEventListener("click", (e) => {
                //remove all existing background images
                if (e.target.classList.contains("apply-btn")) {
                  let a = this.canvas.getObjects().filter((e) => {
                    return e.name == "bg-image";
                  });
                  a.forEach((e) => {
                    e.opacity = 0;
                    this.canvas.renderAll();
                  });

                  let image_name =
                    e.target.parentElement.querySelector(".bg_name").value;

                  let b = link_save.filter((e) => {
                    return (
                      e ===
                      "http://localhost:5000/images/canvas_image/" + image_name
                    );
                  });

                  if (b != "") {
                    //kung naa
                    let a = this.canvas.getObjects().filter((e) => {
                      return e.type == "image";
                    });

                    a.forEach((e) => {
                      if (
                        e._originalElement.currentSrc ==
                        "http://localhost:5000/images/canvas_image/" +
                          image_name
                      ) {
                        e.opacity = 1;
                        this.canvas.renderAll();
                      }
                    });

                    add_bg_image.style.display = "none";
                  } else {
                    //kung wala
                    link =
                      "http://localhost:5000/images/canvas_image/" + image_name;
                    link_save.push(link);

                    fabric.Image.fromURL(link, (img) => {
                      img.name = "bg-image";
                      this.canvas.add(img);
                      img.scaleToWidth(this.canvas.getWidth());
                      this.canvas.viewportCenterObject(img);
                      this.canvas.sendToBack(img);
                      img.selectable = false;
                      img.hoverCursor = "default";
                      img.tae = "tae";
                      img.set("lockMovementX", true);
                      img.set("lockMovementY", true);
                      img.set("lockScalingX", true);
                      img.set("lockScalingY", true);
                      img.set("lockRotation", true);
                      this.canvas.discardActiveObject();
                      this.canvas.renderAll();
                      img.setControlsVisibility({
                        mt: false,
                        mb: false,
                        ml: false,
                        mr: false,
                        tr: false,
                        tl: false,
                        br: false,
                        bl: false,
                        mtr: false,
                      });
                      this.canvas.renderAll();

                      add_bg_image.style.display = "none";
                    });
                  }
                }
              });
            }
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/get-all-background-image`,
            true
          );
          xhttp.send();
        }
      });

    add_bg_image.querySelector(".close").addEventListener("click", () => {
      add_bg_image.style.display = "none";
    });
  }

  //reset canvas
  resetCanvas() {
    if (this.user_role == "user") {
      document.querySelector("#reset").addEventListener("click", () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/resetCanvas?template_id=${this.template_id}`,
          true
        );
        xhttp.send();
      });
    } else {
      // document.querySelector("#reset").style.display = "none";
    }
  }

  // textbox
  insertText() {
    let insert_text = document.querySelector(".dropbtn-insert-text");
    insert_text.addEventListener("click", () => {
      let object = new fabric.Textbox("Your Text Here", {
        textAlign: "center",
        dirty: true,

        id: this.uniqueId(),
        width: 100,

        splitByGrapheme: true,
        highlightOnFocus: false,
        centeredScaling: true,

        imageSmoothingEnabled: false,
      });

      object.name = this.user_role == "admin" ? object.type : "user-custom";

      // object.lockMovementX = true
      object.perPixelTargetFind = false;
      this.canvas.add(object);

      // this.canvas.overflow = 'visible'
      this.canvas.setActiveObject(object);
      this.canvas.viewportCenterObject(object);
      this.canvas.renderAll();
      // this.adding_object_style(object);
    });
  }

  // upload user image
  upload_user_image() {
    let photo_container = document.querySelector("#photos-container");

    let add_photo_btn = document.querySelector("#add-photos");
    add_photo_btn.addEventListener("click", (e) => {
      let parent = document.querySelector(".display-photos-container");

      if (parent.querySelector(".img-container")) {
        photo_container.style.display = "flex";
      } else {
        //get images users
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);

            setTimeout(() => {
              photo_container.style.display = "flex";
            });

            data.forEach((e) => {
              let div = document.createElement("div");
              div.className = "img-container";
              div.innerHTML = `<div>

         <div class="container hide"></div>
        
          <img src="images/users/${e.image_path}" class="user-image"   >
          <div id="${
            e.image_path
          }" class="btn btn-sm btn-primary use-btn" >Use</div>

          
          
          <img src="images/canvas/list-black.png" 
           style = '${
             e.role == "admin" && this.user_role == "user" ? "display:none" : ""
           }'
          class=" hover-opactiy  option" width="15"
          alt="">
          <div class="delete-template text hide text-dark">Delete</div>
     
 
         </div>`;
              parent.appendChild(div);
            });
          }
        };
        xhttp.open("POST", `http://localhost:5000/get_user_image`, true);
        xhttp.send();
      }
    });

    // use image to canvas and send request to server
    parent.addEventListener("click", (e) => {
      if (e.target.classList.contains("use-btn")) {
        let id = e.target.id;

        //get images users
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);

            fabric.Image.fromURL(
              "images/users/" + data[0].image_path,
              (img) => {
                img.name = img.type;

                img.scaleToWidth(200);
                img.id = this.uniqueId();
                this.canvas.add(img);
                this.canvas.viewportCenterObject(img);
                this.canvas.renderAll();
              }
            );

            photo_container.style.display = "none";
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/get_user_image_toCanvas?id=${id}`,
          true
        );
        xhttp.send();
      }
      if (e.target.classList.contains("option")) {
        if (
          e.target.parentElement
            .querySelector(".delete-template")
            .classList.contains("hide")
        ) {
          e.target.parentElement
            .querySelector(".container")
            .classList.add("show");
          e.target.parentElement
            .querySelector(".container")
            .classList.remove("hide");

          e.target.parentElement
            .querySelector(".delete-template")
            .classList.add("show");
          e.target.parentElement
            .querySelector(".delete-template")
            .classList.remove("hide");
        } else {
          e.target.parentElement
            .querySelector(".delete-template")
            .classList.add("hide");
          e.target.parentElement
            .querySelector(".delete-template")
            .classList.remove("show");

          e.target.parentElement
            .querySelector(".container")
            .classList.add("hide");
          e.target.parentElement
            .querySelector(".container")
            .classList.remove("show");
        }
      }
      if (e.target.classList.contains("container")) {
        e.target.parentElement
          .querySelector(".delete-template")
          .classList.add("hide");
        e.target.parentElement
          .querySelector(".delete-template")
          .classList.remove("show");

        e.target.parentElement
          .querySelector(".container")
          .classList.add("hide");
        e.target.parentElement
          .querySelector(".container")
          .classList.remove("show");
      }

      if (e.target.classList.contains("delete-template")) {
        let id = e.target.parentElement.querySelector(".use-btn").id;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);

            e.target.parentElement.parentElement.remove();
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/delete_user_image?id=${id}`,
          true
        );
        xhttp.send();
      }
    });

    let upload_img = document.querySelector("#input_img");
    let upload_img_btn = document.querySelector("#upload_img_btn");
    //upload image
    upload_img_btn.addEventListener("click", (e) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("input_img", upload_img.files[0]);
      if (document.querySelector("#input_img").value) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);

            if (data == false) {
              this.alert("limit-reached");
            } else {
              let parent = document.querySelector(".display-photos-container");
              let div = document.createElement("div");
              const imageSrc = URL.createObjectURL(upload_img.files[0]);

              div.className = "img-container";
              div.innerHTML = `<div>
                  <div class="container hide"></div>
                   <img src="${imageSrc}" class="user-image"   >
                   <div id="${data}" class="btn btn-sm btn-primary use-btn" >Use</div>
         
                   
                   
                   <img src="images/canvas/list-black.png" class="hover-opactiy  option" width="15"
              alt="">
                   <div class="delete-template text hide text-dark">Delete</div>
              
             
                  </div>`;
              parent.appendChild(div);
            }
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/user_upload_img?template_id=${this.template_id}&purchased_id=${this.purchased_id}`,
          true
        );
        xhttp.send(formData);
      }
    });
    photo_container.querySelector(".close").addEventListener("click", (e) => {
      photo_container.style.display = "none";
    });
  }
  compile_json() {
    this.loading_save("visible", "Saving . . .");
    function replaceBreakLine(valueToEscape) {
      if (valueToEscape != null && valueToEscape != "") {
        return valueToEscape.replaceAll(/(\r\n|\n|\r)/gm, "<-br->");
      } else {
        return valueToEscape;
      }
    }
    function replaceQoute(valueToEscape) {
      if (valueToEscape != null && valueToEscape != "") {
        return valueToEscape.replaceAll(/'/g, "<-q->");
      } else {
        return valueToEscape;
      }
    }
    //delete not used bg
    this.canvas
      .getObjects()
      .filter((e) => {
        return e.name === "bg-image" && e.opacity === 0;
      })
      .forEach((e) => {
        e.excludeFromExport = true;

        this.canvas.renderAll();
      });

    let json = this.canvas.toJSON(["id", "name"]);

    json.objects.forEach((e) => {
      if (e.type === "textbox") {
        e.text = e.text.trim();
        e.text = replaceQoute(replaceBreakLine(e.text));
      }
    });

    let size = {
      w: this.width,
      h: this.height,
    };

    let merge = {
      json,
      size,
    };
    let json_file = JSON.stringify(merge);
    let json_text = document.querySelector("#text-input");
    json_text.value = json_file;
    // const xhr = new XMLHttpRequest()
    const form = document.querySelector("#upload-form");

    const formData = new FormData(form);

    // formData.append("file_input", upload_img.files[0]);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          let data = JSON.parse(xhttp.responseText);
          if (data === "ok") {
            setTimeout((e) => {
              this.loading_save("hidden", null);
              // document.querySelector('.lds-spinner-container-saving-json').style.display = 'none';
            }, 3000);
          }
          if (data === "no-user") {
            this.loading_save("hidden", null);

            this.alert("Something went wrong. Please refresh the page!");
          }
        }
      } else {
        // handle error
        if (xhttp.status === 404) {
          console.log("Resource not found");
        } else if (xhttp.status === 500) {
          console.log("Server error");
        }
      }
    };
    xhttp.open(
      "POST",
      `http://localhost:5000/saved-template?template_id=${this.template_id}&purchased_id=${this.purchased_id}&category=${this.category}`,
      true
    );
    xhttp.send(formData);
  }
  send_to_server() {
    document.getElementById("save_json").addEventListener("click", () => {
      this.compile_json();
    });
  }
  grid() {
    document.querySelector("#grid").onclick = (e) => {
      let grid = this.canvas.getObjects().filter((obj) => {
        return obj.name == "grid";
      });
      let bg = this.canvas.getObjects().filter((obj) => {
        return obj.name == "bg-image";
      });

      if (e.target.checked) {
        grid[0].set({ opacity: 1 });
        if (bg[0]) {
          this.canvas.sendToBack(bg[0]);
        }
      } else {
        grid[0].set({ opacity: 0 });
      }
      this.canvas.renderAll();
    };
  }
  print_view() {
    document.querySelector("#print-view").addEventListener("click", () => {
      this.loading("visible", " Please wait...");

      //check columns
      let textbox_1 = this.canvas
        .getObjects()
        .filter((el) => el.name === "column-1");
      let textbox_2 = this.canvas
        .getObjects()
        .filter((el) => el.name === "column-2");

      if (textbox_1[0].text == "-column 1-") {
        textbox_1[0].set({ text: " " });
        this.canvas.renderAll();
      }

      if (textbox_2[0].text == "-column 2-") {
        textbox_2[0].set({ text: " " });
        this.canvas.renderAll();
      }
      this.canvas.renderAll();
      let grid = this.canvas.getObjects().filter((obj) => {
        return obj.name == "grid";
      });
      grid[0].opacity = 0;
      this.canvas.renderAll();
      let imageSrc = document.querySelector("#view-image");

      const resizeCanvas = () => {
        return new Promise((resolve, reject) => {
          var scaleFactor = 4;
          this.canvas.setWidth(this.width * scaleFactor);
          this.canvas.setHeight(this.height * scaleFactor);
          this.canvas.setZoom(scaleFactor);

          this.canvas.renderAll();

          let canvas = this.canvas.toDataURL({
            format: "png",
            // quality:  1
          });

          imageSrc.src = canvas;
          this.canvas.setHeight(this.height);
          this.canvas.setWidth(this.width);
          this.canvas.setZoom(1);

          resolve();
        });
      };

      resizeCanvas().then(() => {
        setTimeout(() => {
          // get the dimensions of the viewport
          var viewportWidth = window.innerWidth;
          var viewportHeight = window.innerHeight;

          // get the image element
          var image = document.getElementById("view-image");

          // get the natural dimensions of the image
          var naturalWidth = image.naturalWidth;
          var naturalHeight = image.naturalHeight;

          // calculate the aspect ratios of the viewport and image
          var viewportAspectRatio = viewportWidth / viewportHeight;
          var imageAspectRatio = naturalWidth / naturalHeight;

          // determine which dimension to scale by
          if (viewportAspectRatio > imageAspectRatio) {
            // scale by height
            var scaleFactor = viewportHeight / naturalHeight;
          } else {
            // scale by width
            var scaleFactor = viewportWidth / naturalWidth;
          }

          // set the CSS transform property to scale the image
          image.style.transform = "scale(" + scaleFactor + ")";

          this.loading("hidden", null);

          let image_container = document.querySelector(".print-view-container");
          image_container.style.display = "flex";

          document
            .querySelector(".print-view-container .close")
            .addEventListener("click", () => {
              image_container.style.display = "none";

              this.canvas.renderAll();
            });
        });
      });
    });
  }
  context_menu() {
    // Get a reference to the canvas element

    // Add event listener for the contextmenu event
    window.addEventListener("contextmenu", function (e) {
      e.preventDefault(); // Prevent the default context menu from showing

      // Create a custom context menu
      var contextMenu = document.createElement("ul");
      contextMenu.className = "context-menu";

      // Create menu items
      var menuItem1 = document.createElement("li");
      menuItem1.innerText = "Menu Item 1";
      contextMenu.appendChild(menuItem1);

      var menuItem2 = document.createElement("li");
      menuItem2.innerText = "Menu Item 2";
      contextMenu.appendChild(menuItem2);

      // Position the context menu relative to the mouse coordinates
      contextMenu.style.position = "fixed";
      contextMenu.style.left = e.pageX + "px";
      contextMenu.style.top = e.pageY + "px";

      // Append the context menu to the document body
      document.body.appendChild(contextMenu);

      // Add event listener for menu item clicks
      menuItem1.addEventListener("click", function () {
        console.log("Menu Item 1 clicked");
        contextMenu.remove(); // Remove the context menu after click
      });

      menuItem2.addEventListener("click", function () {
        console.log("Menu Item 2 clicked");
        contextMenu.remove(); // Remove the context menu after click
      });

      // Add event listener to close the context menu on outside click
      window.addEventListener("click", function (event) {
        if (!contextMenu.contains(event.target)) {
          contextMenu.remove();
        }
      });
    });
  }
  //insert data
  insertData() {
    if (this.table == "false") {
      document.querySelector(".pen-icon").style.display = "none";
      document.querySelector(".list-name-container").style.display = "none";

      return false;
    }
    //load names from database
    const createTable = () => {
      return new Promise((resolve, reject) => {
        let count = 101;

        for (let i = 1; i < count; i++) {
          let div = document.createElement("tr");
          div.setAttribute("data", `${i}`);

          div.innerHTML = `
  <td class="sequence "> <div class="sequence-child"> <label class="checkbox">
  <input type="checkbox" class="checkbox-input">
  <span class="checkbox-custom"></span>
  
</label> <span class="number">${i}.</span>
<div></td>
  <td class="xl65 column-1" style="border-right:.5pt solid black;
 " contenteditable="true"></td>
  <td class="xl65 column-2" style="border-right:.5pt solid black;
border-left:none; " contenteditable="true"></td>
<td>
<img src="./images/canvas/eye-solid.png" class="eye-show" width="18">
<img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
</td>

<td class="option-container" style="margin-left:-51px">
<img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
<img src="./images/canvas/download-solid.png"   class="able-download " width="18">
<img src="./images/canvas/download-solid-disable.png"  class="disable-download" width="18">
</td>

        `;
          document
            .querySelector(".list-name-container table tbody ")
            .appendChild(div);

          div.scrollIntoView();

          if (i + 2 > count) {
            resolve();
          }
        }
      });
    };

    //insert names from database
    createTable().then(() => {
      if (this.list) {
        let excel_data = JSON.parse(this.list);

        let inputs = document.querySelectorAll(
          ".list-name-container table tbody tr "
        );

        for (let i = 0; i < excel_data.length; ) {
          for (let x = 0; x < inputs.length; x++) {
            inputs[x].children[1].innerText = excel_data[i].data_1;

            inputs[x].children[2].innerText = excel_data[i].data_2;

            inputs[x].className = `${excel_data[i].data_3}`;
            if (excel_data[i].data_3 == "disable") {
              inputs[x].children[1].contentEditable = false;
              inputs[x].children[2].contentEditable = false;
              inputs[x].children[1].classList.add("disable");
              inputs[x].children[2].classList.add("disable");
              inputs[x].querySelector(".eye-hide").style.display =
                "inline-block";
              inputs[x].querySelector(".disable-download").style.display =
                "inline-block";
              inputs[x].querySelector(".checkbox-input").disabled = true;
              inputs[x].children[3].style.backgroundColor = "#fff";
              inputs[x].children[4].style.backgroundColor = "#fff";
            } else {
              inputs[x].querySelector(".eye-show").style.display =
                "inline-block";
              inputs[x].querySelector(".able-download").style.display =
                "inline-block";
              inputs[x].children[3].style.backgroundColor = "#fff";
              inputs[x].children[4].style.backgroundColor = "#fff";
            }

            i++;
            if (i > excel_data.length - 1) {
              break;
            }
          }
        }

        document.querySelector(".list-names").scrollTop = 0;
      } else {
        document.querySelector(".list-names").scrollTop = 0;
      }
    });

    //  insert-data
    let element = document.querySelector(".excel-html-view-data");

    let parent = document.querySelector(".list-name-container");
    let add_name_btn = document.querySelector("#insert-names");

    function addRow() {
      let div = document.createElement("tr");

      div.innerHTML = `
      <td class="sequence">  <div class="sequence-child"> <label class="checkbox">
      <input type="checkbox" class="checkbox-input">
      <span class="checkbox-custom"></span>
      
    </label> <span class="number"></span>
    <div></td>
      <td class="xl65 column-1" spellcheck="false"  
     " contenteditable="true"> </td>
      <td  spellcheck="false"  class="xl65 column-2" 
    " contenteditable="true"></td>
    <td>
    <img src="./images/canvas/eye-solid.png" class="eye-show" width="18">
    <img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
    </td>
    
    <td>
    <img src="./images/canvas/eye-slash-solid.png"  class="eye-hide" width="18">
    <img src="./images/canvas/download-solid.png"   class="able-download " width="18">
    <img src="./images/canvas/download-solid-disable.png"  class="disable-download" width="18">
    </td>
    

 
      `;
      document
        .querySelector(".list-name-container table tbody")
        .appendChild(div);
    }
    parent.addEventListener("keyup", (e) => {
      if (
        e.target.parentElement.children[1].innerText.length > 0 ||
        e.target.parentElement.children[2].innerText.length > 0
      ) {
        e.target.parentElement.querySelector(".eye-show").style.display =
          "inline-block";
        e.target.parentElement.querySelector(".able-download").style.display =
          "inline-block";
      } else {
        e.target.parentElement.querySelector(".eye-show").style.display =
          "none";
        e.target.parentElement.querySelector(".able-download").style.display =
          "none";
      }
      function replaceBreakLine(valueToEscape) {
        if (valueToEscape != null && valueToEscape != "") {
          return valueToEscape.replaceAll(/(\r\n|\n|\r)/gm, "");
        } else {
          return valueToEscape;
        }
      }
      let textbox_1 = this.canvas
        .getObjects()
        .filter((el) => el.name === "column-1");
      let textbox_2 = this.canvas
        .getObjects()
        .filter((el) => el.name === "column-2");

      // e.target.innerText;
      if (e.target.classList.contains("column-1")) {
        textbox_1[0].set({ text: replaceBreakLine(e.target.innerText) });
      }
      if (e.target.classList.contains("column-2")) {
        textbox_2[0].set({ text: replaceBreakLine(e.target.innerText) });
      }
      this.canvas.renderAll();
    });

    parent.addEventListener("click", (e) => {
      //check row
      if (e.target.classList.contains("checkbox-input")) {
        var element_count = document.querySelector(
          "#selected-item-container .count"
        );
        var element_count_container = document.querySelector(
          "#selected-item-container"
        );

        var current_count = element_count.innerText;
        let parent =
          e.target.parentElement.parentElement.parentElement.parentElement;
        if (e.target.checked == true) {
          element_count_container.style.display = "flex";
          if (current_count == "") {
            var new_count = 0 + 1;
            element_count.innerText = new_count + " " + "selected";
          } else {
            var new_count = parseInt(current_count) + 1;
            element_count.innerText = new_count + " " + "selected";
          }

          //removing start-------------------------//

          let list = document.querySelector(".list-name-container .list-names");

          // start//
          let td = list.querySelector(".active-child");
          td ? td.classList.remove("active-child") : "";
          // end//

          // start//
          let tr = list.querySelector(".active");
          e.target.classList.contains("active")
            ? tr
              ? (tr.classList.remove("active"),
                (tr.querySelector(".checkbox-input").checked = false))
              : ""
            : "";
          // end//

          function unselectText() {
            if (window.getSelection) {
              window.getSelection().removeAllRanges();
            } else if (document.selection) {
              document.selection.empty();
            }
          }

          // Call the function to unselect the text
          unselectText();
          //removing end -------------------------//
          parent.children[3].style.backgroundColor = "#fff";
          parent.children[4].style.backgroundColor = "#fff";
          parent.classList.add("active");
        } else {
          var new_count = parseInt(current_count) - 1;
          if (new_count == 0) {
            element_count_container.style.display = "none";
            element_count.innerText = "";
          } else {
            element_count.innerText = new_count + " " + "selected";
          }

          parent.classList.remove("active");
          e.target.checked = false;
        }
      }
      //cancel selection
      if (e.target.classList.contains("cancel-selection")) {
        let tr = document.querySelectorAll(".list-name-container .active");
        tr
          ? Array.from(tr).forEach((e) => {
              e.classList.remove("active");
              e.querySelector(".checkbox-input").checked = false;
            })
          : "";

        var element_count_container = document.querySelector(
          "#selected-item-container"
        );
        element_count_container.style.display = "none";
      }
      //remove row
      if (e.target.classList.contains("delete")) {
        var element_count_container = (document.querySelector(
          "#selected-item-container"
        ).style.display = "none");
        document.querySelector("#selected-item-container .count").innerText =
          "";
        let td = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr td"
        );

        Array.from(td).forEach((td) => {
          if (td.classList.contains("active-child")) {
            td.parentElement.remove();
            addRow();
            let names = document.querySelectorAll(
              ".list-name-container .list-names table tbody tr"
            );
            let i = 1;
            names.forEach((e) => {
              e.setAttribute("data", i++);
              e.querySelector(".number").innerText = i - 1 + ".";
            });
          } else if (td.parentElement.classList.contains("active")) {
            td.parentElement.remove();
            addRow();
            let names = document.querySelectorAll(
              ".list-name-container .list-names table tbody tr"
            );
            let i = 1;
            names.forEach((e) => {
              e.setAttribute("data", i++);
              e.querySelector(".number").innerText = i - 1 + ".";
            });
          }
        });
      }

      //click on the table
      if (e.target.classList.contains("xl65")) {
        var element_count_container = (document.querySelector(
          "#selected-item-container"
        ).style.display = "none");
        document.querySelector("#selected-item-container .count").innerText =
          "";

        let list = document.querySelector(".list-name-container .list-names");
        let td = list.querySelector(".active-child");
        td ? td.classList.remove("active-child") : "";

        setTimeout(() => {
          let tr = document.querySelectorAll(".list-name-container .active");
          tr
            ? Array.from(tr).forEach((e) => {
                e.classList.remove("active");
                e.querySelector(".checkbox-input").checked = false;
              })
            : "";
        });

        if (!e.target.parentElement.classList.contains("disable")) {
          // e.target.classList.add("active");
          e.target.classList.add("active-child");

          let textbox_1 = this.canvas
            .getObjects()
            .filter((el) => el.name === "column-1");
          let textbox_2 = this.canvas
            .getObjects()
            .filter((el) => el.name === "column-2");

          textbox_1[0].set("splitByGrapheme", true);
          textbox_2[0].set("splitByGrapheme", true);

          textbox_1[0].set({
            text: e.target.parentElement.children[1].innerText
              ? e.target.parentElement.children[1].innerText
              : "-column 1-",
          });

          textbox_2[0].set({
            text: e.target.parentElement.children[2].innerText
              ? e.target.parentElement.children[2].innerText
              : "-column 2-",
          });

          this.canvas.renderAll();
        }
      }
      //select all rows has text
      if (e.target.classList.contains("select-all")) {
        //remove active-child
        let list = document.querySelector(".list-name-container .list-names");
        let td = list.querySelector(".active-child");
        td ? td.classList.remove("active-child") : "";

        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr"
        );
        var count = 0;
        Array.from(tr).forEach((ev) => {
          ev.querySelector(".checkbox-input").checked = false;
          ev.classList.remove("active");

          if (
            ev.children[1].innerText.trim() ||
            ev.children[2].innerText.trim()
          ) {
            if (!ev.classList.contains("disable")) {
              count++;
              ev.classList.add("active");
              ev.querySelector(".checkbox-input").checked = true;
              ev.children[3].style.backgroundColor = "#fff";
              ev.children[4].style.backgroundColor = "#fff";
            }
          }
        });
        document.querySelector("#selected-item-container").style.display =
          "flex";
        let current_count = document.querySelector(
          "#selected-item-container .count"
        );

        current_count.innerText = count + " " + "selected";
      }
      //eye show
      if (e.target.classList.contains("eye-show")) {
        e.target.parentElement.parentElement.classList.remove("active");
        e.target.parentElement.parentElement.classList.add("disable");
        let child_1 = e.target.parentElement.parentElement.children[1];
        child_1.contentEditable = false;
        child_1.classList.add("disable");
        child_1.classList.remove("active-child");
        let child_2 = e.target.parentElement.parentElement.children[2];
        child_2.classList.add("disable");

        child_2.contentEditable = false;
        child_2.classList.remove("active-child");

        e.target.parentElement.parentElement.querySelector(
          ".eye-show"
        ).style.display = "none";
        e.target.parentElement.parentElement.querySelector(
          ".eye-hide"
        ).style.display = "inline-block";
        e.target.parentElement.parentElement.querySelector(
          ".able-download"
        ).style.display = "none";
        e.target.parentElement.parentElement.querySelector(
          ".disable-download"
        ).style.display = "inline-block";

        let checkbox =
          e.target.parentElement.parentElement.querySelector(".checkbox-input");
        checkbox.disabled = true;
        checkbox.checked = false;
      }
      //eye hide
      if (e.target.classList.contains("eye-hide")) {
        e.target.parentElement.parentElement.classList.remove("disable");
        let child_1 = e.target.parentElement.parentElement.children[1];
        child_1.classList.remove("disable");

        child_1.contentEditable = true;
        let child_2 = e.target.parentElement.parentElement.children[2];
        child_2.contentEditable = true;
        child_2.classList.remove("disable");
        e.target.parentElement.parentElement.querySelector(
          ".eye-show"
        ).style.display = "inline-block";
        e.target.parentElement.parentElement.querySelector(
          ".eye-hide"
        ).style.display = "none";
        e.target.parentElement.parentElement.querySelector(
          ".able-download"
        ).style.display = "inline-block";
        e.target.parentElement.parentElement.querySelector(
          ".disable-download"
        ).style.display = "none";
        e.target.parentElement.parentElement.querySelector(
          ".checkbox-input"
        ).disabled = false;
      }
      //swap column
      if (e.target.classList.contains("swap-column")) {
        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr td"
        );

        Array.from(tr).forEach((ev) => {
          if (ev.classList.contains("active-child")) {
            let a = ev.parentElement.children[1].innerText;
            let b = ev.parentElement.children[2].innerText;
            ev.parentElement.children[1].innerText = b;
            ev.parentElement.children[2].innerText = a;
          } else if (ev.parentElement.classList.contains("active")) {
            let a = ev.parentElement.children[1].innerText;
            let b = ev.parentElement.children[2].innerText;
            ev.parentElement.children[1].innerText = b;
            ev.parentElement.children[2].innerText = a;
          }
        });
      }
      //clear all rows
      if (e.target.classList.contains("clear-all")) {
        //----------------------------//
        //this will excute if the column is selected
        let parent = document.querySelector(".list-name-container .list-names");

        let td = parent.querySelector(".active-child");

        if (td) {
          td.innerText = "";
          if (
            !td.parentElement.children[1].innerText.length > 0 &&
            !td.parentElement.children[2].innerText.length > 0
          ) {
            td.parentElement.querySelector(".eye-show").style.display = "none";
            td.parentElement.querySelector(".able-download").style.display =
              "none";
          }
          return false;
        }

        //----------------------------//
        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr"
        );

        Array.from(tr).forEach((ev) => {
          if (ev.classList.contains("active")) {
            ev.children[1].innerText = "";
            ev.children[2].innerText = "";
            ev.querySelector(".eye-show").style.display = "none";
            ev.querySelector(".able-download").style.display = "none";
          }
        });
      }
      //sentence case
      if (e.target.classList.contains("sentence-case")) {
        //----------------------------//
        // if no selected text
        if (window.getSelection().toString()) {
          var selectedText = window.getSelection().toString();
          var sentenceCaseText = selectedText
            .replace(/,(?=[^\s])/g, ", ")
            .replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          // Replace the selected text with the uppercase text
          if (window.getSelection) {
            var range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(sentenceCaseText));
          } else if (
            document.selection &&
            document.selection.type != "Control"
          ) {
            document.selection.createRange().text = sentenceCaseText;
          }
          return false;
        }
        //----------------------------//

        //----------------------------//
        //this will excute if the column is selected
        let parent = document.querySelector(".list-name-container .list-names");

        let td = parent.querySelector(".active-child");

        if (td) {
          td.textContent = td.textContent
            .replace(/,(?=[^\s])/g, ", ")
            .replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          return false;
        }
        //----------------------------//

        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr"
        );
        for (let i = 0; i < tr.length; i++) {
          if (tr[i].classList.contains("active")) {
            let b = tr[i].children[1].innerText.replace(/,(?=[^\s])/g, ", ");
            let c = b.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            tr[i].children[1].innerText = c;

            let d = tr[i].children[2].innerText.replace(/,(?=[^\s])/g, ", ");
            let e = d.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            tr[i].children[2].innerText = e;
          }
        }
      }
      // upper case
      if (e.target.classList.contains("upperCase")) {
        // if there is no selected text
        if (window.getSelection().toString()) {
          var selectedText = window.getSelection().toString();
          var uppercaseText = selectedText.toUpperCase();
          // Replace the selected text with the uppercase text
          if (window.getSelection) {
            var range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(uppercaseText));
          } else if (
            document.selection &&
            document.selection.type != "Control"
          ) {
            document.selection.createRange().text = uppercaseText;
          }
          return false;
        }
        //----------------------------//
        //this will excute if the column is selected
        let parent = document.querySelector(".list-name-container .list-names");

        let td = parent.querySelector(".active-child");
        if (td) {
          td.textContent = td.textContent
            .replace(/,(?=[^\s])/g, ", ")
            .toUpperCase();
          return false;
        }
        //----------------------------//

        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr"
        );

        for (let i = 0; i < tr.length; i++) {
          if (tr[i].classList.contains("active")) {
            let b = tr[i].children[1].innerText.replace(/,(?=[^\s])/g, ", ");

            tr[i].children[1].innerText = b.toUpperCase();

            let d = tr[i].children[2].innerText.replace(/,(?=[^\s])/g, ", ");

            tr[i].children[2].innerText = d.toUpperCase();
          }
        }
      }
      //download canvas
      if (e.target.classList.contains("able-download")) {
        let tr = document.querySelectorAll(
          ".list-name-container .list-names  table tbody tr"
        );

        Array.from(tr).forEach((ev) => {
          ev.classList.remove("active");
        });
        e.target.parentElement.classList.add("active");
        let textbox1 = this.canvas
          .getObjects()
          .filter((el) => el.name === "column-1");
        let textbox2 = this.canvas
          .getObjects()
          .filter((el) => el.name === "column-2");

        let grid = this.canvas.getObjects().filter((obj) => {
          return obj.name == "grid";
        });
        grid[0].opacity = 0;
        var checkbox = document.querySelector("#grid");
        // Uncheck the checkbox
        checkbox.checked = false;

        textbox1[0].set({
          text: e.target.parentElement.parentElement.children[1].innerText
            ? e.target.parentElement.parentElement.children[1].innerText
            : "",
        });
        textbox2[0].set({
          text: e.target.parentElement.parentElement.children[2].innerText
            ? e.target.parentElement.parentElement.children[2].innerText
            : "",
        });

        if (textbox1[0].text.trim() || textbox2[0].text.trim()) {
          this.canvas.renderAll();

          let quality = document.querySelector("#image-quality").value;
          var scaleFactor = quality;
          this.canvas.setWidth(this.width * scaleFactor);
          this.canvas.setHeight(this.height * scaleFactor);
          this.canvas.setZoom(scaleFactor);

          this.canvas.renderAll();

          const a = document.createElement("a");
          document.body.appendChild(a);
          a.href = this.canvas.toDataURL({
            format: "jpg",
            quality: 1,
          });
          let filename;
          if (textbox1[0].text.trim()) {
            filename = textbox1[0].text.trim();
          } else {
            filename = textbox2[0].text.trim();
          }

          a.download = `${filename}.jpg`;

          a.click();
          document.body.removeChild(a);

          this.canvas.setWidth(this.width);
          this.canvas.setHeight(this.height);
          this.canvas.setZoom(1);
        } else {
          console.log("no download");
        }
      }
    });

    add_name_btn.addEventListener("click", () => {
      parent.style.right = 0;

      this.canvas.resize_canvas_event = true;

      let a = document.querySelector(".list-name-container").offsetWidth;
      let b = window.innerWidth;
      let c = b - a;
      document.querySelector("main").style.width = c + "px";

      add_name_btn.style.display = "none";

      this.canvas.discardActiveObject();
      this.canvas.renderAll();

      if (this.canvas.resize_canvas_event == true) {
        window.addEventListener("resize", () => {
          let a = document.querySelector(".list-name-container").offsetWidth;
          let b = window.innerWidth;
          let c = b - a;
          document.querySelector("main").style.width = c + "px";
        });
      }
    });

    let saveCloseBtn = document.querySelector(".list-name-container .save");
    // Close
    saveCloseBtn.addEventListener("click", () => {
      this.loading_save("visible", "Saving . .  Please wait...");

      let names = document.querySelectorAll(
        ".list-name-container .list-names table tbody tr"
      );
      let data = [];
      function replaceBreakLine(valueToEscape) {
        if (valueToEscape != null && valueToEscape != "") {
          return valueToEscape.replaceAll(/(\r\n|\n|\r)/gm, "");
        } else {
          return valueToEscape;
        }
      }
      names.forEach((element) => {
        document.querySelector("#selected-item-container").style.display =
          "none";
        document.querySelector("#selected-item-container .count").innerText =
          "";
        element.classList.remove("active");
        element.querySelector(".checkbox-input").checked = false;
        let a = replaceBreakLine(element.children[1].innerText.trim());
        let b = replaceBreakLine(element.children[2].innerText.trim());
        let c = element.className;

        let x = {};
        if (
          (element.children[1].innerText.length &&
            element.children[2].innerText.length) ||
          element.children[1].innerText.length ||
          element.children[2].innerText.length
        ) {
          x.data_1 = a;
          x.data_2 = b;
          x.data_3 = c;
          data.push(x);
        }
      });
      let json_file = JSON.stringify(data);
      //ajax request send
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          parent.style.right = "-532px";
          add_name_btn.style.display = "block";

          document.querySelector("main").style.width = "100%";
          this.canvas.resize_canvas_event = false;

          if (this.canvas.resize_canvas_event == false) {
            window.addEventListener("resize", () => {
              document.querySelector("main").style.width = "100%";
            });
          }

          this.loading_save("visible", "Saved successfuly.");
          this.loading_save("hidden", null);
        } else {
          // handle error
          if (xhttp.status === 404) {
            console.log("Resource not found");
          } else if (xhttp.status === 500) {
            console.log("Server error");
          } else {
            console.log("An error occurred");
          }
        }
        xhttp.onerror = function () {
          // handle error
          console.log("An error occurred");
        };
      };
      xhttp.open(
        "POST",
        `http://localhost:5000/saveList?list_data=${json_file} `,
        true
      );
      xhttp.send();
    });

    document
      .querySelector(".list-name-container")
      .addEventListener("paste", (e) => {
        element.innerHTML = e.clipboardData.getData("text/html");

        let inputs = document.querySelectorAll(
          ".list-name-container table tbody tr"
        );
        let a =
          inputs.length - parseInt(e.target.parentElement.getAttribute("data"));

        if (element.querySelector("table tr")) {
          e.preventDefault();

          let excel_data = [];
          let xx = element.querySelectorAll("table tr");
          let arr = Array.from(xx);
          arr.forEach((ev) => {
            if (ev.children.length !== 0) {
              excel_data.push(ev);
            }
          });
          if (excel_data.length > a + 1) {
            return false;
          } else {
            // if copied data is 1 column only
            if (excel_data[0].children.length < 2) {
              if (e.target.classList.contains("column-1")) {
                for (let i = 0; i < excel_data.length; ) {
                  for (let x = 0; x < inputs.length; x++) {
                    if (!excel_data[i].children[0]) {
                      break;
                    }

                    if (
                      parseInt(inputs[x].getAttribute("data")) >=
                      parseInt(e.target.parentElement.getAttribute("data"))
                    ) {
                      if (inputs[x].className == "disable") {
                        continue; // Skip the current iteration when i is 2
                      }
                      inputs[x].children[1].innerText =
                        excel_data[i].children[0].innerText;

                      // inputs[x].querySelector(".sequence-child").style.margin =
                      //   "10px";

                      inputs[x].querySelector(".eye-show").style.display =
                        "inline-block";
                      inputs[x].querySelector(".able-download").style.display =
                        "inline-block";
                      i++;
                      if (i > excel_data.length - 1) {
                        break;
                      }
                    }
                  }
                }
              }
              if (e.target.classList.contains("column-2")) {
                for (let i = 0; i < excel_data.length; ) {
                  for (let x = 0; x < inputs.length; x++) {
                    if (
                      parseInt(inputs[x].getAttribute("data")) >=
                      parseInt(e.target.parentElement.getAttribute("data"))
                    ) {
                      if (inputs[x].className == "disable") {
                        continue; // Skip the current iteration when i is 2
                      }
                      inputs[x].children[2].textContent =
                        excel_data[i].children[0].textContent;
                      inputs[x].querySelector(".eye-show").style.display =
                        "inline-block";
                      inputs[x].querySelector(".able-download").style.display =
                        "inline-block";
                      i++;
                      if (i > excel_data.length - 1) {
                        break;
                      }
                    }
                  }
                }
              }
            }

            // if copied data is 2 columns
            if (excel_data[0].children.length > 1) {
              if (e.target.classList.contains("column-1")) {
                for (let i = 0; i < excel_data.length; ) {
                  for (let x = 0; x < inputs.length; x++) {
                    if (
                      parseInt(inputs[x].getAttribute("data")) >=
                      parseInt(e.target.parentElement.getAttribute("data"))
                    ) {
                      if (inputs[x].className == "disable") {
                        continue; // Skip the current iteration when i is 2
                      }
                      inputs[x].children[1].textContent =
                        excel_data[i].children[0].textContent;
                      inputs[x].children[2].textContent =
                        excel_data[i].children[1].textContent;
                      inputs[x].querySelector(".eye-show").style.display =
                        "inline-block";
                      inputs[x].querySelector(".able-download").style.display =
                        "inline-block";
                      i++;
                      if (i > excel_data.length - 1) {
                        break;
                      }
                    }
                  }
                }
              }
              if (e.target.classList.contains("column-2")) {
                for (let i = 0; i < excel_data.length; ) {
                  for (let x = 0; x < inputs.length; x++) {
                    if (
                      parseInt(inputs[x].getAttribute("data")) >=
                      parseInt(e.target.parentElement.getAttribute("data"))
                    ) {
                      if (inputs[x].className == "disable") {
                        continue; // Skip the current iteration when i is 2
                      }
                      inputs[x].children[2].textContent =
                        excel_data[i].children[0].textContent;
                      inputs[x].querySelector(".eye-show").style.display =
                        "inline-block";
                      inputs[x].querySelector(".able-download").style.display =
                        "inline-block";
                      i++;
                      if (i > excel_data.length - 1) {
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          // e.preventDefault();
          // // Get pasted text
          // const clipboardData = e.clipboardData || window.clipboardData;
          // const pastedText = clipboardData.getData("text");
          // // // Remove formatting from pasted text
          // const plainText = pastedText.replace(/(<([^>]+)>)/gi, "");
          // // Insert plain text into element
          // e.target.textContent = plainText.trim();
          setTimeout(() => {
            e.target.textContent = e.target.textContent.replace(
              /(<([^>]+)>)/gi,
              ""
            );
          });
        }

        //   //this area exucute after paste event to change the column text in textbox canvas
        //   let textbox_1 = this.canvas
        //     .getObjects()
        //     .filter((el) => el.name === "column-1");
        //   let textbox_2 = this.canvas
        //     .getObjects()
        //     .filter((el) => el.name === "column-2");
        //   e.target.textContent;
        //   if (e.target.classList.contains("column-1")) {
        //     textbox_1[0].set({ text: e.target.textContent });
        //     textbox_2[0].set({
        //       text: e.target.parentElement.children[2].textContent,
        //     });
        //   }
        //   if (e.target.classList.contains("column-2")) {
        //     textbox_1[0].set({
        //       text: e.target.parentElement.children[1].textContent,
        //     });
        //     textbox_2[0].set({ text: e.target.textContent });
        //   }
        //   this.canvas.renderAll();
      });
  }

  // generate certificate
  generate_certificate() {
    const preview_image = document.querySelector("#preview-image");
    const modal = document.querySelector(
      "#modal-container-generate-certificate"
    );
    const closeBtn = document.querySelector(
      "#modal-container-generate-certificate .close"
    );
    closeBtn.addEventListener("click", closeModal);

    // Close
    function closeModal() {
      modal.querySelector(".modal-canvas").style.display = "none";

      let printImageView = document.querySelectorAll(".print-view-img");
      printImageView.forEach((item) => {
        item.remove();
      });
    }

    preview_image.addEventListener("click", () => {
      this.loading("visible", null);

      setTimeout(() => {
        let arrayName = [];

        let a = document.querySelectorAll(
          ".list-name-container .list-names table tbody tr"
        );
        let count = document.querySelector(
          "#selected-item-container .count"
        ).innerText;
        a.forEach((element) => {
          if (count != "") {
            //no selected
            if (element.className == "active") {
              if (
                (element.children[1].innerText.trim() &&
                  element.children[2].innerText.trim()) ||
                element.children[1].innerText.trim() ||
                element.children[2].innerText.trim()
              ) {
                let data = {
                  dataOne: element.children[1].innerText,
                  dataTwo: element.children[2].innerText,
                };

                arrayName.push(data);
              }
            }
          } else {
            if (element.className != "disable") {
              if (
                (element.children[1].innerText.trim() &&
                  element.children[2].innerText.trim()) ||
                element.children[1].innerText.trim() ||
                element.children[2].innerText.trim()
              ) {
                let data = {
                  dataOne: element.children[1].innerText,
                  dataTwo: element.children[2].innerText,
                };

                arrayName.push(data);
              }
            }
          }
        });

        let names = arrayName;
        if (names.length) {
          let i = 0;

          const again = () => {
            let a = this.canvas.getObjects().filter((e) => {
              return e.name === "column-1";
            });
            a[0].set({ text: names[i].dataOne });

            let b = this.canvas.getObjects().filter((e) => {
              return e.name === "column-2";
            });
            b[0].set({ text: names[i].dataTwo });
            var scaleFactor = 4;
            this.canvas.setWidth(this.width * scaleFactor);
            this.canvas.setHeight(this.height * scaleFactor);
            this.canvas.setZoom(scaleFactor);

            this.canvas.renderAll();
            let imgSrc = this.canvas.toDataURL("image/jpeg", [0.0, 1.0]);

            const img = document.createElement("img");
            img.setAttribute("name", a[0].text.trim() || b[0].text.trim());
            img.src = imgSrc;
            img.width = "600";
            img.className = "print-view-img";
            document
              .querySelector(
                "#modal-container-generate-certificate .modal-body"
              )
              .appendChild(img);
            this.canvas.setWidth(this.width);
            this.canvas.setHeight(this.height);
            this.canvas.setZoom(1);
            this.canvas.renderAll();

            i++;
            let x = i + 1;
            if (i < names.length) {
              this.loading(
                "visible",
                `Generating ${names.length}  certifcates:<br> ${x} completed`
              );
              setTimeout(() => {
                again();
              });
            } else {
              let images = document.querySelectorAll(".print-view-img");

              var urls = [];
              images.forEach((e) => {
                let data = {};
                data.src = e.src;
                data.name = e.getAttribute("name");
                urls.push(data);
              });
              downloadZip().then(() => {
                this.loading(
                  "visible",
                  `<h4> Successfuly Downloaded  ${names.length}  certifcates</h4> <br>  <div class="btn  btn-md btn-success done-download">Close</div>`
                );

                document
                  .querySelector(".done-download")
                  .addEventListener("click", () => {
                    this.loading("hidden", null);
                  });

                //delete created images after download
                document.querySelector(
                  "#modal-container-generate-certificate .modal-body"
                ).innerHTML = "";
              });
              function downloadZip() {
                return new Promise((resolve, reject) => {
                  var zip = new JSZip();
                  var count = 0;
                  var zipFilename = "zipFilename.zip";

                  urls.forEach(function (url) {
                    var filename = url.name;
                    // loading a file and add it in a zip file
                    JSZipUtils.getBinaryContent(url.src, function (err, data) {
                      if (err) {
                        throw err; // or handle the error
                      }
                      var img = zip.folder("images");
                      let a = count + 1;
                      img.file(filename + "_" + "00" + a + ".png", data, {
                        binary: true,
                      });
                      count++;
                      if (count == urls.length) {
                        zip
                          .generateAsync({ type: "blob" })
                          .then(function (content) {
                            const a = document.createElement("a");
                            a.href = URL.createObjectURL(content);

                            document.body.appendChild(a);
                            a.download = zipFilename;
                            a.click();
                            document.body.removeChild(a);

                            // saveAs(content, "zipFilename");
                          });
                      }
                    });
                  });

                  resolve();
                });
              }
            }
          };
          again();
        } else {
          this.loading(
            "visible",
            `<h4> No selected row </h4> <br>  <div class="btn  btn-md btn-danger text text-white done-download">Close</div>`
          );

          document
            .querySelector(".done-download")
            .addEventListener("click", () => {
              this.loading("hidden", null);
            });
        }
      }, 1000);
    });
  }

  //insert name on textbox
  insert_textbox() {
    const doubleClick = (e) => {
      let parent = document.querySelector(".list-name-container");
      let add_name_btn = document.querySelector("#insert-names");
      if (
        (e.target && e.target.name == "column-1") ||
        (e.target && e.target.name == "column-2")
      ) {
        e.editable = false;
        parent.style.right = 0;

        this.canvas.resize_canvas_event = true;

        let a = parent.offsetWidth;
        let b = window.innerWidth;
        let c = b - a;
        document.querySelector("main").style.width = c + "px";

        add_name_btn.style.display = "none";
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
      }
    };
    this.canvas.on({
      "mouse:dblclick": doubleClick,
    });
  }
  //download image
  download_as_Zip() {
    const download_as_Zip = document.querySelector("#download_as_Zip");
    download_as_Zip.onclick = () => {
      let images = document.querySelectorAll(".print-view-img");

      var urls = [];
      images.forEach((e) => {
        urls.push(e.src);
      });
      downloadZip();
      function downloadZip() {
        var zip = new JSZip();
        var count = 0;
        var zipFilename = "zipFilename.zip";

        urls.forEach(function (url) {
          var filename = "filename";
          // loading a file and add it in a zip file
          JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
              throw err; // or handle the error
            }
            var img = zip.folder("images");
            img.file(filename + "_" + count + ".png", data, { binary: true });
            count++;
            if (count == urls.length) {
              zip.generateAsync({ type: "blob" }).then(function (content) {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);

                document.body.appendChild(a);
                a.download = zipFilename;
                a.click();
                document.body.removeChild(a);
              });
            }
          });
        });
      }
    };
  }

  // font color change
  fontColor() {
    this.observeValue("fill");
  }
  superScript() {
    let superScript = document.querySelector("#superScript");
    // Event listener for input changes

    superScript.addEventListener("click", () => {
      let object = this.canvas.getActiveObject();
      if (!object) {
        this.alert("no selected textbox or image");
        return false;
      }
      if (object.getSelectedText() != "") {
        if (
          object.getSelectionStyles()[0].deltaY == 0 ||
          object.getSelectionStyles()[0].deltaY == undefined
        ) {
          // object.setSelectionStyles({
          //   deltaY: -+object.fontSize * 0.5,
          //   fontSize: object.fontSize * 0.6,
          // });
          object.setSuperscript();
        } else {
          object.setSelectionStyles({
            deltaY: undefined,
            fontSize: undefined,
          });
        }

        // // Check if the input is equal to 'th'
        // if (inputValue === 'th') {
        //   textbox.set('fill', 'blue');
        // } else {
        //   textbox.set('fill', 'black');
        // }

        this.canvas.renderAll();
      }
    });
  }

  fontProperties() {
    this.bold_Italic("fontWeight", "bold");
    this.bold_Italic("fontStyle", "italic");
  }

  //text align left
  textAlign() {
    this.observeTargetValue("textAlign");
  }

  //font size
  fontSize() {
    this.observeValue("fontSize");
  }
  //font family
  fontStyle() {
    // fonts
    var fonts = [
      "Roboto",
      "Dancing Script",
      "Work Sans",
      "Open Sans",
      "Arial",
      "Titan One",
      "Fredoka One",
      "Sansita",
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
    fontFamilySelect.oninput = (e) => {
      let object = this.canvas.getActiveObject();
      if (!object) {
        this.alert("no selected textbox or image");
        return false;
      }
      object.removeStyle("fontFamily");
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
          if (object.getSelectedText() != "") {
            object.setSelectionStyles({ fontFamily: font });
            this.canvas.renderAll();
          } else if (window.getSelection().toString() == "") {
            object.removeStyle("fontFamily");
            object.set("fontFamily", font);
            object.dirty = true;
            this.canvas.renderAll();
          }
        })
        .catch((e) => {
          this.alert("unstable internet connection. cannot load google fonts");
        });
    };
  }
  //delete object
  deleteObjects() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Delete") {
        if (this.user_role == "admin") {
          this.canvas.remove(this.canvas.getActiveObject());
        }
        if (this.user_role == "user") {
          if (this.canvas.getActiveObject().name === "textbox") {
            return false;
          }

          this.canvas.remove(this.canvas.getActiveObject());
        }
      }
    });
  }

  keyboard_shortcut() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "d") {
        event.preventDefault();
      }

      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
      }
    });
    fabric.util.addListener(document.body, "keydown", (options) => {
      if (options.repeat) {
        return;
      }
      var key = options.which || options.keyCode; // key detection

      // if (key === 83 && options.ctrlKey) {
      // save()
      // }

      if (key === 83 && options.ctrlKey) {
        this.compile_json();
      }
      //   if (key === 79 && options.ctrlKey) {
      // getFile()
      // }
    });
  }
}
