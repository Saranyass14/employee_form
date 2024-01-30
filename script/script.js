function save() {
    let name = document.getElementById('name').value;
    let designation = document.getElementById('designation').value;
    let doj = document.getElementById('doj').value;
    let salary = document.getElementById('salary').value;

    // Form validation 
    clearErrorMessages()
    if (!name) {
        displayError('nameError', 'Please enter your name');
        return;
    }

    if (!designation) {
        displayError('designationError', 'Please select a designation');
        return;
    }

    if (!doj) {
        displayError('dojError', 'Please select a date of joining');
        return;
    }

    if (!salary) {
        displayError('salaryError', 'Please enter the salary');
        return;
    }

    let data = {
        name: name,
        designation: designation,
        doj: doj,
        salary: salary
    }
    // console.log(data, "data")

    // get the data from local storage
    let existingData = JSON.parse(localStorage.getItem('dataValue')) || [];

    existingData.push(data);
    // console.log(existingData, "existingData")

    // set the data to local storage
    localStorage.setItem('dataValue', JSON.stringify(existingData));

    // appending data to the table body
    updateTable(existingData);

    // clear the form datas
    document.getElementById('name').value = '';
    document.getElementById('designation').value = '';
    document.getElementById('doj').value = '';
    document.getElementById('salary').value = '';
}

window.onload = function () {
    let existingData = JSON.parse(localStorage.getItem('dataValue')) || [];
    updateTable(existingData);
};

function updateTable(data) {
    let tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    data.forEach(employee => {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${employee.name}</td><td>${employee.designation}</td><td>${employee.doj}</td><td>${employee.salary}</td>`;
        tableBody.appendChild(newRow);
    });
}

function displayError(id, message) {
    document.getElementById(id).innerText = message;
}

function clearErrorMessages() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('designationError').innerText = '';
    document.getElementById('dojError').innerText = '';
    document.getElementById('salaryError').innerText = '';
}
