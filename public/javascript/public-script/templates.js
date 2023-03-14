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
        if (document.querySelector(".create-copy-btn")) {
         
          document.querySelector(".create-copy-btn").addEventListener("click", () => {
 
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
               }
               else  if(response === 'limit-reach'){
                let message_container = document.querySelector('.subscribe-message-container')
                document.querySelector('.expire-message').style.display = 'none'
                
                 let div;
               
                 div = `
       
                 <h3>  Your reach the limit</h3><br>
               
                 Please delete some of your created template!
             
                 `
                 message_container.querySelector('.reach-limit-message-container').innerHTML = div
                 message_container.style.display = 'flex'
            
     
    
               }
               else{
                
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
      let parent =  document.querySelector(".subscribe-message-container")
        if (parent) {
           
          document.querySelector(".subscribe-message-container .sumbit-code-btn").addEventListener("click", () => {
  
        let code =  document.querySelector('.subscribe-message-container .code').value
 

            var xhttp = new XMLHttpRequest();
    
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
               let response = xhttp.responseText
           
           
               if(response == 'true'){
                  window.location.href = 'http://localhost:5000/templates'
               }
               
               else{
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

          //close form
          parent.querySelector(".close").addEventListener("click", ()=>{
 
          parent.style.display = 'none'
          }
          
          )
        }
      }

      //purchased templates page script
      puchased_template(){
        if(document.querySelector(".purchased-templates"))
        document.querySelector(".purchased-templates  ").addEventListener("click", (e)=>{
          console.log('ss');
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
        console.log(parent);
  let purchased_id =  parent.querySelector('.purchased_id').value
      let template_id =  parent.querySelector('.template_id').value

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
         
            let data = JSON.parse(xhttp.responseText);
           
            e.target.parentElement.parentElement.remove()
            console.log(data);
          
  
          }else{
            console.log('error')
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
}

export default Templates;