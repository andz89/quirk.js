class Update {

  modal_update_account() {
    // Get DOM Elements
    const modal = document.querySelector("#my-modal");
    const modalBtn = document.querySelector("#modal-btn");
    const closeBtn = document.querySelector(".close");

    if (modalBtn) {
      // Events
      modalBtn.addEventListener("click", openModal);
      closeBtn.addEventListener("click", closeModal);
      window.addEventListener("click", outsideClick);

      // Open
      function openModal() {
        modal.style.display = "flex";
      }

      // Close
      function closeModal() {
        modal.style.display = "none";
      }

      // Close If Outside Click
      function outsideClick(e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      }
    }
  }
  update_account() {
    if (document.querySelector("#modal-btn")) {
      //clean up
      document.querySelector("#modal-btn").addEventListener("click", () => {
     
        document.querySelector("#user_email_error").innerHTML = "";
       
        let db_user_email = document.querySelector("#db_user_email");
        let db_user_name = document.querySelector("#db_user_name");

        document.querySelector("#edit-user-name").innerText =
        db_user_name.innerText;
        document.querySelector("#edit-user-email").value =
          db_user_email.innerText;
      });
      document.querySelector("#update-btn").addEventListener("click", () => {
   
               let user_email = document.querySelector("#edit-user-email")
      
        let db_user_email = document.querySelector("#db_user_email");
        console.log(db_user_email.innerHTML);
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            // console.log(xhttp.responseText);
            let data = JSON.parse(xhttp.responseText);
           
              if(data == 'true'){
                db_user_email.innerHTML = user_email.value;
              }else{
                let user_email_error = document.querySelector("#user_email_error");
                user_email_error.innerHTML = data.email ? data.email : "";
    
             
              }
      
             // success-message
             if (user_email_error.innerHTML === "") {
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
          `http://localhost:5000/update_account?user_email=${user_email.value}`,
          true
        );
        xhttp.send();
      });
    }
  }
}
export default Update;
