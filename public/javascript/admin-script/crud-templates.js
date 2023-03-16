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
       
            //modal display element start//
            let modal_parent =  document.querySelector('.modal-edit-admin')
            modal_parent.style.display = 'flex';
            let modal_title = modal_parent.querySelector('.title') 
            let modal_description = modal_parent.querySelector('.description')
            let modal_id = modal_parent.querySelector('.template-id') 
            let display_thumbnail = modal_parent.querySelector('.display_thumbnail') 
            let display_modal_image = modal_parent.querySelector('.display_modal_image') 

            let modal_image_path = modal_parent.querySelector('.modal_image_path')//element in modal
            let thumbnail_image_path = modal_parent.querySelector('.thumbnail_image_path') //element in modal
            //modal display element end//

            //element from display element start//
            let parent = e.target.parentElement.parentElement 
            let template_title = parent.querySelector('.title').innerText;
            let template_description = parent.querySelector('.description').innerText;
            let template_id = parent.querySelector('.template-id').value
            let template_thumbnail = parent.querySelector('.thumbnail').src
            let template_modal_image = parent.querySelector('.modal_image').src

            
            let thumbnail_image_link= parent.querySelector('#thumbnail_image_link').value//element from display
            let modal_image_link= parent.querySelector('#modal_image_link').value//element from display
             //element from display element end//

            //setting value
            modal_image_path.value = modal_image_link
            thumbnail_image_path.value = thumbnail_image_link
            modal_title.value = template_title;
            modal_description.value = template_description.trim()
            display_thumbnail.src = template_thumbnail
            display_modal_image.src = template_modal_image

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
              display_thumbnail.src = ''
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
                  display_thumbnail.src = imageSrc;
           
              }
      
            
      
              
            });

 
          }
        })
    
        
  }
}

export default Crud_templates;
