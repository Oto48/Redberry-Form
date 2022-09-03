form = document.querySelector('form');
div = document.getElementsByClassName('form')
button = document.getElementsByTagName('button');
curPage = 0;

let name = document.getElementById("name");
name.value = getSavedValue("name");
let surname = document.getElementById("surname");
surname.value = getSavedValue("surname");
let team = document.getElementById("team");
team.value = getSavedValue("team");
let position = document.getElementById("position");
position.value = getSavedValue("position");
let email = document.getElementById("email");
email.value = getSavedValue("email");
let phone = document.getElementById("phone");
phone.value = getSavedValue("phone");



let image = document.getElementById("image");



// image.addEventListener("change", e => {
//     const file = image.files[0];
//     const reader = new FileReader();

//     reader.addEventListener("load", () => {
//         localStorage.setItem("image", reader.result);
//     })

//     reader.readAsDataURL(file);
// })

function saveValue(e){
    const id = e.id;  // get the sender's id to save it . 
    const val = e.value; // get the value. 
    localStorage.setItem(id, val);
    console.log(localStorage.getItem(id));
}

function getSavedValue(v){
    if (!localStorage.getItem(v)) {
        return "";// You can change this to your defualt value. 
    }
    return localStorage.getItem(v);
}


form.onsubmit = ()=>{return false;}


button[1].onclick = ()=>{
    validate();
}

button[0].onclick = ()=>{
    if (curPage > 0) {
        curPage--;
    }
    if (curPage < 1) {
        button[0].style.display = 'none';
    }
    if (curPage<div.length-1) {button[1].textContent = 'Next';}
    displayPage(curPage);
}

displayPage(curPage);
function displayPage(page){
    for(let i of div){
        i.classList.remove('active');
    }
    div[page].classList.add('active');
}


function validate(){

    if(curPage === 0) {
        let reg = /^[a-zA-Z ]+$/;
        let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        let resultName = reg.test(name.value);
        let resultEmail = emailReg.test(email.value);
        if (resultName && resultEmail){
            curPage++;
            button[0].style.display = "block";
            if (curPage>div.length-2) {button[1].textContent = 'Sign Up';}
            if (curPage >= div.length) {
                form.onsubmit = ()=>{return true;}
            }
            displayPage(curPage);
        }
        checkValue(name, resultName);
        checkValue(email, resultEmail);
    }

    if(curPage === 1) {
        button[0].style.display = "block";
        button[1].textContent = 'Sign Up';
        button[1].addEventListener("click", function(){
            // alert('ok');
        });
        displayPage(curPage);
    }
}


function checkValue(input, regex){
    !regex ? input.classList.add("error-text") : name.classList.remove("error-text");
}

















// fetch("https://randomuser.me/api/").then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error))

// fetch('https://pcfy.redberryinternship.ge/api/laptops?token=68be5170a5016b05c1583e9820a7dde1')
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));


// let data = {
//     name: "გელა",
//     surname: "გელაშვილი",
//     team_id: 1,
//     position_id: 1,
//     phone_number: "+995555555555",
//     email: "gela.gelashvili@redberry.ge",
//     token:  "68be5170a5016b05c1583e9820a7dde1",
//     laptop_name: "HP",
//     laptop_image: getSavedValue("image"),
//     laptop_brand_id: 1,
//     laptop_cpu: "Intel Core i3",
//     laptop_cpu_cores: 64,
//     laptop_cpu_threads: 128,
//     laptop_ram: 34,
//     laptop_hard_drive_type: "HDD",
//     laptop_state: "new",
//     laptop_purchase_date: "10-10-2003",
//     laptop_price: 1600

// }

// console.log(data);
// console.log(JSON.stringify(data))


// fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
//     method: 'POST',
//     headers: {
//       Accept: 'application.json',
//       'Content-Type': 'multipart/form-data'
//     },
//     body: JSON.stringify(data)
// })
// .then(response => {
//     if(response.status == 200) {
//         console.log("works!");
//     } 
//     else throw new Error();
// })
// .catch(err => {
//     console.log(err)
// })