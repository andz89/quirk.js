import { run_script } from "./canvas/_index";

let FontFaceObserver = require("fontfaceobserver");

import "../sass/canvas-css/main-canvas.scss";

const container = document.querySelector(".content");

window.addEventListener("load", function () {
  const get_canvas_data = (template_id, purchased_id) => {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let data = JSON.parse(xhttp.responseText);
          function saveDataToLocalStorage(templateId, purchaseId) {
            // Check if local storage is available
            if (typeof Storage !== "undefined") {
              // Create an object to store the data
              var data = {
                templateId: templateId,
                purchaseId: purchaseId,
              };

              // Save the data object in local storage
              localStorage.setItem("quirk-template", JSON.stringify(data));
            } else {
            }
          }
          saveDataToLocalStorage(data.template_id, data.purchased_id);
          const object = {};
          object.template_json = data.template_json;
          object.purchased_id = data.purchased_id;
          object.template_name = data.template_name;
          object.user_role = data.user_role;
          object.template_id = data.template_id;
          object.table = data.table;
          object.list = data.list;
          object.category = data.category;
          run_script(object);
          document.querySelector(
            ".purchased-templates-container"
          ).style.display = "none";
          resolve();
        }
      };
      xhttp.open(
        "post",
        `http://localhost:5000/get_canvas_data?template_id=${template_id}&purchased_id=${purchased_id}`,
        true
      );
      xhttp.send();
    });
  };

  if (localStorage.getItem("quirk-template")) {
    let data = JSON.parse(localStorage.getItem("quirk-template"));

    // Local storage has the data item

    get_canvas_data(data.templateId, data.purchaseId);
  } else {
    // Local storage does not have the data item

    const ajax_request = () => {
      return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            let x = data["result"];

            let html = document.createElement("div");
            html.className = "purchased-templates  certificate-container py-1";
            html.style = "width:100%";
            x.forEach((data) => {
              if (data.template_id === undefined) {
                return false;
              }
              html.innerHTML += `          
            <div class="template-container">
                <input type="hidden" class="template_id" value="${data.template_id}">
                <input type="hidden" class="purchased_id" value="${data.purchased_id} ">
                          <div>
                                <img src="http://localhost:5000/images/canvas_image/${data.thumbnail}"
                                    class="hover-opactiy d-image" width="200" alt="">
                                <div class=" text text-dark template-name">
                                    ${data.template_name}
                                </div>
                                </div>
                            <div class="option">
                                <img src="http://localhost:5000/images/list.png" class="hover-opactiy gear-option" width="20"
                                    alt="">
                                <div class="container hide">
                                </div>
                                <div class="delete-template hide">Delete Template</div>
                                <input type="hidden" id="category" value="${data.category}">
                            </div>
            </div>
        `;
              resolve();
            });
            let close_btn = document.createElement("div");
            close_btn.innerHTML = ` <div class="d-flex justify-content-end" style="width: 100%;">
            <div class="btn btn-md btn-primary ">
            <a href="/" class="text text-white">Home</a>
            </div>
        </div>`;
            container.append(close_btn);
            container.append(html); // Insert the generated HTML into the container element

            document.querySelector(
              ".purchased-templates-container"
            ).style.display = "flex";
          }
        };
        xhttp.open(
          "get",
          `http://localhost:5000/fetch_purchased_templates`,
          true
        );
        xhttp.send();
      });
    };
    ajax_request().then(() => {
      document
        .querySelector(".purchased-templates-container")
        .addEventListener("click", (e) => {
          let container = e.target.parentElement.querySelector(".container");
          let btn_element =
            e.target.parentElement.querySelector(".delete-template");
          if (e.target.classList.contains("gear-option")) {
            if (btn_element.classList.contains("hide")) {
              container.classList.add("show");
              container.classList.remove("hide");
              btn_element.classList.add("show");
              btn_element.classList.remove("hide");
            } else {
              btn_element.classList.add("hide");
              btn_element.classList.remove("show");
              container.classList.add("hide");
              container.classList.remove("show");
            }
          }
          if (e.target.classList.contains("container")) {
            btn_element.classList.add("hide");
            btn_element.classList.remove("show");
            container.classList.add("hide");
            container.classList.remove("show");
          }
          if (e.target.classList.contains("delete-template")) {
            let parent = e.target.parentElement.parentElement;
            let category = parent.querySelector("#category").value;

            let purchased_id = parent.querySelector(".purchased_id").value;
            let template_id = parent.querySelector(".template_id").value;

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                e.target.parentElement.parentElement.remove();
              }
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/delete_template?purchased_id=${purchased_id}&template_id=${template_id}&category=${category}`,
              true
            );
            xhttp.send();
          }
          if (e.target.classList.contains("d-image")) {
            if (!document.querySelector("#canvas")) {
              //if there is no created canvas
              let parent = e.target.parentElement.parentElement;
              let template_id = parent.querySelector(".template_id").value;
              let purchased_id = parent.querySelector(".purchased_id").value;
              const get_canvas_data = (template_id, purchased_id) => {
                return new Promise((resolve, reject) => {
                  var xhttp = new XMLHttpRequest();

                  xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                      let data = JSON.parse(xhttp.responseText);
                      function saveDataToLocalStorage(templateId, purchaseId) {
                        // Check if local storage is available
                        if (typeof Storage !== "undefined") {
                          // Create an object to store the data
                          var data = {
                            templateId: templateId,
                            purchaseId: purchaseId,
                          };

                          // Save the data object in local storage
                          localStorage.setItem(
                            "quirk-template",
                            JSON.stringify(data)
                          );
                          console.log("Data saved to local storage");
                        } else {
                          console.log("Local storage is not supported");
                        }
                      }
                      saveDataToLocalStorage(
                        data.template_id,
                        data.purchased_id
                      );
                      const object = {};
                      object.template_json = data.template_json;
                      object.purchased_id = data.purchased_id;
                      object.template_name = data.template_name;
                      object.user_role = data.user_role;
                      object.template_id = data.template_id;
                      object.table = data.table;
                      object.list = data.list;
                      object.category = data.category;
                      run_script(object);
                      document.querySelector(
                        ".purchased-templates-container"
                      ).style.display = "none";
                      resolve();
                    }
                  };
                  xhttp.open(
                    "post",
                    `http://localhost:5000/get_canvas_data?template_id=${template_id}&purchased_id=${purchased_id}`,
                    true
                  );
                  xhttp.send();
                });
              };

              if (localStorage.getItem("quirk-template")) {
                let data = JSON.parse(localStorage.getItem("quirk-template"));

                get_canvas_data(data.templateId, data.purchaseId);
              } else {
                // Local storage does not have the data item
                get_canvas_data(template_id, purchased_id);
              }
            }
          }
        });
    });
  }
});
