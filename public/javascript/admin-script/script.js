
import Canvas_background from "./canvas_background.js";
import Check from "./check.js";
import Loader from "./loader.js";
import Crud_templates from "./Crud-templates.js";
 
 
 
 


let crud_templates = new Crud_templates();
crud_templates.show_templates_form();
crud_templates.convert_file_to_json();
crud_templates.edit_template()
let check_password = new Check();
check_password.check_password();


 
let loader = new Loader();
loader.loading();
loader.loading_generate()

let bg = new Canvas_background()
bg.canvas_background()

bg.modal_background_details()


var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let expire_date = tomorrow.toLocaleString()