class Update {
  update_account() {
    if (document.querySelector("#modal-btn")) {
      //clean up
      document.querySelector("#modal-btn").addEventListener("click", () => {
        document.querySelector("#user_name_error").innerHTML = "";
        document.querySelector("#user_email_error").innerHTML = "";
        let db_user_name = document.querySelector("#db_user_name");
        let db_user_email = document.querySelector("#db_user_email");
        document.querySelector("#edit-user-name").value =
          db_user_name.innerText;
        document.querySelector("#edit-user-email").value =
          db_user_email.innerText;
      });
      document.querySelector("#update-btn").addEventListener("click", () => {
        let user_name = document.querySelector("#edit-user-name").value;
        let user_email = document.querySelector("#edit-user-email").value;
        let db_user_name = document.querySelector("#db_user_name");
        let db_user_email = document.querySelector("#db_user_email");
        let data = {};
        data.user_name = user_name;
        data.user_email = user_email;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            // console.log(xhttp.responseText);
            let data = JSON.parse(xhttp.responseText);
            console.log(data);

            db_user_name.innerHTML = data.user_name
              ? data.user_name
              : db_user_name.innerHTML;
            db_user_email.innerHTML = data.user_email
              ? data.user_email
              : db_user_email.innerHTML;

            //error message
            let user_name_error = document.querySelector("#user_name_error");

            user_name_error.innerHTML = data.username ? data.username : "";

            let user_email_error = document.querySelector("#user_email_error");
            user_email_error.innerHTML = data.email ? data.email : "";

            // success-message
            if (
              user_name_error.innerHTML === "" &&
              user_email_error.innerHTML === ""
            ) {
              document.querySelector("#success-message").style.display =
                "block";
            }
            setTimeout(() => {
              document.querySelector("#success-message").style.display = "none";
            }, 3000);
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:5000/update_account?user_name=${data.user_name}&user_email=${data.user_email}`,
          true
        );
        xhttp.send();
      });
    }
  }
}
export default Update;
