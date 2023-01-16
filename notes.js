showNotes();

// if a user adds a note, then add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let dates = localStorage.getItem("dates");
    let notesObj=[];
    let datesObj=[];
    if (notes == null) {
        notesObj = [];
        datesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        datesObj = JSON.parse(dates);
    }
    notesObj.push(addTxt.value);
    let currentdate = new Date();
    let datetime = "" + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();
    datesObj.push(datetime);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("dates", JSON.stringify(datesObj));
    addTxt.value = "";
    showNotes();
    // console.log(notesObj);
});

// to show notes stored in the local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let dates = localStorage.getItem("dates");
    let notesObj=[];
    let datesObj=[];
    if (notes == null) {
        notesObj = [];
        datesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        datesObj = JSON.parse(dates);
    }
    let html = "";
    let d = "";
    notesObj.forEach(function (element, index) {
        d = datesObj[index];
        html += `
        <div class="noteCard card mx-2 my-2" style="width: 18rem;">
            <div class="card-body text-center">
                <h5 class="card-title">Note ${index + 1} </h5>
                <p class="card-text"> ${element} </p>
            </div>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary mx-auto mb-2" style="width: 8rem;">Delete Note</button>
            <div class="card-footer text-muted text-center">
                <p class="mb-0"> ${d} </p>
            </div>
        </div>
        `;
    });
    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else{
        notesEle.innerHTML = `<h5 class="mt-3"> No Saved Notes!</h5>`;
    }
}

// function to delete note from the local storage
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    let dates = localStorage.getItem("dates");
    let notesObj=[];
    let datesObj=[];
    if (notes == null) {
        notesObj = [];
        datesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        datesObj = JSON.parse(dates);
    }
    notesObj.splice(index , 1);
    datesObj.splice(index , 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("dates", JSON.stringify(datesObj));
    showNotes(); 
}

let search = document.getElementById("searchTxt");
search.addEventListener("input" , function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});

/* further features
1. add note specific titles
2. add important notes
3. separate notes by user
4. Sync and host to a web server
*/