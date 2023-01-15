class Add_templates {
  show_templates_form() {
    let template_form = document.querySelector("#template-form");
    if (template_form) {
      document
        .querySelector("#display-add-templates-form-btn")
        .addEventListener("click", () => {
          if (template_form.classList.contains("hide")) {
            document.querySelector("#template-form").classList.remove("hide");
            document.querySelector("#template-form").classList.add("show");
          } else {
            document.querySelector("#template-form").classList.remove("show");
            document.querySelector("#template-form").classList.add("hide");
          }
        });
    }
  }
  submit_template() {
   
    if (document.querySelector("#json-file")) {
      document.querySelector("#json-file").addEventListener("change", (e) => {
        var reader = new FileReader();
        reader.onload = (event) => {
          let json = event.target.result;
          
          document.querySelector("#json_file").value = json;
        };
        reader.readAsText(e.target.files[0]);
      });
    }
  }
}

export default Add_templates;
