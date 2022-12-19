class Update {
  update_account() {
    document.querySelector("#update-btn").addEventListener("click", () => {
      let user_name = document.querySelector("#edit-user-name").value;
      let user_email = document.querySelector("#edit-user-email").value;

      let data = {};
      data.user_name = user_name;
      data.user_email = user_email;
      var xhttp = new XMLHttpRequest();
      xhttp.open(
        "POST",
        `http://localhost:5000/update_account?user_name=${data.user_name}&user_email=${data.user_email}`,
        true
      );

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("data-ajax").innerHTML = this.responseText;
          //   console.log(this.responseText);
        }
      };
      xhttp.send();
    });
  }
}
export default Update;
