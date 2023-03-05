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
 //modal edit template
  edit_template(){
 
        window.addEventListener('click', (e)=>{
       
          if(e.target.classList.contains('edit-template')){
       
            let modal_parent =  document.querySelector('.modal-edit-admin')
            modal_parent.style.display = 'flex';
            let modal_title = modal_parent.querySelector('.title') 
            let modal_description = modal_parent.querySelector('.description')
            let modal_id = modal_parent.querySelector('.template-id') 
            let modal_thumbnail = modal_parent.querySelector('.thumbnail') 
            let parent = e.target.parentElement.parentElement 
          
            let template_title = parent.querySelector('.title').innerText;
     
            let template_description = parent.querySelector('.description').innerText;
            let template_id = parent.querySelector('.template-id').value
            let template_thumbnail = parent.querySelector('.thumbnail').src
       
            modal_title.value = template_title;
            modal_description.value = template_description.trim()
            modal_thumbnail.src = template_thumbnail
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

              modal_title.value = '';
              modal_description.value = ''
              modal_thumbnail.src = ''
              modal_id.value = ''
              modal_parent.querySelector(".json-text").value = ''
              modal_parent.querySelector(".json-file").value = ''
              modal_parent.querySelector(".thumbnail-image").value = ''
              modal_parent.style.display = 'none';
            });


            modal_parent.querySelector(".thumbnail-image").addEventListener("change", (e) => {
          
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
                  modal_thumbnail.src = imageSrc;
           
              }
      
            
      
              
            });

 
          }
        })
    
        
  }
}

export default Crud_templates;
