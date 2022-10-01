
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
closeIcon = popupBox.querySelector(".popup-header span i"),
noteTitle = popupBox.querySelector('.form-title input'),
noteDesc = popupBox.querySelector('.form-desc textarea'),
addBtn = document.getElementById('addBtn'),
menu = document.querySelector('.menu'),
addBoxTitle = document.getElementById('addBoxTitle')

let isUpdate = false, updateId;

let notes = JSON.parse(localStorage.getItem('notes2') || '[]');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function showMenu(any){
    any.parentElement.classList.add('show');
    document.addEventListener('click', e=>{
        if(e.target != any){
            any.parentElement.classList.remove('show');
        }
    })
}

addBox.addEventListener('click',(e)=>{
    popupBox.classList.add('show');
    noteTitle.value = '';
    noteDesc.value = '';
    addBoxTitle.innerText = 'Add a New Note';
    addBtn.innerText = 'Add Note';
    // e.preventDefault();
})

closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
    isUpdate = false;
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
       if(!isUpdate){
        notes.push(noteObj);
       }else if(isUpdate){
        notes[updateId] = noteObj;
       }
       
       localStorage.setItem('notes2',JSON.stringify(notes));
       closeIcon.click();
    }
    showNotes();
})


function showNotes(){
    document.querySelectorAll('.notes').forEach(note=>note.remove());
    notes.forEach((note, index)=>{
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
                <i  onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                <div class="menu">
                    <div onclick="updateNote(${index},'${note.title}','${note.desc}')"><i class="fa-regular fa-pen-to-square"></i>Edit</div>
                    <div onclick="deleteNote(${index})"><i class="fa-regular fa-pen-to-square"></i>Delete</div>
                </div>
            </div>                
        </div>
    </div>
        `;
        addBox.insertAdjacentHTML('afterend',div);
    })
}
showNotes();

function deleteNote(number){
    notes.splice(number,1);
    localStorage.setItem('notes2',JSON.stringify(notes));
    showNotes();
}
function updateNote(number, title, description){
    isUpdate = true;
    addBox.click();
    addBoxTitle.innerText = 'Edit Your Note';
    addBtn.innerText = 'Update';
    noteTitle.value = title;
    noteDesc.value = description;
    updateId = number;    
}