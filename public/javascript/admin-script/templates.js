//admin

class Crud_templates {
  show_templates_form() {
    let template_form = document.querySelector(".admin-templates-container");
    if (!template_form) {
      return false;
    }

    template_form.querySelector("#close-form").onclick = () => {
      let certificate_form = template_form.querySelector(
        "#certificate-template-form"
      );
      certificate_form ? (certificate_form.style.display = "none") : null;
      let school_form = template_form.querySelector("#school-template-form");
      school_form ? (school_form.style.display = "none") : null;

      template_form.querySelector("#close-form").style.display = "none";
    };

    if (
      template_form &&
      template_form.querySelector("#certificate-templates-form-btn")
    ) {
      template_form
        .querySelector("#certificate-templates-form-btn")
        .addEventListener("click", () => {
          template_form.querySelector("#close-form").style.display = "block";

          template_form.querySelector(
            "#certificate-template-form"
          ).style.display = "block";
          template_form.querySelector("#school-template-form").style.display =
            "none";
        });

      template_form
        .querySelector("#school-templates-form-btn")
        .addEventListener("click", () => {
          template_form.querySelector("#close-form").style.display = "block";

          template_form.querySelector("#school-template-form").style.display =
            "block";
          template_form.querySelector(
            "#certificate-template-form"
          ).style.display = "none";
        });
    }
  }
  convert_file_to_json() {
    let template_form = document.querySelector(".admin-templates-container");
    if (!template_form) {
      return false;
    }

    template_form.addEventListener("change", (e) => {
      if (e.target.classList.contains("json-file-input")) {
        var reader = new FileReader();
        reader.onload = (event) => {
          let json = event.target.result;
          e.target.parentElement.querySelector("#json_file").value = json;
        };
        reader.readAsText(e.target.files[0]);
      }
    });
  }

  template() {
    let parent = document.querySelector(".admin-templates-container");
    if (parent)
      parent.addEventListener("click", (e) => {
        let template = e.target.parentElement.parentElement.parentElement;

        //modal edit template //edit template
        if (e.target.classList.contains("edit-template")) {
          template.querySelector(".option-list-container").style.display =
            "none"; // close option list

          //modal display element start//
          let modal_parent = template.querySelector(".modal-edit-admin");
          modal_parent.style.display = "flex";
          let modal_title = modal_parent.querySelector(".modal-title");
          let modal_description = modal_parent.querySelector(".description");
          let modal_id = modal_parent.querySelector(".template_id");
          let modal_json_file = modal_parent.querySelector("#json_file");

          let display_thumbnail =
            modal_parent.querySelector(".display_thumbnail");

          //modal display element end//

          //element from display element start//

          let template_title = template.querySelector(".title").innerText;
          let template_json = template.querySelector("#template_json").value;

          let template_description =
            template.querySelector(".description").innerText;
          let template_id = template.querySelector(".template-id").value;
          let template_thumbnail = template.querySelector(".thumbnail").src;
          let display_modal_image = template.querySelector(
            ".display_modal_image"
          );

          modal_title.value = template_title;
          modal_json_file.value = template_json;
          modal_description.value = template_description.trim();
          display_thumbnail.src = template_thumbnail;

          modal_id.value = template_id;

          modal_parent
            .querySelector(".cancel-btn")
            .addEventListener("click", () => {
              modal_parent.style.display = "none";
            });

          //display upload image before submission to server
          modal_parent
            .querySelector(".thumbnail-image")
            .addEventListener("change", (e) => {
              const imageFiles = e.target.files;
              /**
               * Count the number of files selected.
               */
              const imageFilesLength = imageFiles.length;
              /**
               * If at least one image is selected, then proceed to display the preview.
               */
              if (imageFilesLength > 0) {
                /**
                 * Get the image path.
                 */
                const imageSrc = URL.createObjectURL(imageFiles[0]);
                /**
                 * Select the image preview element.
                 */

                /**
                 * Assign the path to the image preview element.
                 */
                display_thumbnail.src = imageSrc;
              }
            });
          modal_parent
            .querySelector(".modal-image")
            .addEventListener("change", (e) => {
              const imageFiles = e.target.files;
              /**
               * Count the number of files selected.
               */
              const imageFilesLength = imageFiles.length;
              /**
               * If at least one image is selected, then proceed to display the preview.
               */
              if (imageFilesLength > 0) {
                /**
                 * Get the image path.
                 */
                const imageSrc = URL.createObjectURL(imageFiles[0]);
                /**
                 * Select the image preview element.
                 */

                /**
                 * Assign the path to the image preview element.
                 */
                display_modal_image.src = imageSrc;
              }
            });
        }

        //delete and remove
        if (e.target.classList.contains("delete-template-btn")) {
          let parent =
            e.target.parentElement.parentElement.parentElement.parentElement
              .parentElement.parentElement;

          let modal_parent =
            e.target.parentElement.parentElement.parentElement.parentElement
              .parentElement;
          let template_id = modal_parent.querySelector(".template_id").value;

          let modal_image_path =
            modal_parent.querySelector(".modal_image_path").value;
          let thumbnail_image_path = modal_parent.querySelector(
            ".thumbnail_image_path"
          ).value;
          let category = modal_parent.querySelector(".category").value;

          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              //  let data = JSON.parse(xhttp.responseText);
              parent.remove();
            }
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/admin_delete_template?modal_image_path=${modal_image_path}&thumbnail_image_path=${thumbnail_image_path}&template_id=${template_id}&category=${category}`,
            true
          );
          xhttp.send();
        }
      });
  }
  show_options() {
    if (document.querySelector(".admin-templates ")) {
      document
        .querySelector(".admin-templates ")
        .addEventListener("click", (e) => {
          let parent = e.target.parentElement;
          if (e.target.classList.contains("gear-option")) {
            parent.querySelector(".option-list-container").style.display =
              "block";
            parent.querySelector(".container").style.display = "block";
          }

          if (e.target.classList.contains("container")) {
            parent.querySelector(".container").style.display = "none";

            parent.querySelector(".option-list-container").style.display =
              "none";
          }
        });
    }
  }

  publish() {
    if (document.querySelector(".admin-templates ")) {
      document
        .querySelector(".admin-templates ")
        .addEventListener("click", (e) => {
          if (e.target.classList.contains("publish-btn")) {
            let parent = e.target.parentElement.parentElement.parentElement;

            let category = parent.querySelector(".category");
            let template_id = parent.querySelector(".template-id");

            let status = parent.querySelector("#published_status"); //input value
            let live = parent.querySelector("#status"); //element to change to aware the user the changes
            parent.querySelector(
              ".admin-templates .option-list-container"
            ).style.display = "none";
            parent.querySelector(".container").style.display = "none";

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                //  let data = JSON.parse(xhttp.responseText);
                if (live.classList.contains("live")) {
                  live.classList.remove("live");
                  live.classList.add("not-live");
                  e.target.textContent = "publish";
                  live.textContent = "Hidden";
                  status.value = "true";
                } else {
                  live.classList.remove("not-live");
                  live.classList.add("live");
                  e.target.textContent = "Unpublish";
                  live.textContent = "Live";
                  status.value = "false";
                }
              }
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/publish?template_id=${template_id.value}&published_status=${status.value}&category=${category.value}`,
              true
            );
            xhttp.send();
          }
        });
    }
  }
}

export default Crud_templates;
