let name = document.getElementById("name");
let surname = document.getElementById("surname");
let team = document.getElementById("team");
let position = document.getElementById("position");
let email = document.getElementById("email");
let phone = document.getElementById("phone");


name.value = getSavedValue("name");
surname.value = getSavedValue("surname");
email.value = getSavedValue("email");
phone.value = getSavedValue("phone");


function saveValue(e){
    const id = e.id;  // get the sender's id to save it . 
    const val = e.value; // get the value. 
    localStorage.setItem(id, val);
    console.log(localStorage.getItem(id))
}

function getSavedValue(v){
    if (!localStorage.getItem(v)) {
        return "";// You can change this to your defualt value. 
    }
    return localStorage.getItem(v);
}
