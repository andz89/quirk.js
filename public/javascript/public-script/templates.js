import Global from './global.js'
class Templates{


    template_event(){

      // my templates page
      let my_templates = document.querySelector('.purchased-templates-container')
      if(my_templates){
      my_templates.addEventListener('click', (e)=>{
      //show expire message modal
      if(e.target.classList.contains('expire-message')){
      let message_container = document.querySelector('.input-message-container')
      message_container.style.display = 'flex'
      message_container.querySelector('.expire').style.display = 'flex';
      }
      //close expire message modal
      if(my_templates.querySelector('.close-input-message-container')){
        if (e.target.matches('.close-input-message-container, .close-btn')) {
          let message_container = document.querySelector('.input-message-container')
          message_container.style.display = 'none'
          message_container.querySelector('.expire').style.display = 'none';
        }    
        }
      })
      }
  //templates page
  let templates = document.querySelector('.templates')
        if(templates){
            document.querySelector('.templates').addEventListener('click', function(e){
              
           
             //show modal   
        if(e.target.classList.contains('show-template-details')){
       
          let parent = e.target.parentElement  
          parent.querySelector('.modal-activation').style.display = 'flex';
 
          if(parent.querySelector('.modal-activation .modal-title').innerText == ''){
            let title =  parent.querySelector('h4').innerText
            let description = parent.querySelector('p').innerText
            let img =  parent.querySelector('.modal_image').value
            let id =  parent.querySelector('#display-template-id').value
            parent.querySelector('.modal-activation .modal-title').innerText = title;
            parent.querySelector('.modal-activation .modal-description').innerText = description.trim();
            parent.querySelector('.modal-activation .modal-image').src = 'images/canvas_image/'+img;
            parent.querySelector('.modal-activation #template-id').value = id;
            parent.querySelector('.modal-activation #template-name').value = title;

          }
          parent.querySelector('.modal-activation .close').addEventListener('click', function(){
            parent.querySelector('.modal-activation').style.display = 'none';     
            })
          }
          //close modal
          if(templates.querySelector('.close-input-message-container')){
            if (e.target.matches('.close-input-message-container, .close-btn')) {
              let message_container = document.querySelector('.input-message-container')
              message_container.style.display = 'none'
              message_container.querySelector('.expire').style.display = 'none';
            }    
            }

       


            })
    
         
        }
    
    }   
   create_copy() {
 
        if (document.querySelector(".create-copy-btn")) {
         
          document.querySelector(".templates").addEventListener("click", (e)=>{
            if(e.target.classList.contains('create-copy-btn')){
 
      
              let template_id =  e.target.parentElement.parentElement.querySelector('.modal-activation #template-id').value
          
          
                 
                  let title =   e.target.parentElement.parentElement.querySelector('.modal-activation #template-name').value
          
                  var xhttp = new XMLHttpRequest();
          
                  xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                     let response = xhttp.responseText
                     console.log(response);
                     if(response === 'true'){//success creating copy of template
                  
                        window.location.href = 'http://localhost:5000/my-templates'
                     }
                     else if(response === 'limit-reach'){
         

                      let message_container = document.querySelector('.input-message-container')
                      message_container.style.display = 'flex'
                      message_container.querySelector('.limit-reach').style.display = 'flex';
          
                     }
                     else if(response == 'expired'){
             
                      
                      let message_container = document.querySelector('.input-message-container')
                      message_container.style.display = 'flex'
                      message_container.querySelector('.expire').style.display = 'flex';
                     
                      
                     }
              
                    
                     else{
                      window.location.href = '/login-page'
                    }
                  
          
                    }
                   
                  };
                  xhttp.open(
                    "POST",
                    `http://localhost:5000/activateCertificate?template_name=${title}&template_id=${template_id} `,
                    true
                  );
                  xhttp.send();
                };
          })
          
        }
        
      }
      create_invitation() {
 
        // if (document.querySelector(".create-invitation-btn")) {
         
        //   document.querySelector(".templates").addEventListener("click", (e)=>{
        //     // if(e.target.classList.contains('create-copy-btn')){
 
      
        //     //   let template_id =  e.target.parentElement.parentElement.querySelector('.modal-activation #template-id').value
          
          
                 
        //     //       let title =   e.target.parentElement.parentElement.querySelector('.modal-activation #template-name').value
          
        //     //       var xhttp = new XMLHttpRequest();
          
        //     //       xhttp.onreadystatechange = () => {
        //     //         if (xhttp.readyState == 4 && xhttp.status == 200) {
        //     //          let response = xhttp.responseText
        //     //          console.log(response);
        //     //          if(response === 'true'){
                  
        //     //             window.location.href = 'http://localhost:5000/my-templates'
        //     //          }
        //     //          else if(response === 'limit-reach'){
         

        //     //           let message_container = document.querySelector('.subscribe-message-container')
        //     //           message_container.querySelector('.expire-message').style.display = 'none'
        //     //           message_container.querySelector('.puchase-href-btn').href = '/my-templates'
        //     //           message_container.querySelector('.puchase-href-btn').children[0].innerText = 'Go to my templates'

        //     //            let div;
                     
        //     //            div = `
             
        //     //            <h3>  Your reach the limit</h3> 
                     
        //     //            Please delete some of your created template!
                   
        //     //            `
        //     //            message_container.querySelector('.reach-limit-message-container').innerHTML = div
        //     //            message_container.style.display = 'flex'
                  
           
          
        //     //          }
        //     //          else if(response == 'expired'){
             
                      
        //     //           let message_container = document.querySelector('.subscribe-message-container')
        //     //           message_container.style.display = 'flex'
                     
                      
        //     //          }
              
                    
        //     //          else{
        //     //           window.location.href = '/'
        //     //         }
                  
          
        //     //         }
                   
        //     //       };
        //     //       xhttp.open(
        //     //         "POST",
        //     //         `http://localhost:5000/activateInvitation?template_name=${title}&template_id=${template_id} `,
        //     //         true
        //     //       );
        //     //       xhttp.send();
        //     //     };
        //   })
          
        // }
        
      }
      sumbmit_code() {
      let parent =  document.querySelector(".input-message-container")
        if (parent) {
           
          parent.querySelector(".sumbit-code-btn").addEventListener("click", () => {
  
        let code =  document.querySelector('.input-message-container .code').value
 

            var xhttp = new XMLHttpRequest();
    
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
               let response = xhttp.responseText
 
            
               if(response == 'true'){
          

                  window.location.href = 'http://localhost:5000/templates'
               }
               
               else{
 

                let message = document.querySelector('.input-message-container .message') 
                message.innerText = response
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

      //purchased templates page script
      puchased_template(){
        if(document.querySelector(".purchased-templates"))
        document.querySelector(".purchased-templates  ").addEventListener("click", (e)=>{
           
          let container = e.target.parentElement.querySelector('.container');
          let btn_element =  e.target.parentElement.querySelector('.delete-template');
       if(e.target.classList.contains("gear-option")) {
   
        if(btn_element.classList.contains("hide")){
          container.classList.add('show')
          container.classList.remove('hide')
          btn_element.classList.add('show')
          btn_element.classList.remove('hide')
        }else{
          btn_element.classList.add('hide')
          btn_element.classList.remove('show')
          container.classList.add('hide')
          container.classList.remove('show')
        }
      
        
    
       }
       if(e.target.classList.contains('container')){
        btn_element.classList.add('hide')
        btn_element.classList.remove('show')
        container.classList.add('hide')
        container.classList.remove('show')
       }
       if(e.target.classList.contains('delete-template')){
        let parent = e.target.parentElement.parentElement
     
  let purchased_id =  parent.querySelector('.purchased_id').value
      let template_id =  parent.querySelector('.template_id').value

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
 
 
   
      Global.alert()
 
      e.target.parentElement.parentElement.remove()
            
          
  
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/delete_template?purchased_id=${purchased_id}&template_id=${template_id}`,
          true
        );
        xhttp.send();

    
       }
        
        });
     
    

    }
    //alert close element
     
}

export default Templates;