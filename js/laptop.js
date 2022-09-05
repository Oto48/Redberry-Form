const url = new URL(window.location.href);
let search_params = url.searchParams; 
const id = search_params.get('id');


fetch(`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=68be5170a5016b05c1583e9820a7dde1`)
  .then((response) => response.json())
  .then((response) => {
    const data = response.data;
    console.log(data);
    const name = data.user.name;
    const team = data.user.team_id;
    const position = data.user.position_id;
    const email = data.user.email;
    const phone_number = data.user.phone_number;
    const image = data.laptop.image;
    const laptopName = data.laptop.name;
    const laptopBrand = data.laptop.brand_id;
    const ram = data.laptop.ram;
    const hardDriveType = data.laptop.hard_drive_type;
    const cpu = data.laptop.cpu.name;
    const cpuCore = data.laptop.cpu.cores;
    const cpuThreads = data.laptop.cpu.threads;
    const state = data.laptop.state;
    const price = data.laptop.price;
    const purchaseDate = data.laptop.purchase_date;

    document.getElementById("image").src = `https://pcfy.redberryinternship.ge/${image}`;
    document.getElementById("name").innerText = name;
    document.getElementById("team").innerText = team;
    document.getElementById("position").innerText = position;
    document.getElementById("email").innerText = email;
    document.getElementById("phone").innerText = phone_number;
    document.getElementById("laptop_name").innerText = laptopName;
    document.getElementById("laptop_brand").innerText = laptopBrand;
    document.getElementById("ram").innerText = ram;
    document.getElementById("hard_drive").innerText = hardDriveType;
    document.getElementById("cpu").innerText = cpu;
    document.getElementById("cpu_core").innerText = cpuCore;
    document.getElementById("cpu_threads").innerText = cpuThreads;
    document.getElementById("state").innerText = state;
    document.getElementById("price").innerText = price;
    document.getElementById("purchase_date").innerText = purchaseDate;
  })
  .catch((error) => console.log(error));