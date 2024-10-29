import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import TablaProyecto from "../components/proyecto/TablaProyecto";
import SegmentacionEmociones from "../components/proyecto/SegmentacionEmociones";
import CrecimientoUsuario from "../components/proyecto/CrecimientoUsuario";
import DemografiaUsuarios from "../components/proyecto/DemografiaUsuarios";
import ActividadUsuario from "../components/proyecto/ActividadUsuario";

const userStats = {
	totalUsers: 25,
	newUsersToday: 2,
	activeUsers: 15,
	churnRate: "2.4%",
};

const ProyectoPage = () => {
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
					<StatCard
						name='Usuarios Totales'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='Nuevos Usuarios Hoy' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />
					<StatCard
						name='Usuarios Activos'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Tasa de usuarios inactivos' icon={UserX} value={userStats.churnRate} color='#EF4444' />
				</motion.div>

                <TablaProyecto />
                
				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
                    <SegmentacionEmociones />
                    <CrecimientoUsuario />
                    <DemografiaUsuarios />
                    <ActividadUsuario />
                    
				</div>
			</main>
		</div>
	);
};

export default ProyectoPage