class Templates{

  

    modal_template_details(){
        document.querySelector('.templates').addEventListener('click', function(e){
            if(e.target.classList.contains('show-template-details')){
                document.querySelector('.modal-activation .close').addEventListener('click', function(){
                    document.querySelector('.modal-activation').style.display = 'none';
                    document.querySelector('.modal-activation .modal-title').innerText = '';
                    document.querySelector('.modal-activation .modal-description').innerText ='';
                    document.querySelector('.modal-activation .modal-image').src = '';
                })
                document.querySelector('.modal-activation').style.display = 'flex';
            let parent = e.target.parentElement
          
            let title =  parent.querySelector('h3').innerText
            let description = parent.querySelector('p').innerText
            let img =  parent.querySelector('img').src
            

            document.querySelector('.modal-activation .modal-title').innerText = title;
            document.querySelector('.modal-activation .modal-description').innerText = description.trim();
            document.querySelector('.modal-activation .modal-image').src = img;

            }
        })

    }   
}

export default Templates;