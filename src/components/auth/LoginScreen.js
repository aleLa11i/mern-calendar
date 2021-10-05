import React from 'react';
import { useDispatch } from 'react-redux';
import { StartLogin } from '../../actions/auth';
import { useForm } from '../../Hooks/useForm';
import {Link} from 'react-router-dom';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const [value, handleInputChange] = useForm({
        email:"",
        password:""
    })
    const {email,password} = value;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(StartLogin(value));
    }

    return(
        <div className="container login-container">
            <div className="row"></div>
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <input 
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Correo"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={ password }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            onClick={ handleSubmit }
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
                <Link
                className="link" 
                to="/auth/register">
                    Todavia no tiene una cuenta?
                </Link>
            </div>
        </div>
    )
}
