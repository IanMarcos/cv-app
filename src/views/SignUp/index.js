import { useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '../commonComponents/Alert';

function SignUp() {

    const [userData, setUserData] = useState({name:'', email:''});
    // Contraseña no es almacenada en un hook por ser accesible con herramientas de desarrollo
    const [alert, setAlert] = useState({active: false, type:'', msg: ''});

    const handleUserInput = ({ target: {name, value} }) => {
        /*El valor del nombre del <input> se guarda como la llave del objeto. Si el input tiene por nombre
        "email", entonces userData.email es actualizado con el value del target. 
        Si del target del evento llegase el 'name' "asdf", entonces se almacenaria el 'value' en userData.asdf  */
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();

        //Se extrae la contraseña del event
        const password = e.target[1].value;

        //Verificación de campos diligenciados
        if(userData.email.length === 0 || password.length === 0){
            setAlert({ active: true, type:'warning', msg:'Ambos campos son obligatorios' });
            setTimeout( () => setAlert({...alert, active:false}),3000 );
            return null;
        }

        //Llamado a la API
        const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/users/'
            : '';

        // const response = await fetch(url, {
        //     method:'POST',
        //     body: JSON.stringify({email, password}),
        //     headers: { 'Content-Type': 'application/json' }
        // });
        // const { results } = await response.json();

        // TODO: Permanecer sesión iniciada
    }

    return(
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <div className="col">
                <div className="row">
                        <label>
                            <input 
                                name="name"
                                placeholder="Nombre (No obligatorio)"
                                value={userData.name}
                                onChange={handleUserInput}
                            />   
                        </label>
                    </div>
                    <div className="row">
                        <label>
                            <input 
                                name="email"
                                placeholder="Correo"
                                value={userData.email}
                                onChange={handleUserInput}
                            />   
                        </label>
                    </div>
                    <div className="row">
                        <label>
                            <input
                                name="password" 
                                placeholder="Constraseña" 
                                type="password" 
                            />
                        </label>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-success"> Iniciar sesión</button>
                    </div>
                    <div className="row">
                        <p>¿Ya tienes cuenta? <Link to ="/signin">Inicia sesión</Link></p>
                    </div>
                    {alert.active? 
                        <Alert {...{type: alert.type, msg:alert.msg}}/>
                        : undefined
                    }
                </div>
            </form>
        </div>
    )
}

export default  SignUp;
