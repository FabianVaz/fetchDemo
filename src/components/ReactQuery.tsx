import { FC } from 'react';
import { useQuery } from 'react-query';

const CompReactQuery: FC = () => {
  const { data, error, isLoading } = useQuery('photos', () =>
    fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json())
  );

  if (isLoading) return <div>Cargando...</div>;
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

export default CompReactQuery;
