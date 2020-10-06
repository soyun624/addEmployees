onload=function(){
    const fname = document.querySelector('#fname');
    const lname = document.querySelector('#lname');
    const email = document.querySelector('#email');
    const joinedDate = document.querySelector('#joinedDate');
    const city = document.querySelector('#city');
    const postalCd = document.querySelector('#postalCd');
    const availability= document.querySelector('#my-select');
    const add = document.querySelector('#btn-submit');
    const show = document.querySelector('#btn-show');
    const divTable = document.querySelector('#table');
    const table = document.createElement('table');

    //validation
    const ERROR_MESSAGES = {

        requirdEmail: 'email is requird',
        validEmail: 'email is not valid'

    }

    const emailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateForm = () =>{

        //email
        if(email.value === ''){
            setErrorForm(email, ERROR_MESSAGES.requirdEmail);
        }else if(!emailformat.test(email.value)){
            setErrorForm(email, ERROR_MESSAGES.validEmail);
        }else{
            setSuccessForm(email);
        }
    }

    const setErrorForm = (input, message) =>{
        const formControl = input.parentElement;
        formControl.classList.remove('success');
        formControl.classList.add('error');
        const small = formControl.querySelector('small');
        small.textContent = message;
        small.style.display = 'block';
    }

    const setSuccessForm = (input) =>{
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        formControl.classList.add('success');
    }

    let employees = [];

    $("#my-select").easySelect({
        buttons: false,
        search: false,
        placeholder: 'Choose Availability',
        placeholderColor: '#524781',
        selectColor: '#524781',
        itemTitle: 'Item Selected',
        showEachItem: true,
        width: '80%',
        dropdownMaxHeight: '450px',
    })

    function addEmployee(e){
        e.preventDefault();

        validateForm();

        let newEmployee = {
            id: `${new Date().getTime()}${Math.round(Math.random()*20)}`,
            fname:fname.value,
            lname:lname.value,
            email:email.value,
            joinedDate:joinedDate.value,
            city:city.value,
            postalCd:postalCd.value,
            availability:$('#my-select').val()
        }

        employees.push(newEmployee);
        document.querySelector('form').reset();
        availability.nextElementSibling.innerHTML = 'Choose availability'
        table.innerHTML = '';
    }

    const displayHeader = () =>{
        const headers = ["Id", "First name", "Last name", "Email", "Joined Date",  "City", "Postal code", "Availibility"];
        const thead = document.createElement('thead');
        const row = thead.insertRow();
        headers.forEach((header)=>{
            row.insertCell().textContent = header;
        })
        table.appendChild(thead);
        divTable.appendChild(table);
    }

    const displayBody = ()=>{
        const tbody = document.createElement('tbody');

        employees.forEach((employee) => {
            const row = tbody.insertRow();
            row.setAttribute('id',employee.id);
            row.insertCell().textContent = employee.id;
            row.insertCell().textContent = employee.fname;
            row.insertCell().textContent = employee.lname;
            row.insertCell().textContent = employee.email;
            row.insertCell().textContent = employee.joinedDate;
            row.insertCell().textContent = employee.city;
            row.insertCell().textContent = employee.postalCd;
            row.insertCell().textContent = employee.availability.join(',');
            row.insertCell().innerHTML = '<button class="btn-success">-</button>'
        })

        table.appendChild(tbody);
        divTable.appendChild(table);

    }

    function showEmployee(){
    
        table.innerHTML = '';

        if(employees.length > 0){
            displayHeader();
            displayBody();
        }else{
            const p = document.createElement('p');
            p.classList.add('text-danger');
            p.textContent = 'No Employee to Show';
            divTable.appendChild(p);
        }



    }

    add.addEventListener('click',addEmployee);
    show.addEventListener('click',showEmployee);
    divTable.addEventListener('click', (e) => { 
        const id = e.target.parentNode.parentNode.id;
        const empIndex = employees.findIndex(e => e.id === id);
        employees.splice(empIndex,1);
        table.deleteRow(empIndex+1);
    })
}