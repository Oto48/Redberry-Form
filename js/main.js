form = document.querySelector('form');
div = document.getElementsByClassName('form');
button = document.getElementsByTagName('button');
curPage = curPage = getSavedValue("curPage") ? +getSavedValue("curPage") : 0;
let first = document.getElementById("first");
let second = document.getElementById("second");

displayPage(curPage);
form.onsubmit = ()=>{return false;}

if (curPage === 0){
    second.style.borderColor = "transparent";
    first.style.borderColor = "#000000";
}

if(curPage === 1) {
    first.style.borderColor = "transparent";
    second.style.borderColor = "#000000";
    button[0].style.visibility = "visible";
    button[1].textContent = 'დამახსოვრება'; 
}
if(curPage === 1) {
    button[1].textContent = 'შემდეგი';
}

let name = document.getElementById("name");
let surname = document.getElementById("surname");
let team = document.getElementById("team");
let position = document.getElementById("position");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let image = document.getElementById("image");
let laptop_name = document.getElementById("laptop_name");
let laptop_brand = document.getElementById("laptop_brand");
let laptop_cpu = document.getElementById("laptop_cpu");
let laptop_cpu_cores = document.getElementById("laptop_cpu_cores");
let laptop_cpu_threads = document.getElementById("laptop_cpu_threads");
let laptop_ram= document.getElementById("laptop_ram");

let sdd = document.getElementById("ssd");
let hdd = document.getElementById("hdd");
let purchase_date = document.getElementById("purchase_date");
let laptop_price = document.getElementById("laptop_price");
let new_laptop = document.getElementById("new");
let used_laptop = document.getElementById("used");

name.value = getSavedValue("name");
surname.value = getSavedValue("surname");
team.value = getSavedValue("team");
position.value = getSavedValue("position");
email.value = getSavedValue("email");
phone.value = getSavedValue("phone");
laptop_name.value = getSavedValue("laptop_name");
laptop_brand.value = getSavedValue("laptop_brand");
laptop_cpu.value = getSavedValue("laptop_cpu");
laptop_cpu_cores.value = getSavedValue("laptop_cpu_cores");
laptop_cpu_threads.value = getSavedValue("laptop_cpu_threads");
laptop_ram.value = getSavedValue("laptop_ram");

if (ssd.value == localStorage.getItem("hard_drive_type")) {
    ssd.checked = true;
}
if (hdd.value == localStorage.getItem("hard_drive_type")) {
    hdd.checked = true;
}

if (new_laptop.value == localStorage.getItem("laptop_state")) {
    new_laptop.checked = true;
}
if (used_laptop.value == localStorage.getItem("laptop_state")) {
    used_laptop.checked = true;
}

purchase_date.value = getSavedValue("purchase_date");
laptop_price.value = getSavedValue("laptop_price");



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
    let storageItem;
    if(getSavedValue("position")){
        storageItem = JSON.parse(getSavedValue("position"));
    }
    response.data.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.team_id;
        opt.innerHTML = item.name;
        if(storageItem && storageItem.text == opt.innerHTML){
            opt.setAttribute('selected', true);
        }
        position.appendChild(opt);
    });
  })
  .catch((error) => console.log(error));

fetch('https://pcfy.redberryinternship.ge/api/brands')
  .then((response) => response.json())
  .then((response) => {
    response.data.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.id;
        opt.innerHTML = item.name;
        laptop_brand.appendChild(opt);
    });
    laptop_brand.value = getSavedValue("laptop_brand");
  })
  .catch((error) => console.log(error));

fetch('https://pcfy.redberryinternship.ge/api/cpus')
  .then((response) => response.json())
  .then((response) => {
    response.data.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.name;
        opt.innerHTML = item.name;
        laptop_cpu.appendChild(opt);
    });
    laptop_cpu.value = getSavedValue("laptop_cpu");
  })
  .catch((error) => console.log(error));


const formData = new FormData();

function addImage(e) {
    localStorage.setItem("image", e.files[0]);
    formData.append('laptop_image', e.files[0])
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      let imageField = document.querySelector(".image-field");
      imageField.style.backgroundImage = `url(${uploaded_image})`;
      imageField.style.backgroundSize = `cover`;
      imageField.style.backgroundPosition = `center`;
      imageField.style.backgroundRepeat = `no-repeat`;
      imageField.style.border = 'none';
      imageField.textContent = '';
    });
    reader.readAsDataURL(e.files[0]);
    document.querySelector(".bottom-image-input").style.display = "flex";
    document.getElementById('image-name').innerHTML = e.files[0].name;
    document.getElementById('image-size').innerHTML = e.files[0].size;
}

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

