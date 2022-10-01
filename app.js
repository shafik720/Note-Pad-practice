
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
closeIcon = popupBox.querySelector(".popup-header span i"),
noteTitle = popupBox.querySelector('.form-title input'),
noteDesc = popupBox.querySelector('.form-desc textarea'),
addBtn = document.getElementById('addBtn')


let notes = JSON.parse(localStorage.getItem('notes2') || '[]');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


addBox.addEventListener('click',(e)=>{
    popupBox.classList.add('show');
    // e.preventDefault();
})

closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
})

addBtn.addEventListener('click',e=>{
    e.preventDefault();
    let noteObj;
    let dateObj = new Date();
    let day = dateObj.getDay();
    let month = months[dateObj.getMonth()];
    let year = dateObj.getFullYear();
    if(noteTitle.value || noteDesc.value){
       noteObj = {title:noteTitle.value, desc:noteDesc.value, date:`${day} ${month} ${year}`};
       notes.push(noteObj);
       localStorage.setItem('notes2',JSON.stringify(notes));
       closeIcon.click();
    }
    showNotes();
})

function showNotes(){
    document.querySelectorAll('.notes').forEach(note=>note.remove());
    notes.forEach(note=>{
        let div = `
        <div class="notes">
        <div class="note-header">
            <span>${note.title}</span>
        </div>
        <div class="note-body">
            <p>${note.desc}</p>
        </div>
        <div class="note-footer">
            <span>${note.date}</span>
            <div class="footer-icon">
                <i id="menuIcon" class="fa-solid fa-ellipsis"></i>
                <div class="menu">
                    <div><i class="fa-regular fa-pen-to-square"></i>Edit</div>
                    <div><i class="fa-regular fa-pen-to-square"></i>Delete</div>
                </div>
            </div>                
        </div>
    </div>
        `;
        addBox.insertAdjacentHTML('afterend',div);
    })
}
showNotes();