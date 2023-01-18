showNotes();

// if a user adds a note, then add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    let dates = localStorage.getItem("dates");
    let titlesObj = [];
    let notesObj = [];
    let datesObj = [];
    if (notes == null) {
        titlesObj = [];
        notesObj = [];
        datesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
        notesObj = JSON.parse(notes);
        datesObj = JSON.parse(dates);
    }
    titlesObj.push(addTitle.value);
    notesObj.push(addTxt.value);
    let currentdate = new Date();
    let datetime = "" + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();
    datesObj.push(datetime);
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("dates", JSON.stringify(datesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
    // console.log(notesObj);
});

// to show notes stored in the local storage
function showNotes() {
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    let dates = localStorage.getItem("dates");
    let titlesObj = [];
    let notesObj = [];
    let datesObj = [];
    if (notes == null) {
        titlesObj = [];
        notesObj = [];
        datesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
        notesObj = JSON.parse(notes);
        datesObj = JSON.parse(dates);
    }
    let html = "";
    let d = "";
    let t = "";
    notesObj.forEach(function (element, index) {
        d = datesObj[index];
        t = titlesObj[index];
        html += `
        <div class="noteCard card mx-2 my-2" style="width: 16.05rem;">
            <div class="card-body text-center">
                <h4 class="card-title">${t} </h4>
                <hr>
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
    else {
        notesEle.innerHTML = `<h5 class="mt-3"> No Saved Notes!</h5>`;
    }
}

// function to delete note from the local storage
function deleteNote(index) {
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    let dates = localStorage.getItem("dates");
    let titlesObj = [];
    let notesObj = [];
    let datesObj = [];
    if (notes == null) {
        titlesObj = [];
        notesObj = [];
        datesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
        notesObj = JSON.parse(notes);
        datesObj = JSON.parse(dates);
    }
    titlesObj.splice(index, 1);
    notesObj.splice(index, 1);
    datesObj.splice(index, 1);
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("dates", JSON.stringify(datesObj));
    showNotes();
}

//search bar facility
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function (e) {
    let search = document.getElementById("searchTxt");
    let inputVal1 = search.value.toUpperCase();
    let inputVal2 = search.value.toLowerCase();
    let inputVal = search.value;

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("h4")[0].innerText;
        if (cardTitle.includes(inputVal1) || cardTitle.includes(inputVal2) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
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