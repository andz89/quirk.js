class Check {
  //check password in input field
  check_password() {
    let checkPasswordLogin_Input = document.querySelector(
      "#check-password-login-input"
    );
    let checkPasswordRegister_Input = document.querySelector(
      "#check-password-register-input"
    );

    if (checkPasswordLogin_Input != undefined) {
      checkPasswordLogin_Input.addEventListener("input", (e) => {
        checkPassword("#login-password");
      });
    }
    if (checkPasswordRegister_Input != undefined) {
      checkPasswordRegister_Input.addEventListener("input", (e) => {
        checkPassword("#register-password");
      });
    }

    function checkPassword(id) {
      let x = document.querySelector(id);

      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
  }
}
export default Check;
