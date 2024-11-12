import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
	{ id: 1, nombre: "Laurita Tita", usuario: "@BambuEnInvierno", likes: 32 , tweet: "El montón de paranoicos x aquí: 'invasión solapada', 'militares en CR', 'caballo de troya', etc. No se les vio tan llorones cuando la Fuerza Aérea Colombiana envió su ayuda en el terremoto del 2009."},
	{ id: 2, nombre: "jose mariño", usuario: "@joerorri", likes: 0 , tweet: "Se llama y se llamará Fuerza Aérea Colombiana.....punto"},
	{ id: 3, nombre: "Mateo Rivas", usuario: "@rivas_mateo15", likes: 23 , tweet: "Que pendejada se llamara así para el gobierno de mierda porque para el pueblo colombiano segurá siendo fuerza aérea colombiana"},
	{ id: 4, nombre: "HERNAN MOTTA ESCOBAR", usuario: "@hernanmottaes", likes: 17 , tweet: "Cambiar el nombre de la Fuerza Aérea Colombiana es parte de los grandes y prioritarios retos que están en la agenda de Petro. Iniciativas que no han 'permitido el crecimiento exponencial' de grupos al margen de la ley'. ¡Plop!"},
	{ id: 5, nombre: "Nicolas UK", usuario: "@nocholasbaron", likes: 45 , tweet: "Felicidades a la Fuerza Aérea Colombiana por sus 105 años de servicio y evolución hacia la Fuerza Aeroespacial Colombiana. Este cambio refleja su visión y defensa del país. ¡Gracias por seguir protefiendo nuestros cielos."},
];

const TablaTweets = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.tweet.toLowerCase().includes(term) || user.tweet.includes(term)
		);
		setFilteredUsers(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Tweets</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search tweets...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tweet
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Likes
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-normal break-words'>
									<div className='flex items-center'>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.tweet}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.likes}</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default TablaTweets;