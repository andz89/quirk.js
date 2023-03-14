class Code {
    copy_code(){

        document.querySelector('.admin-users-page .show-code-form-btn').addEventListener('click', ()=>{
          let element =  document.querySelector('.admin-users-page .code-form-container')
            if(element.classList.contains('hide')){
               element.classList.add('show')
               element.classList.remove('hide')

            }else{
               element.classList.add('hide')
               element.classList.remove('show')

            }
          
        })
        document.querySelector('.close-code-form').addEventListener('click', ()=>{
            let element =  document.querySelector('.admin-users-page .code-form-container')
            element.classList.add('hide')
            element.classList.remove('show')
        })
        document.querySelector('.admin-users-page table tbody').addEventListener('click', (e)=>{
 
           if(e.target.classList.contains('copy-code')){
            let input =  document.createElement('input')
            e.target.parentElement.parentElement.appendChild(input)
            let text = e.target.parentElement.parentElement.querySelector('span').innerText
            input.value = text
          
           input.select()
           input.setSelectionRange(0, 99999); // For mobile devices
  
           // Copy the text inside the text field
           navigator.clipboard.writeText(input.value);
           input.remove()
           }

        
         

  
        })
    }
   create_code(){
    if (document.querySelector(".create-code")) {
        document.querySelector('.create-code').addEventListener('click',  ()=>{
            let element =  document.querySelector('.admin-users-page .code-form-container')
       let duration =    element.querySelector('#duration').value
       let limit =    element.querySelector('#limit').value

       let note =    element.querySelector('textarea').value
       if(!duration ||!note){
        return false
       }else{
        var xhttp = new XMLHttpRequest();
  
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
           let code = xhttp.responseText
           let element =  document.querySelector('.admin-users-page .code-form-container')
           element.classList.add('hide')
           element.classList.remove('show')
      
           let parent = document.querySelector('.admin-users-page table tbody')
           let tr = document.createElement('tr')
           tr.innerHTML = `
           <tr>
           <td>
           <span>${code}</span>
             
                   <div>
                       <div class="btn btn-sm btn-success copy-code">Copy</div>

                   </div>
           </td>
           <td>
             

           </td>
           <td>
           
           </td>
           <td>
               
           </td>

           <td>
         
           </td>
           <td>
                
           </td>
           <td>
           ${duration}

       </td>
           <td>
             

           </td>
           <td>
             

           </td>
           <td>
             
           ${limit}
           </td>
           <td>
             
           ${note}
           </td>
           <td class="action">

           <div class="btn btn-sm btn-primary text text-white view">View</div>
           <input type="hidden" id="code" value="<%= data.code %>">
           <div class="btn btn-sm btn-danger text text-white delete-code">Remove</div>


       </td>
       </tr>
           `
            parent.appendChild(tr)
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/create-code?duration=${duration}&&note=${note}&&limit=${limit}`,
          true
        );
        xhttp.send();
       }
         
         })

 

        
      
      }
   
      let element =  document.querySelector('.admin-users-page table tbody')
       element.addEventListener('click',  (e)=>{
         if(e.target.classList.contains('delete-code')){
         let code  =  e.target.parentElement.querySelector('#code').value
         var xhttp = new XMLHttpRequest();
  
         xhttp.onreadystatechange = () => {
           if (xhttp.readyState == 4 && xhttp.status == 200) {
            let code = xhttp.responseText
             
       
             e.target.parentElement.parentElement.remove()
            
           }
         };
         xhttp.open(
           "POST",
           `http://localhost:5000/delete-code?code=${code} `,
           true
         );
         xhttp.send();

         }
    
   
 

           
         })

 

        
      
     
        
  }
}

export default Code;