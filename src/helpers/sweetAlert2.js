import Swal from 'sweetalert2';
import { getCookie } from './cookies';

const basicNotification = (text) => {
    Swal.fire({
        title: text
    })
}

const confirmationAlert = callback => {
    Swal.fire({
        title: '¿Seguro(a)?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then(callback)
}

const passwordRequiredAlert = (callback) => {
    Swal.fire({
        title: 'Ingrese su contraseña',
        input: 'password',
        inputAttributes: { autocapitalize: 'off' },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: confirmPassword,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(callback);
}

//Callbacks

async function confirmPassword(password) {
    const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/auth/pass'
        : '';
    const data = {
        method:'POST',
        headers: {
            'cvtoken': getCookie('cvToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password})
    }

    try {
        const response = await fetch(url, data);
        const { results: {err, uid} } = await response.json();
        if(err) {
            basicNotification(err);
            return false;
        }
        return uid;
    } catch (error) {
        basicNotification(error);
        return false;
    }
}

export {
    basicNotification,
    confirmationAlert,
    passwordRequiredAlert
};
