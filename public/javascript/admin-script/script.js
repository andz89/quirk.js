
import Canvas_background from "./canvas_background.js";
import Check from "./check.js";
import Loader from "./loader.js";
import Templates from "./templates.js";
import Code from "./code.js";

 
 
 
 
let code = new Code();
code.create_code()
code.copy_code()


let templates = new Templates();
templates.show_templates_form();
templates.convert_file_to_json();
templates.template()
templates.show_options()
templates.publish()
let check_password = new Check();
check_password.check_password();


 
let loader = new Loader();
loader.loading();
loader.loading_generate()

let bg = new Canvas_background()
bg.canvas_background()

bg.modal_background_details()

 