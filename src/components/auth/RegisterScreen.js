import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { StartRegister } from '../../actions/auth';
import { useForm } from '../../Hooks/useForm';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const [value, handleInputChange] = useForm({
        email:"",
        password1:"",
        password2:"",
        name:""
    })
    const {email,password1,password2,name} = value;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password1 !== password2){
            Swal.fire("Error", "Ambas contraseñas deben coincidir", "error")
        }

         dispatch(StartRegister({
             email,
             name,
             password:password1
         }));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleSubmit } >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={ name }
                                name="name"
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={ email }
                                name="email"
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={ password1 }
                                name="password1"
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                value={ password2 }
                                name="password2"
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" 
                                onClick={ handleSubmit }
                                />
                        </div>
                    </form>
                    <Link
                    className="link" 
                    to="/auth/login">
                        Ya posee una cuenta?
                    </Link>
                </div>
            </div>
        </div>
    )
}
