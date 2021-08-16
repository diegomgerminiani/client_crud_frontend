import React from 'react';
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import ClientTable from '../components/ClientTable'
import Footer from '../components/Footer'


export default function Home() {

	

	return (
		<div className={styles.container}>
			<Header title={'CRUD Clientes'}/>
			<main className={styles.main}>
				<h2 className={styles.title}>
					Bem vindo ao CRUD de Clientes
				</h2>
				<ClientTable/>
			</main>
			<Footer/>
		</div>
	)
}
