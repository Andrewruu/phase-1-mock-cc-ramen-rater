
const ramenMenu = document.getElementById("ramen-menu");
let idHolder = null

fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramenArray) => {

    ramenArray.forEach((ramen) => {
      appendRamenToMenu(ramen)
    });
  });

function appendRamenToMenu(ramenObj) {
  const image = document.createElement("img")
  image.src = ramenObj.image
  image.id = ramenObj.id

  image.addEventListener("click", () => {
    const imageRamen = document.querySelector('.detail-image')
    const ramenName = document.querySelector(".name")
    const restaurantName = document.querySelector(".restaurant")
    const ramenRating = document.querySelector("#rating-display")
    const comment = document.querySelector("#comment-display")
    
    ramenName.textContent = ramenObj.name
    imageRamen.src = ramenObj.image
    restaurantName.textContent = ramenObj.restaurant
    ramenRating.textContent = ramenObj.rating
    comment.textContent = ramenObj.comment

    idHolder = ramenObj.id
  })

  ramenMenu.append(image)
}

const formEdit = document.querySelector("#edit-ramen");
formEdit.addEventListener("submit", (event) => {
  event.preventDefault()

  const ramenRating = document.querySelector("#rating-display")
  const comment = document.querySelector("#comment-display")
  
  const newRating = event.target.editRating.value
  const newComment = event.target.editComment.value

  const newRamen = {
    id: idHolder,
    rating: newRating,
    comment: newComment,
  }
  ramenRating.textContent = newRating
  comment.textContent = newComment
  editRamen(newRamen)
})

function editRamen(ramenObj){
    fetch(`http://localhost:3000/ramens/${ramenObj.id}`,{
      method: 'PATCH',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(ramenObj)
    })
    .then(res => res.json())


}

const delBtn = document.createElement('button')
delBtn.textContent = 'Delete'
document.querySelector('#ramen-detail').appendChild(delBtn)
delBtn.addEventListener('click', () =>{
  deleteRamen(idHolder)
})



const form = document.querySelector("#new-ramen");

function deleteRamen(id){
  fetch(`http://localhost:3000/ramens/${id}`,{
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(res => res.json())
  
  document.getElementById(`${id}`).remove()
}


form.addEventListener("submit", (event) => {
  event.preventDefault()

  const newRamenName = event.target.name.value

  const newRestaurant = event.target.restaurant.value
  const newImage = event.target.image.value
  const newRating = event.target.rating.value
  const newComment = event.target["new-comment"].value

  const newRamen = {
    name: newRamenName,
    restaurant: newRestaurant,
    image: newImage,
    rating: newRating,
    comment: newComment,
  }

  createRamen(newRamen)
  appendRamenToMenu(newRamen)
})


function createRamen(ramenObj){
    fetch('http://localhost:3000/ramens',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:JSON.stringify(ramenObj)
      }) 
}
