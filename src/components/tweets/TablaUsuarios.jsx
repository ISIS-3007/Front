/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, CalendarDays } from "lucide-react";

const TablaUsuarios = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const usersPerPage = 2;

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => b.followers_count - a.followers_count);
    setFilteredUsers(sortedUsers);
  }, [users]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) => user.displayname.toLowerCase().includes(term) || user.username.toLowerCase().includes(term)
    );
    const sortedFiltered = filtered.sort((a, b) => sortOrder === "asc" ? a.followers_count - b.followers_count : b.followers_count - a.followers_count);
    setFilteredUsers(sortedFiltered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (order) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (order === "asc") {
        return a.followers_count - b.followers_count;
      } else {
        return b.followers_count - a.followers_count;
      }
    });
    setFilteredUsers(sortedUsers);
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page on sort
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pagesToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Verificar que users esté definido
  if (!users) {
    return <div>Error: No se pudieron cargar los datos de los usuarios.</div>;
  }

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Usuarios</h2>
        <div className='flex items-center'>
          <button
            className='bg-gray-700 text-white rounded-lg px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={() => handleSort(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar usuarios...'
              className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchTerm}
              onChange={handleSearch}
            /> 
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        {currentUsers.map((user) => (
          <motion.div
            key={user.twitter_id}
            className='bg-gray-700 p-4 rounded-lg mb-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {user.profile_banner_url && (
              <img
                src={user.profile_banner_url}
                alt={`${user.username} banner`}
                className='w-full h-32 object-cover rounded-lg mb-4'
              />
            )}
            <div className='flex items-start'>
              <img
                src={user.profile_image_url}
                alt={`${user.username} profile`}
                className='w-16 h-16 rounded-full mr-4'
              />
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-100'>{user.displayname}</h3>
                    <p className='text-sm text-gray-400'>@{user.username}</p>
                  </div>
                  <a
                    href={user.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    Ver perfil
                  </a>
                </div>
                <p className='text-sm text-gray-300 mt-2'>{user.raw_description}</p>
                <span className='flex items-center text-sm text-gray-400 mt-2'> <MapPin /> {user.location}</span>
                <span className='flex items-center text-sm text-gray-400 mt-2'> <CalendarDays /> {new Date(user.created).toLocaleDateString()}</span>
                <div className='flex items-center mt-2'>
                  <p className='text-sm text-gray-400 mr-4'><span className='font-bold'>{user.followers_count.toLocaleString()}</span> Seguidores</p>
                  <p className='text-sm text-gray-400'><span className='font-bold'>{user.friends_count.toLocaleString()}</span> Seguidos</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='flex justify-center mt-4'>
        <button
          onClick={() => paginate(currentPage - 1)}
          className='mx-1 px-3 py-1 rounded-lg bg-gray-700 text-gray-300'
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => paginate(startPage + i)}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className='mx-1 px-3 py-1 rounded-lg bg-gray-700 text-gray-300'
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </motion.div>
  );
};

export default TablaUsuarios;