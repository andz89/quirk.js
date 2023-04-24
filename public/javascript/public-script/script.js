 
 
import Update from "./update.js";
 
import Loader from "./loader.js";
 
import Templates from "./templates.js";
 
 
let templates = new Templates();
templates.template_event()
templates.puchased_template()
templates.create_copy()
templates.create_invitation()
templates.sumbmit_code()
let update = new Update();
update.update_account();
update.modal_update_account()
let loader = new Loader();
loader.loading();
loader.loading_generate()


window.addEventListener('click', (e) =>{
         //close alert success 
         if(e.target.classList.contains('alert-close')){
           e.target.parentElement.style.display = 'none'
         
          }

})