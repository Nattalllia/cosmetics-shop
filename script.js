const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

const items = [{
        title: "Увлажняющее молочко для тела Аюрведа",
        description: "La Sultane De Saba Body Lotion Ayurvedic-Ambre Vanilla Patchouli (200мл)",
        tags: ["HIT"],
        price: 240,
        img: "./img/1.jpg",
        rating: 4.4,
    },
    {
        title: "Соляной скраб для тела",
        description: "La Sultane De Saba Rose Bride's Day Scrub (300мл)",
        tags: ["20%"],
        price: 300,
        img: "./img/2.jpg",
        rating: 2.1,
    },
    {
        title: "Парфюмированная вода Аюрведа",
        description: "La Sultane De Saba Orange Flowers (100м)",
        tags: ["HIT"],
        price: 900,
        img: "./img/3.jpg",
        rating: 5.0,
    },
    {
        title: "Гоммаж для тела Аюрведа",
        description: "La Sultane De Saba Scrub Oriental Ayurvedic (300мл)",
        tags: ["25%"],
        price: 283,
        img: "./img/4.jpg",
        rating: 4.7,
    },
    {
        title: "Крем для рук Аюрведа",
        description: "La Sultane De Saba Body Lotion Ayurvedic-Ambre Vanilla Patchouli (50мл)",
        tags: ["HIT"],
        price: 80,
        img: "./img/5.jpg",
        rating: 4.9,
    },
    {
        title: "Сахарный гоммаж для тела Роза",
        description: "La Sultane de Saba Sugar Scrub Rose (300мл)",
        tags: ["10%"],
        price: 400,
        img: "./img/6.jpg",
        rating: 3.2,
    },
    {
        title: "Набор подарочный Аюрведа",
        description: "La Sultane De Saba Gift Set Ayurvedic Spices (50мл)",
        tags: ["HIT"],
        price: 300,
        img: "./img/7.jpg",
        rating: 4.9,
    },
    {
        title: "Черное мыло для лица и тела",
        description: "La Sultane De Saba Skin (300мл)",
        tags: ["HIT"],
        price: 500,
        img: "./img/8.jpg",
        rating: 3.4,
    },
    {
        title: "Крем для лица с эффектом лифтинга",
        description: "La Sultane De Saba (100мл)",
        tags: ["HIT"],
        price: 1500,
        img: "./img/9.jpg",
        rating: 4.8,
    },
    {
        title: "Набор подарочный",
        description: "La Sultane De Saba Gift Set (50мл)",
        tags: ["20%"],
        price: 800,
        img: "./img/10.jpeg",
        rating: 3.2,
    },
    {
        title: "Набор масел для тела Тайны хаммама",
        description: "La Sultane De Saba Hammam Ritual (50мл)",
        tags: ["40%"],
        price: 200,
        img: "./img/11.jpeg",
        rating: 3.7,
    },
    {
        title: "Маска для лица, волос и тела",
        description: "La Sultane De Saba Rose Cream (300мл)",
        tags: ["HIT"],
        price: 400,
        img: "./img/12.jpg",
        rating: 4.8,
    },
];

function prepareShopItem(shopItem) {

    const { title, description, tags, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}BYN`;

    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }


    const tagsHolder = item.querySelector(".tags");


    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });


    return item;
}

let currentState = [...items];


function renderItems(arr) {

    nothingFound.textContent = "";

    itemsContainer.innerHTML = "";

    arr.forEach((item) => {

        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}
renderItems(currentState);



function sortByAlphabet(a, b) {

    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {

                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {

                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {

                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {

                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});

const searchInput = document.querySelector("#search-input");

const searchButton = document.querySelector("#search-btn");


function applySearch() {

    const searchString = searchInput.value.trim().toLowerCase();


    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);

    sortControl.selectedIndex = 0;
}
searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);