import Check from "./check.js";
import Modal from "./modal.js";
import Update from "./update.js";

let check_password = new Check();
check_password.check_password();

let modal = new Modal();
modal.modal_update_account();

let update = new Update();
update.update_account();