import { run_script } from "./canvas/_index";

// let FontFaceObserver = require('fontfaceobserver');

import "../sass/canvas-css/main-canvas.scss";

const data = {};

// let purchased_id

console.log(MODE);

const ajax_request = () => {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        let response_data = JSON.parse(xhttp.responseText);
        data.template_json = response_data.template_json;
        // purchased_id = response_data.purchased_id;
        data.template_name = response_data.template_name;
        data.user_role = response_data.user_role;
        data.template_id = response_data.template_id;

        data.table = response_data.table;
        data.list = response_data.list;
        data.category = response_data.category;

        resolve();
      }
    };
    xhttp.open("GET", `http://localhost:5000/development-query`, true);
    xhttp.send();
  });
};

//here

ajax_request().then(() => {
  run_script(data);
});