function saveRadioValue(e){
    const val = e.value; // get the value. 
    const name = e.name
    localStorage.setItem(name, val);
}

function getSavedValue(v){
    if (!localStorage.getItem(v)) {
        return "";// You can change this to your defualt value. 
    }
    return localStorage.getItem(v);
}

function displayPage(page){
    for(let i of div){
        i.classList.remove('active');
    }
    div[page].classList.add('active');
}

function goBack() {
    curPage -= 1;
    localStorage.setItem("curPage", curPage)
    displayPage(curPage);
    button[0].style.visibility = 'hidden';
    button[1].textContent = 'შემდეგი';
    second.style.borderColor = "transparent";
    first.style.borderColor = "#000000";
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

        if (resultName && resultSurname && team.value && position.value && resultEmail && resultPhone){
            curPage++;
            localStorage.setItem("curPage", curPage);
            button[0].style.visibility = "visible";
            if (curPage>div.length-2) {button[1].textContent = 'დამახსოვრება';}
            first.style.borderColor = "transparent";
            second.style.borderColor = "#000000";
            displayPage(curPage);
        } else {
            checkValue(name, resultName);
            checkValue(surname, resultSurname);
            checkValue(team, team.value);
            checkValue(position, position.value);
            checkValue(email, resultEmail);
            checkValue(phone, resultPhone);
        }
    } else if (curPage === 1) {
        let laptopNameRegex = /^[a-zA-Z0-9!@#$%^&*()_+= -]{1,}$/;
        let numberRegex = /^[0-9]{1,}$/;
        let laptopNameResult = laptopNameRegex.test(laptop_name.value);
        let cpuCoresResult = numberRegex.test(laptop_cpu_cores.value);
        let cpuThreadsResult = numberRegex.test(laptop_cpu_threads.value);
        let laptopRamResult= numberRegex.test(laptop_ram.value);
        let laptopPriceResult = numberRegex.test(laptop_price.value);
        let hard_drive_type = getSavedValue("hard_drive_type");
        let laptop_state = getSavedValue("laptop_state");

            if (image.files[0] && laptopNameResult && laptop_brand.value && 
                laptop_cpu.value && cpuCoresResult && cpuThreadsResult && laptopRamResult &&
                hard_drive_type && laptopPriceResult && laptop_state){
                formData.append('name', getSavedValue("name"));
                formData.append('surname', getSavedValue("surname"));
                formData.append('team_id', getSavedValue("team"));
                const position = JSON.parse(getSavedValue("position"));
                formData.append('position_id', position.value);
                formData.append('phone_number', getSavedValue("phone"));
                formData.append('email', getSavedValue("email"));
                formData.append('token', "3281de4ebe5baa3ad2be0d33eeb8a770");
                formData.append('laptop_name', getSavedValue("laptop_name"));
                formData.append('laptop_brand_id', getSavedValue("laptop_brand"));
                formData.append('laptop_cpu', getSavedValue("laptop_cpu"));
                formData.append('laptop_cpu_cores', getSavedValue("laptop_cpu_cores"));
                formData.append('laptop_cpu_threads', getSavedValue("laptop_cpu_threads"));
                formData.append('laptop_ram', getSavedValue("laptop_ram"));
                formData.append('laptop_hard_drive_type', getSavedValue("hard_drive_type"));
                formData.append('laptop_state', getSavedValue("laptop_state"));
                formData.append('laptop_purchase_date', getSavedValue("purchase_date"));
                formData.append('laptop_price', getSavedValue("laptop_price"));

                fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
                    method: "POST",
                    body: formData
                })
                .then(function (response) {
                    console.log(response);
                    localStorage.clear();
                    second.style.borderColor = "transparent";
                    window.location.replace("submit-page.html");
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                checkValue(laptop_name, laptopNameResult);
                checkValue(laptop_cpu, laptop_cpu.value);
                checkValue(laptop_brand, laptop_brand.value);
                checkValue(laptop_cpu_cores, cpuCoresResult);
                checkValue(laptop_cpu_threads, cpuThreadsResult);
                checkValue(laptop_ram, laptopRamResult);
                checkValue(laptop_price, laptopPriceResult);
                checkValue(image, image.files[0]);
            }
    }
}


function checkValue(input, validation){
    if (input !== image) {
        !validation ? input.classList.add("error-text") : input.classList.remove("error-text");
    }else {
        const imageField = document.querySelector(".image-field");
        imageField.style.borderColor = "#E52F2F";  
        imageField.style.backgroundColor = "#FFF1F1";
        document.getElementById("validation_image").style.visibility = "visible";
        document.getElementById("file_text").style.color = "#E52F2F";
    }
}