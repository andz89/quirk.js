import Check from "./check.js";
import Modal from "./modal.js";

let check_password = new Check();
let modal = new Modal();

modal.modal();
//check password in input field
check_password.check_password();
