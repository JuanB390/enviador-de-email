//Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
eventListeners();
function eventListeners() {
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reiniciar el formulario
    btnReset.addEventListener('click',resetarFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}


//Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Valida el formulario
function validarFormulario(e) {


    if (e.target.value.length > 0) {
        // console.log('Hay algo');

        //Elimina los errores...
        const error = document.querySelector('p.error');
        
        if(error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('TODOS LOS CAMPOS SON OBLIGATORIOS');
    }

    if (e.target.type === 'email') {
        
        //VALIDACION REGULAR
        if (regex.test(e.target.value)) {
            // console.log('Hay email');
            //Elimina los errores...
        const error = document.querySelector('p.error');
        
        if(error) {
            error.remove();
        }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('EL EMAIL NO ES  VÁLIDO');

        }
    }
    if(regex.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }else{
        console.log('No pasaste la validación');
    }



}






function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
    //CON ESTE CODIGO PARA COLOCAR EL MENSAJE EN LA PARTE SUPERIOR DE EL FORMULARIO
    //if(errores.length === 0){
    //formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    //}


}


// Envía el email

function enviarEmail(e){
    e.preventDefault(); // Siempre para validacion de fomrularios lo mas problable es usar e.preventDefault()

    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


  //  Después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {

        //Siempre es un arrow function 
        console.log('Esta funcion se ejevuta despues de 3 segundos')
        spinner.style.display = 'none';

        //Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envío correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove(); // Eliminar el mensaje de exito
            resetarFormulario();
        },5000)
    },3000);
}


// setInterval(() => {//Diferencia con setIntervaL

//     console.log('esta funcion se v a a ejecutar cada 3 segundos');

// }, 3000)




//Funcion que resetea el formulario


function resetarFormulario () {
    formulario.reset();
    iniciarApp();
}