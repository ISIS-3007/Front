import { useContext } from 'react';
import Header from "../components/common/Header";
import TablaProyecto from "../components/proyecto/TablaProyecto";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { DataContext } from '../DataContext';
import FechasCreacionCuentas from '../components/proyecto/FechasCreacionCuentas';
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import GrafoUsuarios from '../components/proyecto/GrafoUsuarios'; // Asegúrate de ajustar la ruta según sea necesario

const ProyectoPage = () => {
    const { users, tweets, loading } = useContext(DataContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    const totalUsers = users.length;
    const positiveUsers = tweets.filter(tweet => tweet.polarity === 'positive').map(tweet => tweet.user).filter((value, index, self) => self.indexOf(value) === index).length;
    const negativeUsers = tweets.filter(tweet => tweet.polarity === 'negative').map(tweet => tweet.user).filter((value, index, self) => self.indexOf(value) === index).length;
    const neutralUsers = tweets.filter(tweet => tweet.polarity === 'neutral').map(tweet => tweet.user).filter((value, index, self) => self.indexOf(value) === index).length;

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Usuarios' />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Usuarios totales' icon={UsersIcon} value={totalUsers} color='#10B981' />
                    <StatCard name='Usuarios con post positivos' icon={UserPlus} value={positiveUsers} color='#10B981' />
                    <StatCard name='Usuarios con post negativos' icon={UserX} value={negativeUsers} color='#EF4444'/>
                    <StatCard name='Usuarios con post neutrales' icon={UserCheck} value={neutralUsers} color='#3B82F6'  />
                </motion.div>

                <FechasCreacionCuentas users={users} />
                <br />
                <TablaProyecto users={users} />
				<br />
				<div className="w-full h-[48rem] flex justify-center items-center overflow-hidden">
                    <div className="w-full h-full">
                        <GrafoUsuarios users={users} tweets={tweets} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProyectoPage;