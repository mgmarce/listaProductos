import React from 'react';
import imgLogin from '../../img/img_user.png';
import Styles from '../../styles/Session.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth_user, providerGoogle } from '../../firebase/appConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ejemplo: usuario@dominio.com"),
  password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no son iguales")
});

export default function Register({ onRegisterSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()

  const registerForm = (data) => {
    createUserWithEmailAndPassword(auth_user, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        onRegisterSuccess();
        saveLocalStorage("user_firebase", JSON.stringify(user))
        Swal.fire({
          title: "Registro exitoso",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/ListProducts')
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error en el registro",
          text: "Revisa tu información",
          icon: "warning"
        });
      });
  };

  const registerGoogle = async () => {
    try {
      const result = await signInWithPopup(auth_user, providerGoogle);
      saveLocalStorage("user_firebase", JSON.stringify(result.user))
      Swal.fire({
        title: "Exito en registrarse",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        navigate('/ListProducts')
      });
    } catch (error) {
      Swal.fire({
        title: "Error al autenticarse con Google",
        text: "Revisa tu informacion",
        icon: "warning"
      });
    }
  }

  const saveLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
  }

  return (
    <>
      <div> {/**<div className={`${Styles.card_estilo}`}> */}
        <div className={`${Styles.card_contenido} card-body`}>
          <img src={imgLogin} className='d-block mx-auto mb-2' alt="" />
          <h4 className="card-title text-center">Registrate</h4>
          <div className={Styles.btn_center}>
            <button onClick={registerGoogle} type="button" className={`${Styles.btn_register} mt-2`}><i className="bi bi-google"></i> Registrarse con google</button>
          </div>
          <form onSubmit={handleSubmit(registerForm)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control"
                id="email"
                type="email"
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Correo electrónico inválido',
                  },
                })}
              />{errors.email && <span className='form-text text-danger'>{errors.email.message}</span>}
              {/** form-text */}
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input className="form-control"
                id="password"
                type="password"
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres', },
                })}
              />{errors.password && <span className='form-text text-danger'>{errors.password.message}</span>}
            </div>
            <button type="submit" className={`${Styles.card_button} mb-2`}>Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
}
