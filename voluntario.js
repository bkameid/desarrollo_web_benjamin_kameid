
let form = document.getElementsByClassName('form');
/**
 * Gives the \<input\> the error style if bool is true
 * @param input the object
 */
function formatError(input, bool) {
    if (bool) {
        input.style.backgroundColor = '#fee';
        input.style.border = '1px solid';
        input.style.borderColor = 'red'; 
        input.style.borderRadius = '2px';   
    } else {
        input.style.backgroundColor = '';
        input.style.border = '';
        input.style.borderColor = ''; 
        input.style.borderRadius = '';   
    }
}

function nameV(name) {
    // Un nombre válido es de 2 palabras de largo 2 o mayor cada
    let nombreCompleto = name.trim().split(' ');
    if (nombreCompleto.length < 2) {
        return false;
    }

    let valid = true;

    nombreCompleto.forEach(wrd => {
        if(wrd.length < 2) {
            valid = false;
        }
    });

    return valid;
}

function mailV(mail) {
    // Un mail es válido si tiene usuario, dominio y un top level domain de largo 2 o mayor

    let valid = true;

    // Tiene que tener exactamente 1 arroba
    if (mail.split('@').length - 1 != 1) {
        return false;
    }

    let user = mail.trim().split('@')[0];
    let domain = mail.trim().split('@')[1];

    domain = domain.split('.');
    let tld = domain.pop();
    
    if (user.length == 0 || tld.length < 2) {
        return false;
    }

    domain.forEach(dmn => {
        if (dmn.length == 0) {
            valid = false;
        }
    });

    return valid;
}

function regionV(region) {
    // Es válido si no es vacío
    if (region.value == ""){
        return false;
    } else {
        return true;
    }
}

function fonoV(fono) {
    // Fono es válido si es de 9 o 10 dígitos, con 9 digitos empezando por 2 o 9
    if(fono.value.length == 9) {
        if (fono.value[0] == 9 || fono.value[0] == 2) {
            return true;
        } else {
            return false;
        }
    } else if (fono.value.length == 10) {
        return true; // Paso de checar cada prefijo
    } else {
        return false;
    }
}

function dobV(dob) {
    // Una fecha de nacimiento es valida si tiene 18+ años
    const fecha = new Date(dob.value);
    const hoy = new Date();
    const 年 = hoy.getFullYear() - fecha.getFullYear();

    console.log(fecha);

    console.log('Input');
    console.log('mes :', fecha.getMonth());
    console.log('dia :', fecha.getDate());
    console.log('Hoy');
    console.log('mes :', hoy.getMonth());
    console.log('dia :', hoy.getDate());

    if (年 < 18) {
        return false;
    } else if (年 == 18) {
        if(hoy.getMonth() < fecha.getMonth()) {
            return false;
        } else if (hoy.getMonth() == fecha.getMonth()) {
            if (hoy.getDate() >= fecha.getDate() + 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
}

const validador = (event) => {

    let nombre = document.getElementById("nombre");
    let mail = document.getElementById("email");
    let region = document.getElementById("region");
    // let comuna = document.getElementById("comuna");
    let fono = document.getElementById("fono");
    let dob = document.getElementById("dob");

    let gender = [document.getElementById("M"), document.getElementById("F"), document.getElementById("X")];
    
    let isValid = true;

    event.preventDefault();

    formatError(nombre, !nameV(nombre.value));
    formatError(mail, !mailV(mail.value));
    formatError(region, !regionV(region));

    formatError(fono, !fonoV(fono)); 
    formatError(dob, !dobV(dob));
}