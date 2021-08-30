document.addEventListener('DOMContentLoaded', e => { datos() });


const datos = async() => {
  try{
    const res = await fetch('../js/datos.json');
    const data = await res.json()
    console.log(data)
  }catch(error){
    console.log(error)
  }
}