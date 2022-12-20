class Update {
  update_account() {
    document.querySelector("#update-btn").addEventListener("click", () => {
      let user_name = document.querySelector("#edit-user-name").value;
      let user_email = document.querySelector("#edit-user-email").value;

      let data = {};
      data.user_name = user_name;
      data.user_email = user_email;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          // console.log(xhttp.responseText);
          let data = JSON.parse(xhttp.responseText);

          document.querySelector("#db_user_name").innerHTML = data.user_name;
          document.querySelector("#db_user_email").innerHTML = data.user_email;
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
export default Update;
