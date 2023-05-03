class Canvas_background {
  canvas_background() {
    function display_upload_image(selector_input, selector_display) {
      parent.querySelector(selector_input).addEventListener("change", (e) => {
        const imageFiles = e.target.files;
        const imageFilesLength = imageFiles.length;
        if (imageFilesLength > 0) {
          const imageSrc = URL.createObjectURL(imageFiles[0]);
          parent.querySelector(selector_display).src = imageSrc;
        }
      });
    }
    //show canvas_background form
    if (document.querySelector(".form-background")) {
      let form = document.querySelector(".form-background");
      document
        .querySelector("#add-background")
        .addEventListener("click", function () {
          if (form.classList.contains("hide")) {
            form.classList.remove("hide");
            form.classList.add("show");
          } else {
            form.classList.remove("show");
            form.classList.add("hide");
          }
        });
    }

    if (
      document.querySelector("#modal-container-add-background-page-templates")
    ) {
      let template_page = document.querySelector(".admin-templates-container");

      let add_bg_image = document.querySelector(
        "#modal-container-add-background-page-templates"
      ); //modal div element
      let modal_body = add_bg_image.querySelector(".modal-body");

      template_page.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-bg-img")) {
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
                      <img src='http://localhost:5000/images/canvas_image/${e.thumbnail_image}' width="150px">
                      <input type="hidden" name="background_name" value="${e.background_image}">
                      <span class="btn btn-sm btn-success apply-btn">Apply</span>`;

                  modal_body.appendChild(div);
                });

                add_bg_image.style.display = "flex";

                add_bg_image.addEventListener("click", (e) => {
                  if (e.target.classList.contains("apply-btn")) {
                    let a = e.target.parentElement.querySelector("input").value;

                    document.querySelector(
                      ".admin-templates-container form #canvas_image"
                    ).value = a;
                    document.querySelector(
                      ".admin-templates-container form #canvas-image-view"
                    ).src = "http://localhost:5000/images/canvas_image/" + a;
                  }
                  if (e.target.classList.contains("close")) {
                    add_bg_image.style.display = "none";
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
        }
      });
    }
  }

  //view and edit
  modal_background_details() {
    function display_upload_image(selector_input, selector_display) {
      parent.querySelector(selector_input).addEventListener("change", (e) => {
        const imageFiles = e.target.files;
        const imageFilesLength = imageFiles.length;
        if (imageFilesLength > 0) {
          const imageSrc = URL.createObjectURL(imageFiles[0]);
          parent.querySelector(selector_display).src = imageSrc;
        }
      });
    }
    let parent = document.querySelector(".canvas-background-container");
    if (parent) {
      parent.addEventListener("click", function (e) {
        //option list
        if (e.target.classList.contains("option-icon")) {
          let element = e.target.parentElement;
          element.querySelector(".option-list").style.display = "block";
          element.querySelector(".container").style.display = "block";
        }
        //hide container
        if (e.target.classList.contains("container")) {
          let element = e.target.parentElement;
          element.querySelector(".option-list").style.display = "none";
          element.querySelector(".container").style.display = "none";
        }
        //hide option list after clicking
        if (e.target.matches(".edit-btn, .publish-btn")) {
          let element = e.target.parentElement.parentElement;
          element.querySelector(".option-list").style.display = "none";
          element.querySelector(".container").style.display = "none";
        }

        //edit btn / open modal
        if (e.target.classList.contains("edit-btn")) {
          document.querySelector("body").style.overflow = "hidden"; //remove scroll in page

          let parent = e.target.parentElement.parentElement.parentElement;

          document.querySelector(".modal-edit-background").style.display =
            "flex"; //show nodal

          //----   below query is to get the value of the template  ----//
          let title = parent.querySelector("h4").innerText;
          let description = parent.querySelector("p").innerText;
          let thumbnail_image = parent.querySelector("#thumbnail-image").src;
          let bg_image = parent.querySelector("#bg-image").src;
          let id = parent.querySelector("#display-bg-id").value;
          let thumbnail_path = parent.querySelector(
            ".thumbnail_image_path"
          ).value;
          let bg_path = parent.querySelector(".background_image_path").value;

          //----   below query is to get the element of modal and set the values  ----//

          document.querySelector(
            ".modal-edit-background .thumbnail_image_path_modal"
          ).value = thumbnail_path;

          document.querySelector(
            ".modal-edit-background .background_image_path_modal"
          ).value = bg_path;

          document.querySelector(".modal-edit-background .modal-title").value =
            title;
          document.querySelector(
            ".modal-edit-background .modal-description"
          ).value = description.trim();
          document.querySelector(
            ".modal-edit-background .modal-image-thumbnail"
          ).src = thumbnail_image;

          document.querySelector(".modal-edit-background .modal-bg-image").src =
            bg_image;
          document.querySelector(".modal-edit-background #bg-id").value = id;
          display_upload_image(
            ".modal-edit-background #modal-thumbnail-image-input",
            ".modal-edit-background .modal-image-thumbnail"
          );
          display_upload_image(
            ".modal-edit-background #modal-bg-image-input",
            ".modal-edit-background .modal-bg-image"
          );

          //close modal
          document
            .querySelector(".modal-edit-background .close")
            .addEventListener("click", function () {
              document.querySelector("body").style.overflow = "auto"; //add scroll in page

              document.querySelector(".modal-edit-background").style.display =
                "none";
            });
        }
        //delete bg
        if (e.target.classList.contains("delete-btn")) {
          let parent = e.target.parentElement.parentElement.parentElement;

          let thumbnail_image_path = parent.querySelector(
            ".thumbnail_image_path"
          ).value;
          let background_image_path = parent.querySelector(
            ".background_image_path"
          ).value;

          let background_id = parent.querySelector("#display-bg-id").value;

          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              let data = JSON.parse(xhttp.responseText);
              parent.remove();
            }
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/delete_background?thumbnail_image_path=${thumbnail_image_path}&background_image_path=${background_image_path}&background_id=${background_id}`,
            true
          );
          xhttp.send();
        }
      });
    }
  }
}

export default Canvas_background;
