
let form = document.getElementsByClassName('form');

function formatError(input, bool) {
    if (bool) {
        input.style.backgroundColor = '#fee';
        input.style.border = '1px solid';
        input.style.borderColor = 'red'; 
        input.style.borderRadius = '2px';   
        return false;
    } else {
        input.style.backgroundColor = '';
        input.style.border = '';
        input.style.borderColor = ''; 
        input.style.borderRadius = '';   
        return true;
    }
}

const validador = (event) => {

    let valid = true;
    event.preventDefault();

    nombre = document.getElementById("comentario-name");
    text = document.getElementById("comentario-text");

    if (nombre.value.trim().length < 3 || nombre.value.trim().length > 50) {
        valid = false;
        formatError(nombre, true);
    } else {
        formatError(nombre, false);
    }
    
    if (text.value.trim().length < 5 || text.value.trim().length > 300) {
        valid = false;
        formatError(text, true);
    } else {
        formatError(text, false);
    }

    console.log(valid);
    
    if (valid) {
        event.target.form.submit();
    }
}