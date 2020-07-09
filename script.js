const $addButton = document.querySelector(".addButton");
const textinput = document.querySelector(".textinput");
const $ul = document.querySelector("ul");
const content = document.querySelector('.contents')

const todoList = {

    todos: [
        {
            todoText: "Todo1",
            completed: false
        },
        {
            todoText: "Todo2",
            completed: true
        },
        {
            todoText: "Todo3",
            completed: false
        }],


    addTodo: function (newTodoText) {
        this.todos.push({
            todoText: newTodoText,
            completed: false
        });
    },

    changeTodo: function (index, newTodoText) {
        this.todos[index].todoText = newTodoText;
    },

    deleteTodo: function (index) {
        this.todos.splice(index, 1);
    },

    completeTodo: function (index) {
        this.todos[index].completed = !this.todos[index].completed;
    },


    displayTodo: function () {
        $ul.innerHTML = "";
        for (let i = 0; i < this.todos.length; i++) {

            let todo = this.todos[i];
            let className = 'completed'
            let checked = 'checked'

            if (todo.completed === false) {
                className = "";
                checked = "";

            }

            $ul.innerHTML += `<li data-index="${i}"><div class="checkboxDiv">
            <input type="checkbox" class="checkbox" data-key="checkbox" ${checked}/></div>
            <div class="contents ${className}" data-key="contents">
            ${todo.todoText}</div>
            <div class="icondiv"><i class="far fa-edit" data-key="icon_edit"></i>
            <i class="far fa-trash-alt" data-key="icon_trash"></i></div>
            </li>`



        }
    }


};



todoList.displayTodo();


let eventList = {

    checkboxClick: function (checkbox) {

        let selectedIndex = checkbox.parentElement.parentElement.dataset.index;
        checkbox.parentElement.nextElementSibling.classList.toggle('completed');
        todoList.completeTodo(selectedIndex);
        //클릭한 체크박스의 옆에 있는 div에 complete 클래스 토글

    },

    contentClick: function (content) {

        let selectedIndex = content.parentElement.dataset.index;
        content.classList.toggle('completed');
        content.previousSibling.firstElementChild.checked = !content.previousSibling.firstElementChild.checked;
        todoList.completeTodo(selectedIndex);
        //클릭한 div 옆에 있는 체크박스 체크 해제
    },

    removeClick: function (icon) {

        let selectedLi = icon.parentElement.parentElement;
        selectedLi.parentElement.removeChild(selectedLi);
        let selectedIndex = icon.parentElement.parentElement.dataset.index;

        todoList.deleteTodo(selectedIndex);
        displayTodo();


    },

    editClick: function (icon) {

        text = icon.parentElement.parentElement.children[1];
        let originalText = text.innerText;
        //icon.previousElementSibling.children[1].innerText //기존 value를 저장


        text.innerHTML = `<input type="text" id="textEdit" data-text=${originalText}>
                      <input type="button" value="submit" class="submitButton" data-key="submitButton">
                      <input type="button" value="cancel" class="cancelButton" data-key="cancelButton">` //li 내용을 입력하는 input 및 버튼 추가 (줄맞춤)




        //cancel버튼은 이제 배열이기 때문에 바로 eventlistener를 걸어준다
        //이벤트 위임이 아니면 추가됐을 때 코드를 붙여줘야한다 



    },

    clickSubmitButton: function (item) {

        let text = item.previousElementSibling.value;
        let dataIndex = item.parentElement.parentElement.dataset.index;

        if (!text) {
            alert('type something')
            return;
        } else {
            todoList.changeTodo(dataIndex, text);
            displayTodo();
        } //기존 li의 내용을, 위의 입력창에서 입력한 텍스트값으로 교체한다


    },

    clickCancelButton: function (item) {
        let text = item.parentNode.firstElementChild.value;
        text.innerHTML = item.previousElementSibling.previousElementSibling.dataset.text  //처음에 저장해놨던 기존 value를 저장해서 반환
        displayTodo();
    }


};

$addButton.addEventListener('click', () => {

    if (!textinput.value) {
        alert('type something');
    } else {
        let text = textinput.value;
        todoList.addTodo(text);
        displayTodo();

        textinput.value = "";

    }
});



//ul에 이벤트 위임방식으로 switch 구문에 넣을 것
// 함수 수정하고 함수를 만들 필요도 없다 


$ul.addEventListener('click', (e) => {
    switch (e.target.dataset.key) {
        case "checkbox":
            eventList.checkboxClick(e.target)
            break;
        case "contents":
            eventList.contentClick(e.target)
            break;
        case "icon_trash":
            eventList.removeClick(e.target);
            break;
        case "icon_edit":
            eventList.editClick(e.target);
            break;
        case "submitButton":
            eventList.clickSubmitButton(e.target);
            break;
        case "cancelButton":
            eventList.clickCancelButton(e.target);
            break;
    }



})
