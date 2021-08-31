const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarro = document.getElementById('template-carro').content
const fragment = document.createDocumentFragment()
let carro = {}

document.addEventListener('DOMContentLoaded', () => {
   datos()
   if(localStorage.getItem('carro')){
     carro = JSON.parse(localStorage.getItem('carro'))
     mostrarCarro()
   }
   })
cards.addEventListener('click', e =>{
  addCarro(e)
})

items.addEventListener('click', e =>{
  btnEjecutar(e)
})

const datos = async() => {
  try{
    const res = await fetch('../js/datos.json');
    const data = await res.json()
    console.log(data)
    mostrarCards(data)
  }catch(error){
    console.log(error)
  }
}

const mostrarCards = data => {
  data.forEach(libro =>{
    templateCard.querySelector('h5').textContent = libro.titulo
    templateCard.querySelector('p').textContent = libro.precio
    templateCard.querySelector('img').setAttribute("src", libro.img)
    templateCard.querySelector('.btn-dark').dataset.id = libro.id


    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  cards.appendChild(fragment)
}

const addCarro = e =>{
 // console.log(e.target)
  //console.log(e.target.classList.contains('btn-dark'))
  if(e.target.classList.contains('btn-dark')){
    setCarro(e.target.parentElement)
  }
  e.stopPropagation()
}

const setCarro = objeto => {
  const libro = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    titulo: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
  }
if(carro.hasOwnProperty(libro.id)) {
    libro.cantidad = carro[libro.id].cantidad + 1
}
  carro[libro.id] = {...libro}
  mostrarCarro()
}

const mostrarCarro = () => {
  items.innerHTML= ''
  Object.values(carro).forEach(libro => {
    templateCarro.querySelector('th').textContent = libro.id
    templateCarro.querySelectorAll('td')[0].textContent = libro.titulo
    templateCarro.querySelectorAll('td')[1].textContent = libro.cantidad
    templateCarro.querySelector('.btn-info').dataset.id = libro.id
    templateCarro.querySelector('.btn-danger').dataset.id = libro.id
    templateCarro.querySelector('span').textContent = libro.cantidad * libro.precio


    const clone = templateCarro.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)

  mostrarFooter()

  localStorage.setItem('carro', JSON.stringify(carro))
}

const mostrarFooter = () => {
  footer.innerHTML = ''
  if(Object.keys(carro).length === 0){
    footer.innerHTML = `
    <th scope="row" colspan="5">Carro vacío</th>
    `
    return
  }
  const total = Object.values(carro).reduce((acc, {cantidad}) => acc + cantidad ,0)
  const elPrecio = Object.values(carro).reduce((acc, {cantidad, precio})=> acc + cantidad * precio ,0)
  
  templateFooter.querySelectorAll('td')[0].textContent = total
  templateFooter.querySelector('span').textContent = elPrecio

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carro')
  btnVaciar.addEventListener('click', () => {
    carro = {}
    mostrarCarro()
  })
}

const btnEjecutar = e => {
  if(e.target.classList.contains('btn-info')){
    const libro = carro[e.target.dataset.id]
    libro.cantidad++
    carro[e.target.dataset.id] = {...libro}
    mostrarCarro()
  }
  if(e.target.classList.contains('btn-danger')){
    const libro = carro[e.target.dataset.id]
    libro.cantidad--
    if(libro.cantidad === 0) {
      delete carro[e.target.dataset.id]
    }
    mostrarCarro()
  }
  e.stopPropagation()
}