
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
        return false;
    } else {
        input.style.backgroundColor = '';
        input.style.border = '';
        input.style.borderColor = ''; 
        input.style.borderRadius = '';   
        return true;
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

function genderV(gender) {
    // Es válido si esta seleccionado

    let valid = false;
    gender.forEach(element => {
        if (element.checked == true) {
            valid = true;
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

function comunaV(comuna, region) {
    // Una comuna es valida si es parte de la region dicha

    console.log(comuna.value);
    console.log(region.value);
    console.log('region de comuna es :', comunasChile[comuna.value.toLowerCase()])

    if (!(comuna.value.toLowerCase() in comunasChile)) {
        return false;
    }

    if (comunasChile[comuna.value.toLowerCase()] == region.value.toLowerCase()) {
        return true;
    } else {
        return false;
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
    if(dob.value == "") {
        return false;
    }
    
    const fecha = new Date(dob.value);
    const hoy = new Date();
    const 年 = hoy.getFullYear() - fecha.getFullYear();

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

const comunasChile = {'arica': 'arica y parinacota', 'camarones': 'arica y parinacota', 'putre': 'arica y parinacota', 'general lagos': 'arica y parinacota', 'iquique': 'tarapacá', 'alto hospicio': 'tarapacá', 'pozo almonte': 'tarapacá', 'camiña': 'tarapacá', 'colchane': 'tarapacá', 'huara': 'tarapacá', 'pica': 'tarapacá', 'antofagasta': 'antofagasta', 'mejillones': 'antofagasta', 'sierra gorda': 'antofagasta', 'taltal': 'antofagasta', 'calama': 'antofagasta', 'ollagüe': 'antofagasta', 'san pedro de atacama': 'antofagasta', 'tocopilla': 'antofagasta', 'maría elena': 'antofagasta', 'copiapó': 'atacama', 'caldera': 'atacama', 'tierra amarilla': 'atacama', 'chañaral': 'atacama', 'diego de almagro': 'atacama', 'vallenar': 'atacama', 'alto del carmen': 'atacama', 'freirina': 'atacama', 'huasco': 'atacama', 'la serena': 'coquimbo', 'coquimbo': 'coquimbo', 'andacollo': 'coquimbo', 'la higuera': 'coquimbo', 'paihuano': 'coquimbo', 'vicuña': 'coquimbo', 'illapel': 'coquimbo', 'canela': 'coquimbo', 'los vilos': 'coquimbo', 'salamanca': 'coquimbo', 'ovalle': 'coquimbo', 'combarbalá': 'coquimbo', 'monte patria': 'coquimbo', 'punitaqui': 'coquimbo', 'río hurtado': 'coquimbo', 'valparaiso': 'valparaiso', 'casablanca': 'valparaiso', 'concón': 'valparaiso', 'juan fernández': 'valparaiso', 'puchuncaví': 'valparaiso', 'quintero': 'valparaiso', 'viña del mar': 'valparaiso', 'isla de pascua': 'valparaiso', 'los andes': 'valparaiso', 'calle larga': 'valparaiso', 'rinconada': 'valparaiso', 'san esteban': 'valparaiso', 'la ligua': 'valparaiso', 'cabildo': 'valparaiso', 'papudo': 'valparaiso', 'petorca': 'valparaiso', 'zapallar': 'valparaiso', 'quillota': 'valparaiso', 'la calera': 'valparaiso', 'hijuelas': 'valparaiso', 'la cruz': 'valparaiso', 'nogales': 'valparaiso', 'san antonio': 'valparaiso', 'algarrobo': 'valparaiso', 'cartagena': 'valparaiso', 'el quisco': 'valparaiso', 'el tabo': 'valparaiso', 'santo domingo': 'valparaiso', 'san felipe': 'valparaiso', 'catemu': 'valparaiso', 'llay-llay': 'valparaiso', 'panquehue': 'valparaiso', 'putaendo': 'valparaiso', 'santa maría': 'valparaiso', 'quilpué': 'valparaiso', 'limache': 'valparaiso', 'olmué': 'valparaiso', 'villa alemana': 'valparaiso', 'rancagua': "o'higgins", 'codegua': "o'higgins", 'coinco': "o'higgins", 'coltauco': "o'higgins", 'doñihue': "o'higgins", 'graneros': "o'higgins", 'las cabras': "o'higgins", 'machalí': "o'higgins", 'malloa': "o'higgins", 'mostazal': "o'higgins", 'olivar': "o'higgins", 'peumo': "o'higgins", 'pichidegua': "o'higgins", 'quinta de tilcoco': "o'higgins", 'rengo': "o'higgins", 'requínoa': "o'higgins", 'san vicente': "o'higgins", 'pichilemu': "o'higgins", 'la estrella': "o'higgins", 'litueche': "o'higgins", 'marchigüe': "o'higgins", 'navidad': "o'higgins", 'paredones': "o'higgins", 'san fernando': "o'higgins", 'chépica': "o'higgins", 'chimbarongo': "o'higgins", 'lolol': "o'higgins", 'nancagua': "o'higgins", 'palmilla': "o'higgins", 'peralillo': "o'higgins", 'placilla': "o'higgins", 'pumanque': "o'higgins", 'santa cruz': "o'higgins", 'talca': 'maule', 'constitución': 'maule', 'curepto': 'maule', 'empedrado': 'maule', 'maule': 'maule', 'pelarco': 'maule', 'pencahue': 'maule', 'río claro': 'maule', 'san clemente': 'maule', 'san rafael': 'maule', 'cauquenes': 'maule', 'chanco': 'maule', 'pelluhue': 'maule', 'curicó': 'maule', 'hualañé': 'maule', 'licantén': 'maule', 'molina': 'maule', 'rauco': 'maule', 'romeral': 'maule', 'sagrada familia': 'maule', 'teno': 'maule', 'vichuquén': 'maule', 'linares': 'maule', 'colbún': 'maule', 'longaví': 'maule', 'parral': 'maule', 'retiro': 'maule', 'san javier': 'maule', 'villa alegre': 'maule', 'yerbas buenas': 'maule', 'chillán': 'ñuble', 'bulnes': 'ñuble', 'chillán viejo': 'ñuble', 'el carmen': 'ñuble', 'pemuco': 'ñuble', 'pinto': 'ñuble', 'quillón': 'ñuble', 'san ignacio': 'ñuble', 'yungay': 'ñuble', 'quirihue': 'ñuble', 'cobquecura': 'ñuble', 'coelemu': 'ñuble', 'ninhue': 'ñuble', 'portezuelo': 'ñuble', 'ránquil': 'ñuble', 'treguaco': 'ñuble', 'san carlos': 'ñuble', 'coihueco': 'ñuble', 'ñiquén': 'ñuble', 'san fabián': 'ñuble', 'san nicolás': 'ñuble', 'concepción': 'biobío', 'coronel': 'biobío', 'chiguayante': 'biobío', 'florida': 'biobío', 'hualqui': 'biobío', 'lota': 'biobío', 'penco': 'biobío', 'san pedro de la paz': 'biobío', 'santa juana': 'biobío', 'talcahuano': 'biobío', 'tomé': 'biobío', 'hualpén': 'biobío', 'lebu': 'biobío', 'arauco': 'biobío', 'cañete': 'biobío', 'contulmo': 'biobío', 'curanilahue': 'biobío', 'los álamos': 'biobío', 'tirúa': 'biobío', 'los ángeles': 'biobío', 'antuco': 'biobío', 'cabrero': 'biobío', 'laja': 'biobío', 'mulchén': 'biobío', 'nacimiento': 'biobío', 'negrete': 'biobío', 'quilaco': 'biobío', 'quilleco': 'biobío', 'san rosendo': 'biobío', 'santa bárbara': 'biobío', 'tucapel': 'biobío', 'yumbel': 'biobío', 'alto biobío': 'biobío', 'temuco': 'la araucanía', 'carahue': 'la araucanía', 'cunco': 'la araucanía', 'curarrehue': 'la araucanía', 'freire': 'la araucanía', 'galvarino': 'la araucanía', 'gorbea': 'la araucanía', 'lautaro': 'la araucanía', 'loncoche': 'la araucanía', 'melipeuco': 'la araucanía', 'nueva imperial': 'la araucanía', 'padre las casas': 'la araucanía', 'perquenco': 'la araucanía', 'pitrufquén': 'la araucanía', 'pucón': 'la araucanía', 'saavedra': 'la araucanía', 'teodoro schmidt': 'la araucanía', 'toltén': 'la araucanía', 'vilcún': 'la araucanía', 'villarrica': 'la araucanía', 'cholchol': 'la araucanía', 'angol': 'la araucanía', 'collipulli': 'la araucanía', 'curacautín': 'la araucanía', 'ercilla': 'la araucanía', 'lonquimay': 'la araucanía', 'los sauces': 'la araucanía', 'lumaco': 'la araucanía', 'purén': 'la araucanía', 'renaico': 'la araucanía', 'traiguén': 'la araucanía', 'victoria': 'la araucanía', 'valdivia': 'los ríos', 'corral': 'los ríos', 'lanco': 'los ríos', 'los lagos': 'los ríos', 'máfil': 'los ríos', 'mariquina': 'los ríos', 'paillaco': 'los ríos', 'panguipulli': 'los ríos', 'la unión': 'los ríos', 'futrono': 'los ríos', 'lago ranco': 'los ríos', 'río bueno': 'los ríos', 'puerto montt': 'los lagos', 'calbuco': 'los lagos', 'cochamó': 'los lagos', 'fresia': 'los lagos', 'frutillar': 'los lagos', 'los muermos': 'los lagos', 'llanquihue': 'los lagos', 'maullín': 'los lagos', 'puerto varas': 'los lagos', 'castro': 'los lagos', 'ancud': 'los lagos', 'chonchi': 'los lagos', 'curaco de vélez': 'los lagos', 'dalcahue': 'los lagos', 'puqueldón': 'los lagos', 'queilén': 'los lagos', 'quellón': 'los lagos', 'quemchi': 'los lagos', 'quinchao': 'los lagos', 'osorno': 'los lagos', 'puerto octay': 'los lagos', 'purranque': 'los lagos', 'puyehue': 'los lagos', 'río negro': 'los lagos', 'san juan de la costa': 'los lagos', 'san pablo': 'los lagos', 'chaitén': 'los lagos', 'futaleufú': 'los lagos', 'hualaihué': 'los lagos', 'palena': 'los lagos', 'coyhaique': 'aysén', 'lago verde': 'aysén', 'aysén': 'aysén', 'cisnes': 'aysén', 'guaitecas': 'aysén', 'cochrane': 'aysén', "o'higgins": 'aysén', 'tortel': 'aysén', 'chile chico': 'aysén', 'río ibáñez': 'aysén', 'punta arenas': 'magallanes y antártica', 'laguna blanca': 'magallanes y antártica', 'río verde': 'magallanes y antártica', 'san gregorio': 'magallanes y antártica', 'cabo de hornos': 'magallanes y antártica', 'antártica': 'magallanes y antártica', 'porvenir': 'magallanes y antártica', 'primavera': 'magallanes y antártica', 'timaukel': 'magallanes y antártica', 'natales': 'magallanes y antártica', 'torres del paine': 'magallanes y antártica', 'santiago': 'metropolitana', 'cerrillos': 'metropolitana', 'cerro navia': 'metropolitana', 'conchalí': 'metropolitana', 'el bosque': 'metropolitana', 'estación central': 'metropolitana', 'huechuraba': 'metropolitana', 'independencia': 'metropolitana', 'la cisterna': 'metropolitana', 'la florida': 'metropolitana', 'la granja': 'metropolitana', 'la pintana': 'metropolitana', 'la reina': 'metropolitana', 'las condes': 'metropolitana', 'lo barnechea': 'metropolitana', 'lo espejo': 'metropolitana', 'lo prado': 'metropolitana', 'macul': 'metropolitana', 'maipú': 'metropolitana', 'ñuñoa': 'metropolitana', 'pedro aguirre cerda': 'metropolitana', 'peñalolén': 'metropolitana', 'providencia': 'metropolitana', 'pudahuel': 'metropolitana', 'quilicura': 'metropolitana', 'quinta normal': 'metropolitana', 'recoleta': 'metropolitana', 'renca': 'metropolitana', 'san joaquín': 'metropolitana', 'san miguel': 'metropolitana', 'san ramón': 'metropolitana', 'vitacura': 'metropolitana', 'puente alto': 'metropolitana', 'pirque': 'metropolitana', 'san josé de maipo': 'metropolitana', 'colina': 'metropolitana', 'lampa': 'metropolitana', 'til til': 'metropolitana', 'san bernardo': 'metropolitana', 'buin': 'metropolitana', 'calera de tango': 'metropolitana', 'paine': 'metropolitana', 'melipilla': 'metropolitana', 'alhué': 'metropolitana', 'curacaví': 'metropolitana', 'maría pinto': 'metropolitana', 'san pedro': 'metropolitana', 'talagante': 'metropolitana', 'el monte': 'metropolitana', 'isla de maipo': 'metropolitana', 'padre hurtado': 'metropolitana', 'peñaflor': 'metropolitana'};

const validador = (event) => {

    let nombre = document.getElementById("nombre");
    let gender = [document.getElementById('M'), document.getElementById('F'), document.getElementById('X')];
    let mail = document.getElementById("email");
    let region = document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let fono = document.getElementById("fono");
    let dob = document.getElementById("dob");
    
    let isValid = true;

    event.preventDefault();

    isValid = formatError(nombre, !nameV(nombre.value)) && isValid;
    isValid = formatError(mail, !mailV(mail.value)) && isValid;
    isValid = formatError(region, !regionV(region)) && isValid;
    isValid = formatError(comuna, !comunaV(comuna, region)) && isValid;
    isValid = formatError(fono, !fonoV(fono)) && isValid; 
    isValid = formatError(dob, !dobV(dob)) && isValid;

    const genderValid = genderV(gender);
    if (!genderValid) {
        document.getElementById('gender-error').style.display = 'inline';
    }

    if (isValid && genderValid) {
        console.log('yay');
        let success = document.getElementById('form-success');
        success.style.display = 'block';
        document.getElementById('span').innerText = nombre.value;
        event.target.form.submit();
    }
}