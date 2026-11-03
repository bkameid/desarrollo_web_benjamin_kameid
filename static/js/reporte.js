
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

// Paso de verificar nombre por ahora

function nombreaveV(name) {
    // Con que sea no vacia me alegro
    if (name.value == '') {
        return false;
    } else {
        return true;
    }
}

function regionV(region) {
    // Es válido si no es vacío
    if (region.value == ""){
        return false;
    } else {
        return true;
    }
}

function comunaV(comuna, region) {
    // Una comuna es valida si es parte de la region dicha

    if (!(comuna.value.toLowerCase() in comunasChile)) {
        return false;
    }

    return true;
}


function fechaV(fecha) {
    // Valido si no es del futuro y existe

    if (fecha.value == "") {
        return false;
    }

    const date = new Date(`${fecha.value}T00:00:00`);
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);
    return date <= hoy;
}

function fotoV(foto) {
    // Si hay archivo tamos bien
    if (foto.value == "") {
        return false;
    }

    return true;
}

const validador = (event) => {
    
    let nombreAve = document.getElementById('nombre-ave');
    let region = document.getElementById('region');
    let comuna = document.getElementById('comuna');
    let fecha = document.getElementById('fecha');
    let foto = document.getElementById('foto');

    let isValid = true;

    isValid = formatError(nombreAve, !nombreaveV(nombreAve)) && isValid;
    isValid = formatError(region, !regionV(region)) && isValid;
    isValid = formatError(comuna, !comunaV(comuna, region)) && isValid;
    isValid = formatError(fecha, !fechaV(fecha)) && isValid;
    isValid = formatError(foto, !fotoV(foto)) && isValid;

    if (isValid) {
        console.log('yay');
        event.target.form.submit();
    }
}