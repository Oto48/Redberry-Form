let list = document.getElementById("list");
let token = "3281de4ebe5baa3ad2be0d33eeb8a770";

fetch(`https://pcfy.redberryinternship.ge/api/laptops?token=${token}`)
  .then((response) => response.json())
  .then((response) => {
    console.log(response)
    response.data.forEach(item => {
      list.innerHTML += `
      <div class="laptop">
        <img src="https://pcfy.redberryinternship.ge/${item.laptop.image}" alt="">
        <div class="info">
          <div class="text">
              <p>${item.user.name} ${item.user.surname}</p>
              <p>${item.laptop.name}</p>
          </div>
          <a href="laptop.html?id=${item.laptop.id}">მეტის ნახვა</a>
        </div>
      </div>`
    });
  })
  .catch((error) => console.log(error));