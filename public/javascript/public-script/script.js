import Update from "./update.js";

import Loader from "./loader.js";

import Templates from "./templates.js";
import Check from "./check.js";

let check = new Check();
check.check_password();
let templates = new Templates();

//certificate
templates.template_event();
templates.sumbmit_certificate_code();

//invitation
templates.invitation();

//user templates
templates.my_templates();

let update = new Update();
update.update_account();
update.modal_update_account();
let loader = new Loader();
loader.loading();
loader.loading_generate();

window.addEventListener("click", (e) => {
  //close alert success
  if (e.target.classList.contains("alert-close")) {
    e.target.parentElement.style.display = "none";
  }
});
