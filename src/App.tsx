import { useEffect, useState } from 'react';
import './App.css';
import CompSWR from './components/SWR'; // Importa el componente SWR
import CompReactQuery from './components/ReactQuery'; // Importa el componente de React Query
import CompAxios from './components/Axios'; // Importa el componente de Axios
import CompUseFetchHook from './components/UseFetchHook'; // Importa el componente UseFetch
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => response.json())
      .then((response) => setImageURL(response[0].url))
      .catch((error) => console.error(error));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div className="image-section">
          {imageURL && (
            <>
              <h1>An image</h1>
              <img src={imageURL} alt="placeholder text" />
            </>
          )}
        </div>
        <div className="data-section">
          <CompSWR />
          <CompReactQuery />
          <CompAxios />
          <CompUseFetchHook />
        </div>
      </>
    </QueryClientProvider>
  );
}

export default App;
