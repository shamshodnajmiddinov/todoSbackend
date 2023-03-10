
let baseURL = "http://localhost:3000"
let allUser = []
let oldSchool = []
let newSchool = []

let form = document.forms.login
let table = document.querySelector('table')

let ageShow = document.querySelector('.ageShow')

let btn = document.querySelector('.show')
let trs = document.querySelector('tr')
let tbody = document.querySelector('tbody')

let container = document.querySelector('.container')
let young = document.querySelector('.young')
let oldes = document.querySelector('.oldes')
let all = document.querySelector('.all')

let nameINP = document.querySelector("#name")
let ageINP = document.querySelector("#age")



let modal = document.querySelector('.modal')
let modalContent = document.querySelector('.modal_content')
let change = document.querySelector(".change")
let ChangeName = document.querySelector("#ChangeName")
let ChangeAge = document.querySelector("#ChangeAge")
let ID;

function getData() {
    fetch(baseURL + "/todos")
        .then((res) => res.json())
        .then((res) => reload(res));
}
getData();

function postData(data) {
    fetch(baseURL + "/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                getData()
            }
        })
        .catch((err) => console.log(err));
}

form.onsubmit = (event) => {
    event.preventDefault()

    let todo = {
        id: new Date(),
        name: nameINP.value,
        year: 2023 - ageINP.value
    }

    let {
        id,
        name,
        year
    } = todo
    if (id && name && year) {
        postData(todo);
    }
}


function reload(arr) {
    tbody.innerHTML = ""
    for (let i of arr) {
        const tr = document.createElement('tr')
        const tdnum = document.createElement('td')
        const tdName = document.createElement('td')
        const tdyear = document.createElement('td')
        const del = document.createElement('td')
        const add = document.createElement('td')

        const delImg = document.createElement('img')
        const addImg = document.createElement('img')

        delImg.src = "img/delete.svg"
        addImg.src = "img/edit.svg"

        delImg.classList.add('imeges')
        addImg.classList.add('imeges')


        tdnum.innerText = 1
        tdName.innerText = i.name
        tdyear.innerText = i.year
        del.append(delImg)
        add.append(addImg)

        tr.append(tdnum, tdName, tdyear, del, add)
        tbody.append(tr)


        del.onclick = () => {
            fetch(baseURL + "/todos/" + i.id, {
                method: "DELETE"
            }).then((res) => (tr.style.display = "none"))
        };

        add.onclick = () => {
            ID = i.id
            openModal()
        }
    }
}

function openModal() {
    modal.classList.add('actives')
    modalContent.classList.add('active')
}

function CloseModal() {
    modal.classList.remove('actives')
    modalContent.classList.remove('active')
}


change.onclick = () => {
    console.log(ID);
    fetch(baseURL + "/todos/" + ID, {
        method: "PATCH",
        body: JSON.stringify({
            name: ChangeName.value
        }),
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            getData()
        } else {
            alert("ERROS AMIGOS")
        }
    })
    CloseModal()
}

