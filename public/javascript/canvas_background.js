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


        //query to get the link of an image
        if(document.querySelector("#modal-container-add-background-page-templates")){
          let add_bg_image =  document.querySelector("#modal-container-add-background-page-templates")
          let modal_body =   add_bg_image.querySelector('.modal-body')
   
       
           document.querySelector("#canvas-image-background-page-templates-btn").addEventListener("click", ()=>{
     
          
             if(modal_body.innerHTML.length){
           
               console.log('wala ng request');
               add_bg_image.style.display ="flex"
            
       
             }else{
               console.log(' nag request');
        
               var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = () => {
                 if (xhttp.readyState == 4 && xhttp.status == 200) {
                   let data = JSON.parse(xhttp.responseText);
                
                  console.log(data);
          
                   data.forEach((e)=>{
                     let div = document.createElement('div')
                     div.innerHTML = 
                     ` 
                     <img src='http://localhost:5000/images/ci/${e.thumbnail_image}' width="150px">
                     <input type="hidden" name="background_name" value="${e.background_image}">
                     <span class="btn btn-sm btn-success">Apply</span>`
         
                     modal_body.appendChild(div)
                   })
                 
                   add_bg_image.style.display ="flex"
                 }
               };
               xhttp.open(
                 "POST",
                 `http://localhost:5000/get-all-background-image`,
                 true
               );
               xhttp.send();
       
             }
             
       
           })  
   
        
         add_bg_image.querySelector('.close').addEventListener("click",()=>{
    
           add_bg_image.style.display ="none"
         })
        }
        
       
      }
    
}

export default Canvas_background;