import { useContext } from 'react';
import Header from "../components/common/Header";
import TablaProyecto from "../components/proyecto/TablaProyecto";
import CrecimientoUsuario from "../components/proyecto/CrecimientoUsuario";
import DemografiaUsuarios from "../components/proyecto/DemografiaUsuarios";
import ActividadUsuario from "../components/proyecto/ActividadUsuario";
import { DataContext } from '../DataContext';

const ProyectoPage = () => {
	const { tweets, users, loading } = useContext(DataContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Proyecto' />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<TablaProyecto users={users} />
				<br />
                
				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<CrecimientoUsuario users={users} />
					<DemografiaUsuarios users={users} />
					<ActividadUsuario users={users} />
				</div>
			</main>
		</div>
	);
};

export default ProyectoPage;