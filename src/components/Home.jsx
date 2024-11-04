import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Styles from '../styles/Home.module.css';
import imgSlide1 from '../img/img1.jpg'
import imgSlide2 from '../img/img2.jpg'
import imgSlide3 from '../img/img3.jpg'
import imgSlide4 from '../img/img4.jpg'
import imgProduct1 from '../img/producto1.jpg'
import imgProduct2 from '../img/producto2.jpg'
import imgProduct3 from '../img/producto3.jpg'
import imgProduct4 from '../img/producto4.jpg'
import imgProduct5 from '../img/producto5.jpg'
import imgProduct6 from '../img/producto6.jpg'
import imgProduct7 from '../img/producto7.jpg'
import imgProduct8 from '../img/producto8.jpg'
import imgProduct9 from '../img/producto9.jpg'


import db from '../firebase/appConfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Home() {
  return(
    <>
			<nav className="navbar navbar-expand-lg navbar-custom">
				<div className="container flex-column">
					<a className={Styles.nav_link_name} href="#"><span>•</span> minim <span>•</span></a>
					<hr className={`${Styles.hr_nav} "border-1"`}/>
					<div className={`${Styles.div_nav} "navbar-links d-flex justify-content-center mt-2"`}>
						<a className={Styles.nav_link} href="#productos">Productos</a>
						<a className={Styles.nav_link} href="#sobre">Sobre</a>
						<a className={Styles.nav_link} href="#contacto">Contacto</a>
						<a className={Styles.nav_link} href="#">Ingresar</a>
					</div>
				</div>
			</nav>
			<main>
				<div id="carouselMinim" className="carousel slide" data-bs-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<div className={Styles.img_overlay}>
								<img src={imgSlide1} className={`${Styles.img_slide} d-block`} alt="Image" />
								<div className={Styles.carousel_caption}>
									<h3>Summer Makeup</h3>
									<p>Obtén hasta el 50% de descuento en todo el maquillaje</p>
								</div>
							</div>
						</div>
						<div className="carousel-item">
							<div className={Styles.img_overlay}>
								<img src={imgSlide2} className={`${Styles.img_slide} d-block`} alt="Image" />
								<div className={Styles.carousel_caption}>
									<h3>¿Zapatos?</h3>
									<p>Descuentos de verano en todo tipo de zapatos</p>
								</div>
							</div>
						</div>
						<div className="carousel-item">
							<div className={Styles.img_overlay}>
								<img src={imgSlide3} className={`${Styles.img_slide} d-block`} alt="Image" />
								<div className={Styles.carousel_caption}>
									<h3>¿Algo natural?</h3>
									<p>Encuentra acá todo tipo de productos</p>
								</div>
							</div>
						</div>
						<div className="carousel-item">
							<div className={Styles.img_overlay}>
								<img src={imgSlide4} className={`${Styles.img_slide} d-block`} alt="Image" />
								<div className={Styles.carousel_caption}>
									<h3>¿Algo nuevo?</h3>
									<p>Obtén hasta el 20% de descuento en otros productos</p>
								</div>
							</div>
						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselMinim" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselMinim" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
				<div className="container text-center mt-5" id="productos">
					<div className="container flex-column">
						<a className={Styles.title} href="#">Productos</a>
						<hr className={`${Styles.hr_title} border-2 `} />
					</div>
					<div className="row mt-4">
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct1} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct2} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct3} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct4} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct5} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct6} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct7} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct8} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-2">
							<div className={`${Styles.product_card} card`}>
								<div className={Styles.image_container}>
									<img src={imgProduct9} alt="Producto 1" className={Styles.product_image} />
									<a href="#" className={Styles.btn_buy}>Comprar</a>
								</div>
								<div className="card-body text-center">
									<h5 className="card-title">Nombre del Producto</h5>
									<p className="card-text">$000.00</p>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center">
						<button className={Styles.btn_load_more}>Cargar más...</button>
					</div>
				</div>
			</main>
    </>
  )
}
