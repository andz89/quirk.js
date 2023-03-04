import Check from "./check.js";
 
import Update from "./update.js";
import Loader from "./loader.js";
import Crud_templates from "./Crud-templates.js";
import Templates from "./templates.js";
import Canvas_background from "./canvas_background.js";

let bg = new Canvas_background()
bg.canvas_background()
let templates = new Templates();
templates.modal_template_details()
templates.sumbit_code()


let crud_templates = new Crud_templates();
crud_templates.show_templates_form();
crud_templates.convert_file_to_json();
crud_templates.edit_template()
let check_password = new Check();
check_password.check_password();

 

let update = new Update();
update.update_account();
update.modal_update_account()
let loader = new Loader();
loader.loading();
loader.loading_generate()