let addMessage = document.querySelector('.message')
let button = document.querySelector('.add')
let todo = document.querySelector('.todo')

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessage()
}
button.addEventListener('click', function(){
    if(addMessage.value === ''){
        return;
    }
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }

    todoList.push(newTodo)
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList))
})
todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id')
    let forLabel = todo.querySelector('[for=' + idInput + ']')
    let valueLabel = forLabel.innerHTML;
    
    todoList.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })

})

todo.addEventListener('contextmenu', function(e){
    event.preventDefault()
    todoList.forEach((item) =>{
        if(item.todo === event.target.innerHTML){
            item.important = !item.important
            displayMessage()
            localStorage.setItem('todo', JSON.stringify(todoList))
        }    
    })
})

function displayMessage(){
    todo.innerHTML = ''
    todoList.forEach(function(item, index){
        let displayMessage = `
            <li class="d-flex">
                <div>
                    <input type="checkbox" id="item_${index}" 
                    ${item.checked ? 'checked' : ''}>
                    <label for="item_${index}" id="label_${index}"
                    class=${item.important ? 'important' : ''}>${item.todo}</label>
                </div>
                <div>
                    <button class="btn-important" id="btn_imp_${index}">!</button>
                    <button class="btn-delete" id="btn_${index}">x</button>
                </div>
            </li>
        `
        todo.innerHTML += displayMessage
    })
    todoList.forEach( (item, i) => {
        document.querySelector(`#btn_${i}`).addEventListener('click', () => {
            todoList.splice(i, 1)
            displayMessage()
            localStorage.setItem('todo', JSON.stringify(todoList))
        })
        document.querySelector(`#btn_imp_${i}`).addEventListener('click', () => {
            item.important = !item.important
            displayMessage()
            localStorage.setItem('todo', JSON.stringify(todoList))
        })
        
    })
}



