let formTodo = document.getElementById("form-todo");


formTodo.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let toDo = sessionStorage.getItem("toDo")
    let name = document.getElementById('name');
    let description = document.getElementById('description');
    let startDate = document.getElementById('startDate');
    let endDate = document.getElementById('endDate');
    if(toDo){
        toDo = JSON.parse(toDo);
        let formUpdate = {
            id: toDo.id,
            name: name.value,
            description: description.value,
            startDate: startDate.value,
            endDate: endDate.value
        }
    
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formUpdate),
        };
    
        const url = "http://localhost:8080/todo"
        loading(true)
        const response = await fetch(url, options).then(res => res.json())
        loading(false)
        window.location.href = "http://localhost:5500/index.html";

    }
    else{
        let formCreate = {
            name: name.value,
            description: description.value,
            startDate: startDate.value,
            endDate: endDate.value
        }
    
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formCreate),
        };
    
        const url = "http://localhost:8080/todo"
        loading(true)
        const response = await fetch(url, options).then(res => res.json())
        loading(false)
        window.location.href = "http://localhost:5500/index.html";
    }
   
    
 });

 function validarTodo(){
    let button = document.getElementById("button");
    let toDo = sessionStorage.getItem("toDo")
    if(toDo){
        button.innerText = "Edit";
        let name = document.getElementById('name');
        let description = document.getElementById('description');
        let startDate = document.getElementById('startDate');
        let endDate = document.getElementById('endDate');
        toDo = JSON.parse(toDo);

        name.value = toDo.name;
        description.value = toDo.description;
        startDate.value = toDo.startDate
        endDate.value = toDo.endDate
    }
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

function closePage(){
    window.location.href = "http://localhost:5500/index.html";
}