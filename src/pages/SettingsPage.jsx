import Header from "../components/common/Header";
import ScraperAccounts from "../components/settings/ScraperAccounts"; 
import ScraperQuery from "../components/settings/ScraperQuery"; 
import ScraperProxies from "../components/settings/ScraperProxies";
import ScraperIA from "../components/settings/ScraperIA"; 

const SettingsPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
      <Header title='Configuraciones' />
      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
	  	<ScraperIA /> 
	  	<ScraperAccounts /> 
        <ScraperQuery /> 
        <ScraperProxies /> 
      </main>
    </div>
  );
};

export default SettingsPage;