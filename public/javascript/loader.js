class Loader {
  loading() {
    let button =
      document.querySelector("#login-button") ||
      document.querySelector("#register-button");

    if (button) {
      button.addEventListener("click", () => {
        document.querySelector(".lds-spinner-container").style.visibility =
          " visible";
      });
    }
  }
 
  loading_generate() {
 

 
     if(document.querySelector(".lds-spinner-container-generate")){
      document.querySelector(".lds-spinner-container-generate").style.visibility =
      " visible";
     }
      
     
  
  }
}

export default Loader;
