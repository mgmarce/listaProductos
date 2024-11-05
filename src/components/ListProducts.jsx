import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth_user } from '../firebase/appConfig'
import { useNavigate, Link } from 'react-router-dom'
import Styles from '../styles/ListProducts.module.css'
import imgFondo from '../img/img7.jpg'
import DataTable from 'react-data-table-component'
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import db from '../firebase/appConfig'

export default function ListProducts() {
	const [user, setUser] = useState(null)
	const [products, setProducts] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)  // Modal de confirmación de eliminación
	const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' })
	const [editProduct, setEditProduct] = useState(null)  // Producto en edición
	const [productToDelete, setProductToDelete] = useState(null)  // Producto para eliminar
	const navigate = useNavigate()

	// Autenticación del usuario
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

	// Cerrar sesión
	const logout = () => {
		signOut(auth_user).then(() => {
			alert("La sesión se ha cerrado");
			navigate('/login')
		}).catch((error) => {
			console.error("Error al cerrar sesión", error)
		})
	}

	// Obtener productos de Firebase
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "products"),
			(snapshot) => {
				const array_products = snapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id
				}))
				setProducts(array_products)
			}
		)
		return () => unsubscribe()
	}, [])

	// Configuración de columnas para DataTable
	const columns = [
		{
			name: 'ID',
			selector: row => row.id,
			sortable: true,
		},
		{
			name: 'Nombre',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'Descripción',
			selector: row => row.description,
			sortable: true,
		},
		{
			name: 'Precio',
			selector: row => `$${parseFloat(row.price).toFixed(2)}`,
			sortable: true,
		},
		{
			name: 'Acciones',
			cell: row => (
				<div>
					<button onClick={() => openEditModal(row)}>Editar</button>
					<button onClick={() => confirmDeleteProduct(row)} style={{ marginLeft: '10px' }}>
						Eliminar
					</button>
				</div>
			),
		},
	]

	// Función para abrir el modal de confirmación de eliminación
	const confirmDeleteProduct = (product) => {
		setProductToDelete(product)
		setShowDeleteModal(true)
	}

	// Función de eliminación de producto con confirmación
	const deleteProduct = async () => {
		if (productToDelete) {
			try {
				await deleteDoc(doc(db, "products", productToDelete.id))
				alert("Producto eliminado exitosamente")
				setProductToDelete(null)
			} catch (error) {
				console.error("Error al eliminar producto: ", error)
			}
			setShowDeleteModal(false)
		}
	}

	// Función para abrir el modal en modo edición
	const openEditModal = (product) => {
		setEditProduct(product)
		setNewProduct({ name: product.name, description: product.description, price: product.price })
		setShowModal(true)
	}

	// Función para manejar el cambio en los campos del formulario de producto
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct({ ...newProduct, [name]: value });
	}

	// Función para guardar el nuevo producto o editar el existente
	const saveProduct = async () => {
		if (editProduct) {
			// Modo edición: actualizar el producto
			try {
				const productDoc = doc(db, "products", editProduct.id)
				await updateDoc(productDoc, {
					name: newProduct.name,
					description: newProduct.description,
					price: parseFloat(newProduct.price)
				})
				alert("Producto actualizado exitosamente")
			} catch (error) {
				console.error("Error al actualizar producto: ", error)
			}
		} else {
			// Modo agregar: agregar un nuevo producto
			try {
				await addDoc(collection(db, "products"), {
					name: newProduct.name,
					description: newProduct.description,
					price: parseFloat(newProduct.price)
				})
				alert("Producto agregado exitosamente")
			} catch (error) {
				console.error("Error al agregar producto: ", error)
			}
		}

		// Cerrar el modal y resetear el formulario
		setShowModal(false)
		setEditProduct(null)
		setNewProduct({ name: '', description: '', price: '' })
	}

	// Filtrado de productos basado en el término de búsqueda
	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

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
								className={`${Styles.input_search}`}
								placeholder="Buscar por nombre"
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className={`${Styles.align_left} mb-3`}>
							<button className='btn btn-info' onClick={() => { setShowModal(true); setEditProduct(null); }}>Agregar</button>
						</div>
						<DataTable
							columns={columns}
							data={filteredProducts}
							pagination
							selectableRows
							striped
							highlightOnHover
							noHeader
							className="table table-striped"
						/>

						{/* Modal para agregar/editar producto */}
						{showModal && (
							<div className={`${Styles.modal} modal show`} tabIndex="-1" style={{ display: 'block' }}>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">{editProduct ? "Editar Producto" : "Agregar Producto"}</h5>
											<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
										</div>
										<div className="modal-body">
											<input type="text" className="form-control mb-2" placeholder="Nombre" name="name" value={newProduct.name} onChange={handleInputChange} />
											<input type="text" className="form-control mb-2" placeholder="Descripción" name="description" value={newProduct.description} onChange={handleInputChange} />
											<input type="number" className="form-control mb-2" placeholder="Precio" name="price" value={newProduct.price} onChange={handleInputChange} />
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
											<button type="button" className="btn btn-primary" onClick={saveProduct}>{editProduct ? "Guardar Cambios" : "Guardar Producto"}</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Modal de confirmación de eliminación */}
						{showDeleteModal && (
							<div className={`${Styles.modal} modal show`} tabIndex="-1" style={{ display: 'block' }}>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Confirmar Eliminación</h5>
											<button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
										</div>
										<div className="modal-body">
											<p>¿Estás seguro de que deseas eliminar el producto <strong>{productToDelete?.name}</strong>?</p>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
											<button type="button" className="btn btn-danger" onClick={deleteProduct}>Eliminar</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</>
			}
		</div>
	)
}
