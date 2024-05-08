import { useState, useEffect } from 'react'
import './App.css'

const useImageURL = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realizar ambas solicitudes simultáneamente utilizando Promise.all
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
      fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
    ])
      .then(responses => Promise.all(responses.map(response => {
        if (!response.ok) {
          throw new Error("Server error!!");
        }
        return response.json();
      })))
      .then(data => {
        const urls = data.map(response => response.url);
        setImageURLs(urls);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { imageURLs, error, loading };
};

function App() {
  const { imageURLs, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p> A network error was encountered ! </p>

  return (
    <>
      <h1>Images</h1>
      {imageURLs.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </>
  )
}

export default App
