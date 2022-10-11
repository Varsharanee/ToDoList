add = document.getElementById("add");
add.addEventListener("click", validation);
// add.addEventListener("click", updateList);

function validation() {
    til = document.getElementById("title").value;
    discri = document.getElementById("discription").value;
    element1 = document.getElementById("error1");
    element2 = document.getElementById("error2");
    if (til == "" && discri == "") {
        element1.innerHTML = "Please enter title";
        element2.innerHTML = "Please enter discription";

    } else if (til == "") {
        element1.innerHTML = "Please enter title";
    } else {
        element1.innerHTML = "";
        element2.innerHTML = "";
        updateList();
    }
}

function updateList() {
    til = document.getElementById("title").value;
    discri = document.getElementById("discription").value;
    if (localStorage.getItem("itemJson") == null) {
        toDoListArray = [];
        toDoListArray.push([til, discri]);
        localStorage.setItem('itemJson', JSON.stringify(toDoListArray))
    } else {
        itemJsonArrayStr = localStorage.getItem("itemJson");
        toDoListArray = JSON.parse(itemJsonArrayStr);
        toDoListArray.push([til, discri]);
        localStorage.setItem('itemJson', JSON.stringify(toDoListArray))
    }
    updateTable();
}

function clearList() {
    var ask = confirm("Are you sure");
    if (ask) {
        localStorage.clear();
        updateTable();
    }
}

function deleteTable(item) {
    itemJsonArrayStr = localStorage.getItem("itemJson");
    toDoListArray = JSON.parse(itemJsonArrayStr);
    toDoListArray.splice(item - 1, 1);
    localStorage.setItem('itemJson', JSON.stringify(toDoListArray))

    updateTable();
}

function updateTable() {
    if (localStorage.getItem("itemJson") == null) {
        toDoListArray = [];
        localStorage.setItem('itemJson', JSON.stringify(toDoListArray))
    } else {
        itemJsonArrayStr = localStorage.getItem("itemJson");
        toDoListArray = JSON.parse(itemJsonArrayStr);
        localStorage.setItem('itemJson', JSON.stringify(toDoListArray))
    }
    //Update the table
    let tablebody = document.getElementById("tablebody");
    let str = "";

    toDoListArray.forEach((element, index) => {
        str = str + `
    <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-info" onclick="deleteTable(${index+1})" >Delete</button></td>
    </tr>`
    });
    tablebody.innerHTML = str;
}