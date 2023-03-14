
import Canvas_background from "./canvas_background.js";
import Check from "./check.js";
import Loader from "./loader.js";
import Crud_templates from "./Crud-templates.js";
import Code from "./code.js";

 
 
 
 
let code = new Code();
code.create_code()
code.copy_code()


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

 
