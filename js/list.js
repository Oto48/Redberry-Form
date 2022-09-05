let list = document.getElementById("list");
console.log(list)

fetch('https://pcfy.redberryinternship.ge/api/laptops?token=68be5170a5016b05c1583e9820a7dde1')
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