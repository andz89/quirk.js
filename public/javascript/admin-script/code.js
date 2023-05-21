class Code {
  copy_code() {
    if (document.querySelector(".admin-subscription-page")) {
      document
        .querySelector(".close-code-form")
        .addEventListener("click", () => {
          let element = document.querySelector(
            ".admin-subscription-page .code-form-container"
          );
          element.classList.add("hide");
          element.classList.remove("show");
        });
      document
        .querySelector(".admin-subscription-page table tbody")
        .addEventListener("click", (e) => {
          if (e.target.classList.contains("copy-code")) {
            let input = document.createElement("input");
            e.target.parentElement.parentElement.appendChild(input);
            let text =
              e.target.parentElement.parentElement.querySelector(
                "span"
              ).innerText;
            input.value = text;

            input.select();
            input.setSelectionRange(0, 99999); // For mobile devices
            e.target.parentElement.querySelector(
              ".copy-message"
            ).style.display = "block";

            setTimeout(function () {
              e.target.parentElement.querySelector(
                ".copy-message"
              ).style.display = "none";
            }, 1000);
            // Copy the text inside the text field
            navigator.clipboard.writeText(input.value);
            input.remove();
          }
        });
    }
  }
  create_code() {
    if (document.querySelector(".admin-subscription-page")) {
      document
        .querySelector(".admin-subscription-page .show-code-form-btn")
        .addEventListener("click", () => {
          let element = document.querySelector(
            ".admin-subscription-page .code-form-container"
          );
          if (element.classList.contains("hide")) {
            element.classList.add("show");
            element.classList.remove("hide");
          } else {
            element.classList.add("hide");
            element.classList.remove("show");
          }
        });
      if (document.querySelector(".create-code")) {
        document.querySelector(".create-code").addEventListener("click", () => {
          let element = document.querySelector(
            ".admin-subscription-page .code-form-container"
          );
          let duration = element.querySelector("#duration").value;
          let category = element.querySelector("#category");

          let limit = element.querySelector("#limit").value;

          let note = element.querySelector("textarea").value;

          if (!duration || !note) {
            return false;
          } else {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                let code = xhttp.responseText;
                let element = document.querySelector(
                  ".admin-subscription-page .code-form-container"
                );
                element.classList.add("hide");
                element.classList.remove("show");

                let parent = document.querySelector(
                  ".admin-subscription-page table tbody"
                );
                let tr = document.createElement("tr");
                tr.innerHTML = `
             <tr>
             <td class="code-display">
             <span>${code}</span>
               
                     <div>
                         <div class="btn btn-sm btn-success copy-code">Copy</div>
                         <span class="copy-message">Copied</span>
                     </div>
             </td>
             <td>
               
  
             </td>
             <td>
             
             </td>
             <td>
                 
             </td>
  
             <td>
           
             </td>
             <td>
             ${duration}   
             </td>
             <td>
           
  
         </td>
             <td>
               
  
             </td>
             <td>
             ${category.value}
  
             </td>
             <td>
               
             ${limit}
             </td>
           
             <td class="action">
  
             <div class="btn btn-sm btn-primary text text-white view">View</div>
             <input type="hidden" id="code" value="<%= data.code %>">
             <div class="btn btn-sm btn-danger text text-white delete-code">Remove</div>
  
  
         </td>
         </tr>
             `;
                parent.appendChild(tr);
              }
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/create-code?duration=${duration}&note=${note}&limit=${limit}&category=${category.value}`,
              true
            );
            xhttp.send();
          }
        });
      }

      let element = document.querySelector(
        ".admin-subscription-page table tbody"
      );
      element.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-code")) {
          let code = e.target.parentElement.querySelector("#code").value;
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              let code = xhttp.responseText;

              e.target.parentElement.parentElement.remove();
            }
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/delete-code?code=${code} `,
            true
          );
          xhttp.send();
        }
      });
    }
  }
}

export default Code;
