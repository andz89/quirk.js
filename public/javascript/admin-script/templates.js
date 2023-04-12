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
    let parent = document.querySelector('.admin-templates-container')
        if(parent)
      parent.addEventListener('click', (e)=>{
        let template = e.target.parentElement.parentElement.parentElement
      
          if(e.target.classList.contains('edit-template')){

 
            //modal display element start//
            let modal_parent =  template.querySelector('.modal-edit-admin')
            modal_parent.style.display = 'flex';
            let modal_title = modal_parent.querySelector('.modal-title') 
            let modal_description = modal_parent.querySelector('.description')
            let modal_id = modal_parent.querySelector('.template_id') 
            let display_thumbnail = modal_parent.querySelector('.display_thumbnail') 
         

     
            //modal display element end//

            //element from display element start//
            let parent = e.target.parentElement.parentElement.parentElement;
            let template_title = parent.querySelector('.title').innerText;
            let template_description = parent.querySelector('.description').innerText;
            let template_id = parent.querySelector('.template-id').value
            let template_thumbnail = parent.querySelector('.thumbnail').src
            let display_modal_image = parent.querySelector('.display_modal_image')

            modal_title.value = template_title;
            modal_description.value = template_description.trim()
            display_thumbnail.src = template_thumbnail
 

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

           //display upload image before submission to server
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
            modal_parent.querySelector(".modal-image").addEventListener("change", (e) => {
          
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
              if(e.target.classList.contains('delete-template-btn')){
      
                let parent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
              
                let modal_parent =   e.target.parentElement.parentElement
               let template_id =  modal_parent.querySelector('.template_id').value

            let modal_image_path = modal_parent.querySelector('.modal_image_path').value
            let thumbnail_image_path = modal_parent.querySelector('.thumbnail_image_path').value

 
                   var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = () => {
                 if (xhttp.readyState == 4 && xhttp.status == 200) {
                
                  //  let data = JSON.parse(xhttp.responseText);
                parent.remove()
                   
                 
                 }else{
                   console.log('error')
                 }
               };
               xhttp.open(
                 "POST",
                 `http://localhost:5000/admin_delete_template?modal_image_path=${modal_image_path}&thumbnail_image_path=${thumbnail_image_path}&template_id=${template_id}`,
                 true
               );
               xhttp.send();
                 }
        })
    
        
  }
  show_options(){
    if( document.querySelector('.admin-templates ')){
      document.querySelector('.admin-templates ').addEventListener('click',(e)=>{
        let parent = e.target.parentElement.parentElement
        if(e.target.classList.contains('option')){
    
          parent.querySelector('.option-container').classList.toggle('show')
          parent.querySelector('.container').classList.toggle('show')
        
        }
     
        if(e.target.classList.contains('container')){
  
          parent.querySelector('.container').classList.toggle('show')
  
          parent.querySelector('.option-container').classList.toggle('show')
        }
      })
    }
  
  }

  publish(){
    if( document.querySelector('.admin-templates ')){
      document.querySelector('.admin-templates ').addEventListener('click',(e)=>{
     
        if(e.target.classList.contains('publish-btn')){
          let parent=   e.target.parentElement.parentElement.parentElement
          console.log(parent);
          let template_id =  parent.querySelector('.template-id') 
      
          let status =  parent.querySelector('#published_status').value
          let live = parent.querySelector('#status')
         
         

          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
           
             //  let data = JSON.parse(xhttp.responseText);
             if(live.classList.contains('live')){
              live.classList.remove('live')
              live.classList.add('not-live')
              e.target.innerHTML = ' Unpublish';
              live.innerText = 'Hidden'
             }else{
              live.classList.remove('not-live')
              live.classList.add('live')
              e.target.innerHTML = ' Publish';
              live.innerText = 'Live'

             }
            
         
              
            
            } 
          };
          xhttp.open(
            "POST",
            `http://localhost:5000/publish?template_id=${template_id.value}&published_status=${status}`,
            true
          );
          xhttp.send();
        }
     
     
      })
    }
  }
}

export default Crud_templates;
