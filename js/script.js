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


async function addList(){
    
    const url = "http://localhost:8080/todo"
    let divList = document.getElementById("list-todo")
    loading(true)
    const response = await fetch(url).then(res => res.json())
    loading(false)

    for(var todo of response){
        let startDate = new Date(todo.startDate)
        let dataFormatadaStart = startDate.toISOString().split("T")[0];

        let endDate = new Date(todo.endDate)
        let dataFormatadaEnd = endDate.toISOString().split("T")[0];
        //27/06/2001 27-06-2001 
        divList.appendChild(createCard(todo.id, todo.name, todo.description, dataFormatadaStart, dataFormatadaEnd))
    }
}

function createCard(id, name, description, startdate, enddate){
    let divCard = document.createElement("div")
    divCard.classList.add("card", "mb-3", "bg-danger-subtle")
    divCard.id = id;

    divCard.appendChild(createCardBody(id, name, description, startdate, enddate))
    return divCard
}

function createCardBody(id, name, description, startdate, enddate){
    let divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body", "d-flex", "flex-column")
    divCardBody.setAttribute("onclick", "openCard(this)")
    divCardBody.style.cursor = "pointer"

    let divContent = document.createElement("div")
    divContent.classList.add("d-flex", "justify-content-between", "align-content-center")
    divCardBody.appendChild(divContent)

    let spanTitle = document.createElement("span")
    spanTitle.classList.add("fs-6", "fw-lighter")
    spanTitle.innerText = name
    spanTitle.id = `${id}-name`
    divContent.appendChild(spanTitle)

    let divIcons = document.createElement("div")
    divIcons.classList.add("d-flex", "gap-3")
    divContent.appendChild(divIcons)

    let iconEdit = document.createElement("i")
    iconEdit.classList.add("bi", "bi-pencil")
    iconEdit.style.cursor = "pointer"
    iconEdit.setAttribute("onclick", "editarTodo(this)")
    divIcons.appendChild(iconEdit)

    let iconDelete = document.createElement("i")
    iconDelete.classList.add("bi", "bi-trash")
    iconDelete.style.cursor = "pointer"
    iconDelete.setAttribute("onclick", "deletarTodo(this)")
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
    spanDescription.id = `${id}-description`
    divDescription.appendChild(spanDescription)

    let hrLinha2 = document.createElement("hr")
    divDetails.appendChild(hrLinha2)

    let divDates = document.createElement("div")
    divDates.classList.add("d-flex", "flex-row", "justify-content-around")
    divDetails.appendChild(divDates)

    let spanStart = document.createElement("span")
    spanStart.innerText = startdate
    spanStart.id = `${id}-startDate`
    divDates.appendChild(spanStart)

    let iconArrow = document.createElement("i")
    iconArrow.classList.add("bi", "bi-arrow-right")
    divDates.appendChild(iconArrow)

    let spanEnd = document.createElement("span")
    spanEnd.innerText = enddate
    spanEnd.id = `${id}-endDate`
    divDates.appendChild(spanEnd)

    divCardBody.appendChild(divDetails)

    return divCardBody
}

async function deletarTodo(element){
    const id = element.parentElement.parentElement.parentElement.parentElement.id
    const confirmacao = confirm("deseja excluir realmente?")
    if(confirmacao == true){
        const options = {
            method: 'DELETE',
        };
        const url = `http://localhost:8080/todo/${id}`
        loading(true)
        const response = await fetch(url, options).then(res => res.json())
        loading(false)
        window.location.reload();
    }

}


function editarTodo(element){
    const id = element.parentElement.parentElement.parentElement.parentElement.id
    let name = document.getElementById(`${id}-name`);
    let description = document.getElementById(`${id}-description`);
    let startDate = document.getElementById(`${id}-startDate`);
    let endDate = document.getElementById(`${id}-endDate`);
    let formEdit = {
        id: id,
        name: name.textContent,
        description: description.textContent,
        startDate: startDate.textContent,
        endDate: endDate.textContent
    }
    
    sessionStorage.removeItem("toDo");
    sessionStorage.setItem("toDo", JSON.stringify(formEdit));
    window.location.href = "http://localhost:5500/pages/create.html";
 }
 function loading(hidden){
    const loading = document.getElementById("loading")
    if(hidden){
      loading.classList.add("visible")
      loading.classList.remove("visually-hidden")
    }else{
      loading.classList.remove("visible")
      loading.classList.add("visually-hidden")
    }
  }


function resetarSession(){
    sessionStorage.removeItem("toDo")
}









