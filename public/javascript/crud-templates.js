//admin

class Crud_templates {
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
  convert_file_to_json() {
   
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
  edit_template(){
 
        window.addEventListener('click', (e)=>{
          if(e.target.classList.contains('edit-template')){
            let modal_parent =  document.querySelector('.modal-edit-admin')
            modal_parent.style.display = 'flex';
            let modal_title = modal_parent.querySelector('.title') 
            let modal_description = modal_parent.querySelector('.description')
            let modal_id = modal_parent.querySelector('.template-id') 


            let parent = e.target.parentElement
          
            let template_title = parent.querySelector('.title').innerText;
     
            let template_description = parent.querySelector('.description').innerText;
            let template_id = parent.querySelector('.template-id').value


            modal_title.value = template_title;
            modal_description.value = template_description
            console.log(modal_id);
            modal_id.value = template_id

            //json file
            modal_parent.querySelector(".json-file").addEventListener("change", (e) => {
              var reader = new FileReader();
              reader.onload = (event) => {
                let json = event.target.result;
                
               modal_parent.querySelector(".json-text").value = json;
              };
              reader.readAsText(e.target.files[0]);
            });
            
            modal_parent.querySelector('.cancel-btn').addEventListener('click', ()=>{
              modal_parent.style.display = 'none';
            });



            document.querySelector(".modal-edit-admin .update-template-btn").addEventListener("click", () => {
              let modal_parent =  document.querySelector('.modal-edit-admin')
              let template_title = modal_parent.querySelector('.title').value
              let template_description = modal_parent.querySelector('.description').value
              let template_id = modal_parent.querySelector('.template-id').value
              let template_json = modal_parent.querySelector('.json-text').value

              
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    modal_parent.style.display = 'none';
                    parent.querySelector('.title').innerText = template_title 
                     parent.querySelector('.description').innerText =template_description
              
                }
            };
            xhttp.open(
                "POST",
                `http://localhost:5000/updateTemplate?template_title=${template_title}&template_description=${template_description}&template_id=${template_id}&template_json=${encodeURIComponent(template_json)}`,
                true
            );
            xhttp.send();
        });
          }
        })
    
        
  }
}

export default Crud_templates;
