
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
closeIcon = popupBox.querySelector(".popup-header span i")

addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
})