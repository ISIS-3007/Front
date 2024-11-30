import { useContext } from 'react';
import Header from "../components/common/Header";
import TablaProyecto from "../components/proyecto/TablaProyecto";
import CrecimientoUsuario from "../components/proyecto/CrecimientoUsuario";
import DemografiaUsuarios from "../components/proyecto/DemografiaUsuarios";
import ActividadUsuario from "../components/proyecto/ActividadUsuario";
import { DataContext } from '../DataContext';
import FechasCreacionCuentas from '../components/proyecto/FechasCreacionCuentas';
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";

const ProyectoPage = () => {
	const { users, loading } = useContext(DataContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Proyecto' />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Usuarios totales' icon={UsersIcon} value={'Hola'} color='#10B981' />
					<StatCard name='Usuarios con post positivos' icon={UserPlus} value={'Hola'} color='#10B981' />
					<StatCard name='Usuarios con post negativos' icon={UserCheck} value={'Hola'} color='#F59E0B'/>
					<StatCard name='Usuarios con post neutrales' icon={UserX} value={'Hola'} color='#EF4444' />
				</motion.div>

				<TablaProyecto users={users} />
				<br />
				<FechasCreacionCuentas users={users} />
                
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