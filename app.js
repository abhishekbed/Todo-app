const addTaskBtn = document.getElementById("addTask");
const butText = addTaskBtn.innerHTML;
const taskNameTextField = document.getElementById("taskName");
const recordsDisplay = document.getElementById("records");

let userTask = [];

let edit_id = null;

let objstr = localStorage.getItem('users');  // data get in string from local storage

if (objstr != null) {
    // convert string to object
    userTask = JSON.parse(objstr);

}

DisplayInfo();

addTaskBtn.onclick = () => {
    const task = taskNameTextField.value;
    if (edit_id != null) {
        // edit
        userTask.splice(edit_id, 1, { 'task': task });
        edit_id = null;
    }
    else {
        //insert
        userTask.push({ 'task': task });
    }


    SaveInfo(userTask);

    // text fiels blank after value added
    taskNameTextField.value = '';

    addTaskBtn.innerText = butText;
};

//local storage
function SaveInfo(userTask) {

    // convert object to string
    let str = JSON.stringify(userTask);
    localStorage.setItem('users', str)
    DisplayInfo();
}

function DisplayInfo() {
    let statement = '';
    userTask.forEach((user, i) => {
        statement += `<tr>
        <td class="w-50">${user.task}</td>
        <td>
            <button class="btn btn-outline-info" onclick="EditInfo(${i})">Edit</button>
            <button class="btn btn-outline-info"  onclick="Delteinfo(${i})">Delete</button>
        </td>
    </tr>`;
    });
    recordsDisplay.innerHTML = statement;

}

function EditInfo(id) {
    edit_id = id;
    taskNameTextField.value = userTask[id].task;
    addTaskBtn.innerText = 'Save Change';
}

function Delteinfo(id) {
    userTask.splice(id, 1);
    SaveInfo(userTask);
}