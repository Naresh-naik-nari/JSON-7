// // let form=document.querySelector("form")
// // let input=document.getElementById("name")
// // form.addEventListener("submit",function(event){
// //     if(input.value==''){
// //         event.preventDefault();
// //     }
// //     else{
// //         let arr=JSON.parse(localStorage.getItem("name")) || [];
// //         arr.push(input.value)
// //         localStorage.getItem("name",JSON.stringify(arr))
// //         displayData(products)
// //     }

// // })

// // function displayData(){
// //     container.innerHTML="";
// //     let container=document.createElement("div")
// //     let data=JSON.parse(localStorage.getItem("name"))
// //     if(data==""){
// //         container.innerHTML="no data avaiable"
// //     }
// //     else{

// //     }


// // }

// // window.addEventListener("DOMContentLoaded",function(){
// //     displayData()
// // })
// // let container = document.querySelector(".container")
// // let btnContainer = document.getElementsByClassName("btnContainer")
// // let loader = document.getElementById("loader")

// // let url = "http://localhost:3000/Shopping"
// // let options = {
// //     method: "POST",
// //     headers: {
// //         "Content-Type": "application/json"
// //     }
// // };


// // let container = document.getElementById("container")
// // let url = "http://localhost:3000/products"
// // let btncontainer = document.getElementById("btncontainer")
// // let category = document.getElementById("category ")
// // let form=document.querySelector("form")
// // let option=document.getElementsByTagName("option")

// // async function getData() {
// //     try {
// //         let responce = await fetch(url)
// //         // console.log(responce)
// //         if (!responce.ok) {
// //             throw new Error("htpps Error.......")
// //         }
// //         let result = await responce.json();
// //         localStorage.setItem("products", JSON.stringify(result))
// //         let products = JSON.parse(localStorage.getItem("products"))
// //         displayData(products)
// //     } catch (err) {
// //         console.error(err)
// //     }
// // }
// // async function displayData(products) {
// //     container.innerHTML = ``;
// //     if (products == null) {
// //         container.innerHTML = `<h1>No Data Available`
// //     } else {
// //         products.forEach(ele => {
// //             let item = document.createElement("div")
// //             item.className = "item"
// //             item.innerHTML = `
// //             <img src='${ele.image}' class='image'>
// //             <p><b>Title :</b>${ele.title}</p>
// //             <p style=color:red><b>price :</b>${ele.price}</p>
// //             <p><b>description:</b>${ele.description}</p>
// //             <p style=color:green><b>Category:</b>${ele.category}</p>
// //             <button onclick=deleteData('${ele.id}') class='button1'>Delete</button>
// //             `;
// //             container.appendChild(item)
// //         })
// //         displayButton()
// //     }
// // }
// // function displayButton() {
// //     btncontainer.innerHTML = ``;
// //     let products = JSON.parse(localStorage.getItem("products"))
// //     let categoryArr = products.map(ele => ele.category);
// //     Array.from(new Set(categoryArr)).forEach(ele => {
// //         let option = document.getElementsByTagName("option")
// //         option.innerHTML = ele;
// //         option.addEventListener("click", function () {
// //             filterData(ele,products)
// //         })
// //     })
// //     btncontainer.appendChild(option)
// // }

// // function filterData(ele,products) {
// //     // let products = JSON.parse(localStorage.getItem("products"))  
// //     let categoryArr = products.filter(obj => obj.category == ele)
// //     displayData(categoryArr)
// // }


// // async function deleteData(id) {
// //     try {
// //         let options = {
// //             "method": "GET"
// //         }
// //         let responce = await fetch(`${url}/${id}`, options)
// //         if (responce.ok) {
// //             getData();
// //             alert("Data Deleted.....")
// //         }
// //     } catch (err) {
// //         console.error(err)
// //     }
// // }

// // // window.addEventListener("DOMContentLoaded", function () {
// // //     getData()
// // // })

// // getData()



let container = document.getElementById("container");
let url = "https://wave-vivacious-yarn.glitch.me/products";
let categoryDropdown = document.getElementById("categoryDropdown");
let loader = document.getElementById("loader");

// Function to show loader
function showLoader() {
    loader.style.display = "block";
}

// Function to hide loader
function hideLoader() {
    loader.style.display = "none";
}

// Function to fetch data
async function getData() {
    showLoader();

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error...");
        }
        let result = await response.json();
        localStorage.setItem("products", JSON.stringify(result));
        displayData(result);
        updateCategoryDropdown(result); 
    } catch (err) {
        console.error(err);
    } finally {
        hideLoader();
    }
}

// Function to display data
function displayData(products) {
    container.innerHTML = "";
    
    if (!products || products.length === 0) {
        container.innerHTML = "<h1>No Data Available</h1>";
        return;
    }

    products.forEach(ele => {
        let item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
            <img src='${ele.image}' class='image'>
            <p><b>Title:</b> ${ele.title}</p>
            <p style="color:red"><b>Price:</b> $${ele.price}</p>
            <p><b>Description:</b> ${ele.description}</p>
            <p style="color:green"><b>Category:</b> ${ele.category}</p>
            <button onclick="deleteData('${ele.id}')" class='button1'>Delete</button>
        `;
        container.appendChild(item);
    });
}

// Function to update dropdown with categories
function updateCategoryDropdown(products) {
    categoryDropdown.innerHTML = ""; 

    let categories = ["All", "Men's Clothing", "Women's Clothing", "Electronics", "Jewelery"];

    categories.forEach(cat => {
        let btn = document.createElement("button");
        btn.innerText = cat;
        btn.onclick = function () {
            if (cat === "All") {
                displayData(products);
            } else {
                let filteredData = products.filter(obj => obj.category.toLowerCase() === cat.toLowerCase());
                displayData(filteredData);
            }
        };
        categoryDropdown.appendChild(btn);
    });
}

// Function to delete data
async function deleteData(id) {
    showLoader();

    try {
        let response = await fetch(`${url}/${id}`, { method: "GET" });

        if (!response.ok) {
            throw new Error("Failed to delete the item.");
        }

        alert("Data Deleted...");
        getData(); 
    } catch (err) {
        console.error(err);
        alert("Error deleting data. Please try again.");
    } finally {
        hideLoader();
    }
}

// Load data on page load
window.addEventListener("DOMContentLoaded", getData);














