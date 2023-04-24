
class Global{
  static  alert(){
   
 
        document.querySelector('.alert-danger').style.display = 'flex';
   
        
       setTimeout(()=>{
        document.querySelector('.alert-danger').style.display = 'none'

        },5000)
    }
}
export default Global;