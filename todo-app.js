(function() {

    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Please add the name of the new plan';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Add plan';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function (){

            if(input.value !== '') {
                button.removeAttribute('disabled');
            }else{
                button.setAttribute('disabled');
            }
    });


        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, done) {
        
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
                
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Done';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Remove';

        if (done)  item.classList.add('list-group-item-success');

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    } 

    function saveTodoItem(name) {
        let arr = [];

        for (let item of document.querySelectorAll('.list-group-item')) {
            arr.push({
                name: item.firstChild.textContent,
                done: item.classList.contains('list-group-item-success')
            })
        }
        localStorage.setItem(name, JSON.stringify(arr)); 
    }

    function getTodoItem(name) {
        return localStorage.getItem(name);
    } 


    function createTodoApp(container, title = 'List of the plans', currentTodoList = [], listName) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        let localList = getTodoItem(listName);
        let listArray = currentTodoList;
        

        if (localList !== null && localList !== ''){
            listArray = JSON.parse(localList);
        }

        if (listArray.length > 0) {
            for (const item of listArray){
                let todoItem = createTodoItem(item.name, item.done);
                todoItem.doneButton.addEventListener('click', function(){
                    todoItem.item.classList.toggle('list-group-item-success');
                    saveTodoItem(listName);
                });
    
                todoItem.deleteButton.addEventListener('click', function(e){
                    if (confirm('Are you sure?')) {
                        todoItem.item.remove();
                        saveTodoItem(listName);
                    }
                });

                todoList.append(todoItem.item);
            }
        }

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
                saveTodoItem(listName);
            });

            todoItem.deleteButton.addEventListener('click', function(e){
                if (confirm('Are you sure?')) {
                    todoItem.item.remove();
                    saveTodoItem(listName);
                }
            });

            todoList.append(todoItem.item);

            listArray.push(
                {name: todoItemForm.input.value, done: false}
            );
            saveTodoItem(listName);
            todoItemForm.input.value = '';

        });        

    }
   
    window.createTodoApp = createTodoApp;
    
})();