function openCard(element){
    let details = element.children[1]
    if(details.classList.contains("close-card")){
        details.classList.remove("close-card")
        details.classList.add("open-card")
    }else{
        details.classList.add("close-card")
        details.classList.remove("open-card")
    }
}

function addList(){
    let divList = document.getElementById("list-todo")
    let listTodo = [{
        name: "test1",
        description: "test1test1test1test1test1test1test1test1test1",
        startdate: "29/06/2023",
        enddate: "30/06/2023"
    },
    {
        name: "test2",
        description: "test2test2test2test2test2test2test2",
        startdate: "01/06/2023",
        enddate: "23/06/2023"
    },
    {
        name: "test3",
        description: "test3test3test3test3",
        startdate: "65/06/2023",
        enddate: "12/06/2023"
    },
    {
        name: "test4",
        description: "test4test4test4test4test4",
        startdate: "65/06/2023",
        enddate: "12/06/2023"
    }]

    for(var todo of listTodo){
        divList.appendChild(createCard(todo.name, todo.description, todo.startdate, todo.enddate))
    }
}


function createCard(name, description, startdate, enddate){
    let divCard = document.createElement("div")
    divCard.classList.add("card", "mb-3")

    divCard.appendChild(createCardBody(name, description, startdate, enddate))
    return divCard
}

function createCardBody(name, description, startdate, enddate){
    let divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body", "d-flex", "flex-column", "gap-3")
    divCardBody.setAttribute("onclick", "openCard(this)")

    let divContent = document.createElement("div")
    divContent.classList.add("d-flex", "justify-content-between", "align-content-center")
    divCardBody.appendChild(divContent)

    let spanTitle = document.createElement("span")
    spanTitle.classList.add("fs-6", "fw-lighter")
    spanTitle.innerText = name
    divContent.appendChild(spanTitle)

    let divIcons = document.createElement("div")
    divIcons.classList.add("d-flex", "gap-3")
    divContent.appendChild(divIcons)

    let iconEdit = document.createElement("i")
    iconEdit.classList.add("bi", "bi-pencil")
    divIcons.appendChild(iconEdit)

    let iconDelete = document.createElement("i")
    iconDelete.classList.add("bi", "bi-trash")
    divIcons.appendChild(iconDelete)

    let divDetails = document.createElement("div")
    divDetails.classList.add("close-card")

    let hrLinha = document.createElement("hr")
    divDetails.appendChild(hrLinha)

    let divDescription = document.createElement("div")
    divDescription.style.textAlign = "justify"
    divDetails.appendChild(divDescription)

    let spanDescription = document.createElement("span")
    spanDescription.innerText = description
    divDescription.appendChild(spanDescription)

    let hrLinha2 = document.createElement("hr")
    divDetails.appendChild(hrLinha2)

    let divDates = document.createElement("div")
    divDates.classList.add("d-flex", "flex-row", "justify-content-around")
    divDetails.appendChild(divDates)

    let spanStart = document.createElement("span")
    spanStart.innerText = startdate
    divDates.appendChild(spanStart)

    let iconArrow = document.createElement("i")
    iconArrow.classList.add("bi", "bi-arrow-right")
    divDates.appendChild(iconArrow)

    let spanEnd = document.createElement("span")
    spanEnd.innerText = enddate
    divDates.appendChild(spanEnd)

    divCardBody.appendChild(divDetails)

    return divCardBody
}