form = document.querySelector('form');
div = document.getElementsByClassName('form')
button = document.getElementsByTagName('button');
curPage = 0;

let name = document.getElementById("name");
let surname = document.getElementById("surname");
let team = document.getElementById("team");
let position = document.getElementById("position");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let image = document.getElementById("image");

name.value = getSavedValue("name");
surname.value = getSavedValue("surname");
team.value = getSavedValue("team");
position.value = getSavedValue("position");
email.value = getSavedValue("email");
phone.value = getSavedValue("phone");


// add team options
fetch('https://pcfy.redberryinternship.ge/api/teams')
  .then((response) => response.json())
  .then((response) => {
    response.data.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.id;
        opt.innerHTML = item.name;
        team.appendChild(opt);
    });
    team.value = getSavedValue("team");
  })
  .catch((error) => console.log(error));

// add position
fetch('https://pcfy.redberryinternship.ge/api/positions')
  .then((response) => response.json())
  .then((response) => {
    let storageItem = JSON.parse(getSavedValue("position"))
    response.data.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.team_id;
        opt.innerHTML = item.name;
        if(storageItem.text == opt.innerHTML){
            opt.setAttribute('selected', true);
        }
        position.appendChild(opt);
    });
  })
  .catch((error) => console.log(error));



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

function savePositionValue(e){
    const id = e.id;  // get the sender's text to save it . 
    const val = e.value; // get the value. 
    const text = e.options[e.selectedIndex].text;
    localStorage.setItem(id, JSON.stringify({value: val, text: text}));
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
        let regex = /^([აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]+){2,}$/;
        let emailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(redberry)\.ge$/;
        let phoneRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;
        
        let resultName = regex.test(name.value);
        let resultSurname = regex.test(surname.value);
        let resultEmail = emailRegex.test(email.value);
        let resultPhone = phoneRegex.test(phone.value);

        if (resultName && resultSurname && resultEmail && resultPhone){
            curPage++;
            button[0].style.display = "block";
            if (curPage>div.length-2) {button[1].textContent = 'Sign Up';}
            if (curPage >= div.length) {
                form.onsubmit = ()=>{return true;}
            }
            displayPage(curPage);
        }
        checkValue(name, resultName);
        checkValue(surname, resultSurname);
        checkValue(email, resultEmail);
        checkValue(phone, resultPhone);
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
    !regex ? input.classList.add("error-text") : input.classList.remove("error-text");
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