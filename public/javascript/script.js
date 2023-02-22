import Check from "./check.js";
 
import Update from "./update.js";
import Loader from "./loader.js";
import Add_templates from "./add-templates.js";
import Templates from "./templates.js";

let templates = new Templates();
templates.modal_template_details()
templates.sumbit_code()


let add_templates = new Add_templates();
add_templates.show_templates_form();
add_templates.submit_template();

let check_password = new Check();
check_password.check_password();

 

let update = new Update();
update.update_account();
update.modal_update_account()
let loader = new Loader();
loader.loading();
loader.loading_generate()