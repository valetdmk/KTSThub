import { useState, useEffect } from 'react';  // Хуки
import { useParams } from 'react-router-dom'; // Хук роутера
import UserCard from '../components/UI/UserCard';
import type { UserProps } from '../components/UI/UserCard';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Хук: берёт ID из URL
  const [user, setUser] = useState<UserProps | null>(null); // Тип из UserCard

  useEffect(() => { // Хук: фетч данных при монтировании/изменении id
    if (id) {
      fetch(`/api/user/${id}`)
        .then(res => res.json())
        .then(data => setUser(data));
    }
  }, [id]); // Зависимость: перезапустит при смене id

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Профиль пользователя</h1>
      </header>
      <main>
        <UserCard {...user} />
      </main>
    </>
  );
};

export default Profile;