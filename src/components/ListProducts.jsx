import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth_user } from '../firebase/appConfig'
import { signOut } from 'firebase/auth'
import Login from './session/Login'
import Styles from '../styles/ListProducts.module.css';
import imgSlide1 from '../img/img7.jpg'

export default function ListProducts() {
	const [user, setUser] = useState(null)
	const userStorage = JSON.parse(localStorage.getItem("user_firebase")) //{}

	onAuthStateChanged(auth_user, (userFirebase) => {
		if (userFirebase) {
			console.log(userFirebase);
			setUser(userFirebase)
		} else {
			setUser(null)
		}
	})

	const logout = () => {
		signOut(auth_user).then(() => {
			alert("La sesion se ha cerrado");
		}).catch((error) => {
			console.error("Error al cerrar sesion", error)
		})
	}

	return (
		<div>
			{
				user ?
					<>
						<div>
							<nav className="navbar navbar-expand-lg navbar-custom">
								<div className="container flex-column">
									<a className={Styles.nav_link_name} href="#"><span>•</span> minim <span>•</span></a>
									<hr className={`${Styles.hr_nav} "border-1"`} />
									<div className={`${Styles.div_nav} "navbar-links d-flex justify-content-center mt-2"`}>
										<a className={Styles.nav_link} href="#productos">Productos</a>
										<a className={Styles.nav_link} href="#sobre">Perfil</a>
										<a className={Styles.nav_link} onClick={logout}>Cerrar Sesion</a>
									</div>
								</div>
							</nav>
							<div className={Styles.img_overlay}>
								<img src={imgSlide1} className={`${Styles.img_slide} d-block`} alt="Image" />
								<div className={Styles.carousel_caption}>
									<h3>Bienvenido administrador</h3>
									<p>Has iniciado sesión con: <span>{userStorage.email}</span></p>
								</div>
							</div>
						</div>
					</>
					: <Login />
			}

		</div>
	)
}
