const button = document.querySelector(".f__a")
const input_T = document.querySelector(".f__t")
const input_C = document.querySelector(".f__c")
const input_D = document.querySelector(".f__d")

const cont1 = document.querySelector(".block1")
const cont2 = document.querySelector(".block2")

const path = "http://localhost:3000/api/store"

let editID = null

const getProducts = async (hD) => {
    let result
    if (hD) result = await fetch(String(path + "?hasDiscount=" + String(hD)))
    else result = await fetch(String(path))
    result = (await result.json()).data
    console.log(result)
    return result
}

const display = async (array, container) => {
    const html = array.reduce((acc, el) => acc + `
        <div class="product" id="${el["_id"]}">
            <span class="text">${el.title}</span>
            <span style="text-decoration: line-through;">${el.hasDiscount ? el.cost : ""}</span>
            <span>${el.hasDiscount ? el.cost * 0.75 : el.cost}</span>
            <span class="delete_product">X</span>
        </div>
    `, "")
    
    container.innerHTML = html

    container.querySelectorAll(".delete_product").forEach(el => el.addEventListener("click", async (e) => {
        await fetch(String(path + "/" + String(e.target.parentElement.id)), {
            method: 'DELETE'
        })
        get()
    }))

    container.querySelectorAll(".text").forEach(el => el.addEventListener("click", async (e) => {
        editID = el.parentElement.id
        console.log(editID)
        button.innerText = "Обновить"
    }))
}

const get = async () => {
    display(await getProducts(true), cont1) // 1-й get
    display(await getProducts(false), cont2) // 2-й get
}

button.addEventListener("click", async () => {
    const obj = {
        title: String(input_T.value),
        cost: Number(input_C.value),
        hasDiscount: Boolean(input_D.checked)
    }

    console.log(obj)
    console.log(editID)
    if (!editID) {
        const result = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        get()
    } else {
        const result = await fetch(String(path + "/" + editID), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        get()
        editID = null
        button.innerText = "Добавить"
    }
})

document.addEventListener('DOMContentLoaded', get)