import { FC } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CompSWR: FC = () => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/photos', fetcher);

  if (error) return <div>Error al cargar los datos</div>;
  if (!data) return <div>Cargando...</div>;

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

export default CompSWR;
