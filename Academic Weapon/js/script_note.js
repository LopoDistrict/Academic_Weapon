
function notes(){
    hide('newItem');
    show('notesType');
}

function darker(what){
    document.getElementById(what).style.filter = " brightness(50%)";
    document.body.style.backgroundColor = "#070707";
}
function clearer(what){
    document.getElementById(what).style.filter = " brightness(100%)";
    document.body.style.backgroundColor = "#121212";
}

var randomColor = Math.floor(Math.random()*16777215).toString(16);