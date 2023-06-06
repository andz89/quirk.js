import Global from "./global.js";
class Templates {
  template_event() {
    //templates page
    let templates = document.querySelector(".templates");
    if (templates) {
      document
        .querySelector(".templates")
        .addEventListener("click", function (e) {
          //show modal
          if (e.target.classList.contains("show-template-details")) {
            let parent = e.target.parentElement;
            let modal = document.querySelector(".modal-activation");
            document.querySelector("body").style.overflow = "hidden";
            modal.style.display = "flex";

            //note: create a script that save the request link of image. therefore if the link is called again it will give the saved link not to request again in the server
            let title = parent.querySelector("h4").innerText;
            let description = parent.querySelector("p").innerText;
            let img = parent.querySelector(".modal_image").value;
            let id = parent.querySelector("#display-template-id").value;
            modal.querySelector(".modal-title").innerText = title;
            modal.querySelector(".modal-description").innerText =
              description.trim();
            modal.querySelector(".modal-image").src =
              "images/canvas_image/" + img;
            modal.querySelector("#template-id").value = id;
            modal.querySelector("#template-name").value = title;

            if (document.querySelector(".invitation-page")) {
              document.querySelector("#input-template_id").value = id;
            }
          }

          if (e.target.classList.contains("close")) {
            if (document.querySelector(".invitation-page")) {
              document.querySelector("#input-template_id").value = "";
            }
            document.querySelector(".modal-activation").style.display = "none";
            document.querySelector("body").style.overflow = "auto";
          }
          //input-message-container"
          if (templates.querySelector(".close-input-message-container")) {
            if (
              e.target.matches(".close-input-message-container, .close-btn")
            ) {
              let message_container = document.querySelector(
                ".input-message-container"
              );

              message_container.style.display = "none";
              message_container.querySelector(".expire").style.display = "none";
            }
          }
        });

      // create a copy of template
      templates.addEventListener("click", (e) => {
        if (e.target.classList.contains("create-copy-btn")) {
          let template_id = e.target.parentElement.parentElement.querySelector(
            ".modal-activation #template-id"
          ).value;

          let title = e.target.parentElement.parentElement.querySelector(
            ".modal-activation #template-name"
          ).value;

          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              let response = xhttp.responseText;
              console.log(response);
              if (response === "true") {
                //success creating copy of template

                window.location.href = "http://localhost:5000/my-templates";
              } else if (response === "limit-reach") {
                let message_container = document.querySelector(
                  ".input-message-container"
                );
                message_container.style.display = "flex";
                message_container.querySelector(".limit-reach").style.display =
                  "flex";
              } else if (response == "expired") {
                let message_container = document.querySelector(
                  ".input-message-container"
                );
                message_container.style.display = "flex";
                message_container.querySelector(".expire").style.display =
                  "flex";
              } else {
                window.location.href = "/login-page";
              }
            }
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/activateCertificate?template_name=${title}&template_id=${template_id} `,
            true
          );
          xhttp.send();
        }
      });
    }
  }
  my_templates() {
    // my templates page
    let my_templates = document.querySelector(".purchased-templates-container");
    if (my_templates) {
      my_templates.addEventListener("click", (e) => {
        //show expire message modal
        if (e.target.classList.contains("expire-message")) {
          let message_container = document.querySelector(
            ".input-message-container"
          );
          message_container.style.display = "flex";
          message_container.querySelector(".expire").style.display = "flex";
        }
        //close expire message modal
        if (my_templates.querySelector(".close-input-message-container")) {
          if (e.target.matches(".close-input-message-container, .close-btn")) {
            let message_container = document.querySelector(
              ".input-message-container"
            );
            message_container.style.display = "none";
            message_container.querySelector(".expire").style.display = "none";
          }
        }
      });

      //delete puchased templates
      document
        .querySelector(".certificate-container  ")
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
                Global.alert();

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
        });
    }
  }
  invitation() {
    if (document.querySelector(".invitation-page")) {
      document
        .querySelector(".invitation-page")
        .addEventListener("click", (e) => {
          if (e.target.classList.contains("create-invitation-btn")) {
            document.querySelector(
              ".invitation-input-code-container"
            ).style.display = "flex";
          }

          if (e.target.matches(".cross, .cross-btn")) {
            document.querySelector(
              ".invitation-input-code-container"
            ).style.display = "none";
          }
          if (e.target.classList.contains("sumbit-code-btn")) {
            let template_id = document.querySelector("#input-template_id");
            let code = document.querySelector("#code");

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                let response = xhttp.responseText;

                if (response === "true") {
                  window.location.href = "http://localhost:5000/my-templates";
                } else if (response === "not found") {
                  document.querySelector(
                    ".invitation-input-code-container .message"
                  ).innerText = `Invalid code.`;
                } else {
                  window.location.href = "/";
                }
              }
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/activateInvitation?code=${code.value}&template_id=${template_id.value} `,
              true
            );
            xhttp.send();
          }
        });
    }
  }

  sumbmit_certificate_code() {
    let parent = document.querySelector(".input-message-container");
    if (parent) {
      parent.querySelector(".sumbit-code-btn").addEventListener("click", () => {
        let code = document.querySelector(
          ".input-message-container .code"
        ).value;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = xhttp.responseText;

            if (response == "true") {
              window.location.href = "http://localhost:5000/templates";
            } else {
              let message = document.querySelector(
                ".input-message-container .message"
              );
              message.innerText = response;
            }
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/submit_code_certificate?code=${code} `,
          true
        );
        xhttp.send();
      });
    }
  }
}

export default Templates;
