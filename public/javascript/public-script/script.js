 
 
import Update from "./update.js";
 
import Loader from "./loader.js";
 
import Templates from "./templates.js";
 
 
let templates = new Templates();
templates.modal_template_details()
templates.sumbit_code()

let update = new Update();
update.update_account();
update.modal_update_account()
let loader = new Loader();
loader.loading();
loader.loading_generate()