class Canvas_background{
   
      canvas_background(){

        //show canvas_background form
        if(document.querySelector('.form-background')){
          let form =  document.querySelector('.form-background')
          document.querySelector('#add-background').addEventListener('click', function(){
           
            if (form.classList.contains("hide")) {
              form.classList.remove("hide");
              form.classList.add("show");
            } else {
              form.classList.remove("show");
              form.classList.add("hide");
            }
  
           
      
          })
        }

        //modal to get the bg-image
        //query to get the link of an image
        // if(document.querySelector("#modal-container-add-background-page-templates")){
      
        //    document.querySelector("#canvas-image-background-page-templates-btn").addEventListener("click", ()=>{
     
          
        //      if(modal_body.innerHTML.length){
        //        add_bg_image.style.display ="flex"
        //      }else{
        //        var xhttp = new XMLHttpRequest();
        //        xhttp.onreadystatechange = () => {
        //          if (xhttp.readyState == 4 && xhttp.status == 200) {
        //            let data = JSON.parse(xhttp.responseText);
        //            data.forEach((e)=>{
        //              let div = document.createElement('div')
        //              div.innerHTML = 
        //              ` 
        //              <img src='http://localhost:5000/images/ci/${e.thumbnail_image}' width="150px">
        //              <input type="hidden" name="background_name" value="${e.background_image}">
        //              <span class="btn btn-sm btn-success apply-btn">Apply</span>`
         
        //              modal_body.appendChild(div)
        //            })
                 
        //            add_bg_image.style.display ="flex"

        //             add_bg_image.addEventListener("click",(e)=>{
        //                 if(e.target.classList.contains("apply-btn")){
        //                     console.log('ssss')
        //                     let a =   e.target.parentElement.querySelector('input').value
        //                     console.log(a)
        //                     document.querySelector('.admin-templates-container form #canvas_image').value = a
        //                     document.querySelector('.admin-templates-container form #canvas-image-view').src = 'http://localhost:5000/images/ci/'+a
        //                 }
                 
                   
        //             })
        //          }
        //        };
        //        xhttp.open(
        //          "POST",
        //          `http://localhost:5000/get-all-background-image`,
        //          true
        //        );
        //        xhttp.send();
       
        //      }
             
       
        //    })  
   
        
        //  add_bg_image.querySelector('.close').addEventListener("click",()=>{
    
        //    add_bg_image.style.display ="none"
        //  })
       
        // }
        if(document.querySelector("#modal-container-add-background-page-templates")){

          let template_page = document.querySelector('.admin-templates-container')

          let add_bg_image =  document.querySelector("#modal-container-add-background-page-templates")
          let modal_body =   add_bg_image.querySelector('.modal-body')
   
       
          template_page.addEventListener("click",(e)=>{
  
            if(e.target.classList.contains("add-bg-img")) {
              if(modal_body.innerHTML.length){
                add_bg_image.style.display ="flex"
              }else{
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = () => {
                  if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let data = JSON.parse(xhttp.responseText);
                    data.forEach((e)=>{
                      let div = document.createElement('div')
                      div.innerHTML = 
                      ` 
                      <img src='http://localhost:5000/images/ci/${e.thumbnail_image}' width="150px">
                      <input type="hidden" name="background_name" value="${e.background_image}">
                      <span class="btn btn-sm btn-success apply-btn">Apply</span>`
          
                      modal_body.appendChild(div)
                    })
                  
                    add_bg_image.style.display ="flex"
 
                     add_bg_image.addEventListener("click",(e)=>{
                         if(e.target.classList.contains("apply-btn")){
                         
                             let a =   e.target.parentElement.querySelector('input').value
                        
                             document.querySelector('.admin-templates-container form #canvas_image').value = a
                             document.querySelector('.admin-templates-container form #canvas-image-view').src = 'http://localhost:5000/images/ci/'+a
                         }
                  
                    
                     })
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
           

            add_bg_image.querySelector('.close').addEventListener("click",()=>{
    
              add_bg_image.style.display ="none"
            })
          })
        }
    
      }
    
}

export default Canvas_background;