import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth_user } from '../firebase/appConfig'
import { useNavigate } from 'react-router-dom'
import Styles from '../styles/ListProducts.module.css';
import imgFondo from '../img/img7.jpg'
import DataTable from 'react-data-table-component';

export default function ListProducts() {
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth_user, (userFirebase) => {
			if (userFirebase) {
				setUser(userFirebase)
			} else {
				setUser(null)
				navigate('/login')
			}
		})
		return () => unsubscribe()
	}, [navigate])

	const logout = () => {
		signOut(auth_user).then(() => {
			alert("La sesión se ha cerrado");
			navigate('/login')
		}).catch((error) => {
			console.error("Error al cerrar sesión", error)
		})
	}

	const data = [
		{ id: 1, title: 'Primer título', year: 2000 },
		{ id: 2, title: 'Segundo título', year: 2001 },
		{ id: 3, title: 'Tercer título', year: 2002 },
	];

	const columns = [
		{
			name: 'ID',
			selector: row => row.id,
			sortable: true,
		},
		{
			name: 'Título',
			selector: row => row.title,
			sortable: true,
		},
		{
			name: 'Año',
			selector: row => row.year,
			sortable: true,
		},
	];

	const [searchTerm, setSearchTerm] = useState('');

  // Función para filtrar los datos
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

	return (
		<div>
			{
				user &&
				<>
					<div>
						<nav className="navbar navbar-expand-lg navbar-custom">
							<div className="container flex-column">
								<a className={Styles.nav_link_name} href="#"><span>•</span> minim <span>•</span></a>
								<hr className={`${Styles.hr_nav} "border-1"`} />
								<div className={`${Styles.div_nav} "navbar-links d-flex justify-content-center mt-2"`}>
									<a className={Styles.nav_link} href="#productos"><i className="bi bi-box-seam"></i> Productos</a>
									<a className={Styles.nav_link} href="#sobre"><i className="bi bi-person"></i> Perfil</a>
									<a className={Styles.nav_link} onClick={logout}><i className="bi bi-box-arrow-left"></i> Salir</a>
								</div>
							</div>
						</nav>
						<div className={Styles.img_overlay}>
							<img src={imgFondo} className={`${Styles.img_slide} d-block`} alt="Image" />
							<div className={Styles.carousel_caption}>
								<h3>Bienvenido administrador</h3>
								<div className={Styles.linea}></div>
								<p>Has iniciado sesión con: <span>{user?.email}</span></p>
							</div>
						</div>
					</div>
					<div className="container text-center mt-5" id="productos">
						<div className="container flex-column">
							<div className={Styles.title}>Productos</div>
							<hr className={`${Styles.hr_title} border-2 `} />
						</div>
						<div className="mb-3 mt-3 input-group">
							<span className="input-group-text">
								<i className="bi bi-search"></i>
							</span>
							<input
								type="text"
								className={`${Styles.input_search}`} // Ajusta el ancho según necesites
								placeholder="Buscar por título"
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
						<DataTable
							columns={columns}
							data={filteredData}
							pagination
							selectableRows
							// Puedes agregar más propiedades aquí según sea necesario
							striped
							highlightOnHover
							noHeader
							className="table table-striped"
						/>
					</div>
				</>
			}
		</div>
	)
}
