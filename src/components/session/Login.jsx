import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Register from './Register'; // Importa tu componente de registro
import imgLogin from '../../img/img_user.png';
import Styles from '../../styles/Session.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth_user, providerGoogle } from '../../firebase/appConfig';
import Swal from 'sweetalert2';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para mostrar u ocultar la modal

    const handleShowRegisterModal = () => setShowRegisterModal(true);
    const handleCloseRegisterModal = () => setShowRegisterModal(false);

    const loginForm = (data) => {
        signInWithEmailAndPassword(auth_user, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                saveLocalStorage("user_firebase", JSON.stringify(user));
                navigate('/ListProducts');
            })
            .catch((error) => {
                console.error(error.message);
                Swal.fire({
                    title: "Credenciales Invalidas",
                    text: "Revisa tu informacion",
                    icon: "warning"
                });
            });
    };

    const loginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth_user, providerGoogle);
            saveLocalStorage("user_firebase", JSON.stringify(result.user));
            navigate('/ListProducts');
        } catch (error) {
            Swal.fire({
                title: "Error al autenticarse con Google",
                text: "Revisa tu informacion",
                icon: "warning"
            });
        }
    };

    const saveLocalStorage = (key, data) => {
        localStorage.setItem(key, data);
    };

    return (
        <>
            <div className={`${Styles.card_estilo}`}>
                <div className={`${Styles.card_body} card d-block mx-auto`}>
                    {/* <div className={Styles.card_linea}></div> */}
                    <div className={`${Styles.card_contenido} card-body`}>
                        <img src={imgLogin} className='d-block mx-auto mb-2' alt="" />
                        <h4 className="card-title text-center">Iniciar sesión</h4>
                        <div className={Styles.btn_center}>
                            <button onClick={loginGoogle} type="button" className={`${Styles.btn_register}`}>
                                <i className="bi bi-google"></i> Inicia con google
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(loginForm)}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input  className="form-control" 
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            pattern: {
                                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                                message: 'Correo electrónico inválido',
                                            },
                                        })}
                                />
                                {errors.email && <span className='form-text text-danger'>{errors.email.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input className="form-control" 
                                        id="password"
                                        type="password"
                                        {...register('password', {
                                            required: 'Este campo es requerido',
                                            minLength: {value: 6, message: 'La contraseña debe tener al menos 6 caracteres'},
                                        })}
                                />
                                {errors.password && <span className='form-text text-danger'>{errors.password.message}</span>}
                            </div>
                            <button type="submit" className={`${Styles.card_button} mb-2`}>Ingresar</button>
                        </form>
                        <Button variant="link" onClick={handleShowRegisterModal}>¿Aún no tienes cuenta? Regístrate</Button>
                    </div>
                    {/* <div className={Styles.card_linea}></div> */}
                </div>
            </div>

            <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Register onRegisterSuccess={handleCloseRegisterModal} />
                </Modal.Body>
            </Modal>
        </>
    );
}
