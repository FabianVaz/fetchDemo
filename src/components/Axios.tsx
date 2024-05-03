import { FC, useState, useEffect } from 'react';
import axios from 'axios';

const CompAxios: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        setData(response.data);
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

export default CompAxios;
