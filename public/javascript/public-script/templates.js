class Templates{


    modal_template_details(){
        if(document.querySelector('.templates')){
            document.querySelector('.templates').addEventListener('click', function(e){
                if(e.target.classList.contains('show-template-details')){
                    document.querySelector('.modal-activation .close').addEventListener('click', function(){
                        document.querySelector('.modal-activation').style.display = 'none';
                        document.querySelector('.modal-activation .modal-title').innerText = '';
                        document.querySelector('.modal-activation .modal-description').innerText ='';
                        document.querySelector('.modal-activation .modal-image').src = '';
                        document.querySelector('.modal-activation #template-id').value = '';
    
                        
                    })
                    document.querySelector('.modal-activation').style.display = 'flex';
                let parent = e.target.parentElement
              
                let title =  parent.querySelector('h4').innerText
                let description = parent.querySelector('p').innerText
                let img =  parent.querySelector('img').src
                let id =  parent.querySelector('#display-template-id').value
    
                
    
                document.querySelector('.modal-activation .modal-title').innerText = title;
                document.querySelector('.modal-activation .modal-description').innerText = description.trim();
                document.querySelector('.modal-activation .modal-image').src = img;
                document.querySelector('.modal-activation #template-id').value = id;
                }
            })
    
        }
    
    }   
   create_copy() {
        if (document.querySelector(".modal-activation")) {
         
          document.querySelector("#create-copy-btn").addEventListener("click", () => {
 
         let title =   document.querySelector('.modal-activation .modal-title').innerText 
        let image =    document.querySelector('.modal-activation .modal-image').src 
        let template_id =  document.querySelector('.modal-activation #template-id').value
  

            // let data = {};
            // data.title = title;
            // data.template_id = template_id;
            // data.image = image;


            var xhttp = new XMLHttpRequest();
    
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
               let response = xhttp.responseText
           
           
               if(response === 'true'){
            
                  window.location.href = 'http://localhost:5000/purchased-templates'
               }else{
                let message_container = document.querySelector('.subscribe-message-container')
               
                message_container.style.display = 'flex'
             
                
               }
            

              }
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/activateCanvas?template_name=${title}&image=${image}&template_id=${template_id} `,
              true
            );
            xhttp.send();
          });
        }
      }
    
      sumbmit_code() {
        if (document.querySelector(".templates")) {
           
          document.querySelector(".subscribe-message-container .sumbit-code-btn").addEventListener("click", () => {
  
        let code =  document.querySelector('.subscribe-message-container #code').value
  

            var xhttp = new XMLHttpRequest();
    
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
               let response = xhttp.responseText
           
           
               if(response === 'true'){
                  window.location.href = 'http://localhost:5000/templates'
               }else{
                let message = document.querySelector('.subscribe-message-container .message') 
                message.innerText = response
               }
            

              }
            };
            xhttp.open(
              "POST",
              `http://localhost:5000/submit_code?code=${code} `,
              true
            );
            xhttp.send();
          });
        }
      }
}

export default Templates;