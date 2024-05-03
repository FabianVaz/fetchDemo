import { FC, useState, useEffect } from 'react';

const CompUseFetchHook: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <div>
      {data.map((item: { id: number; title: string; url: string }) => (
        <div key={item.id}>
          <img src={item.url} alt={item.title} />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CompUseFetchHook;
