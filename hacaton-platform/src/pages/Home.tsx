import { useState, useEffect } from 'react';
import type { UserProps } from '../components/UI/UserCard';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загрузка статистики из localStorage (синхронизация с Participants)
    const saved = localStorage.getItem('participants');
    if (saved) {
      const participants: UserProps[] = JSON.parse(saved);
      const active = participants.filter(p => !p.completed).length;
      const completed = participants.filter(p => p.completed).length;
      setStats({ total: participants.length, active, completed });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Загрузка...</p></div>;
  }

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Добро пожаловать в проект!</h1>
        <p className="text-gray-600 mt-2">Управление участниками и расписанием</p>
      </header>

      {stats.total > 0 ? (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Всего участников</h2>
            <p className="text-3xl">{stats.total}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Активные</h2>
            <p className="text-3xl">{stats.active}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Завершённые</h2>
            <p className="text-3xl">{stats.completed}</p>
          </div>
        </main>
      ) : (
        <div className="text-center p-8 bg-yellow-50 rounded-lg">
          <p className="text-gray-600">Нет участников. Начните с добавления!</p>
        </div>
      )}

      {/* Тизеры — чистый JSX, Fragment */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Участники</h2>
          <p className="text-gray-600 mb-4">Просмотр и управление списком.</p>
          <Button onClick={() => window.location.href = '/participants'}>Перейти</Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Расписание</h2>
          <p className="text-gray-600 mb-4">Календарь событий.</p>
          <Button onClick={() => window.location.href = '/schedule'}>Перейти</Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Админ</h2>
          <p className="text-gray-600 mb-4">Полный контроль.</p>
          <Button onClick={() => window.location.href = '/admin'}>Перейти</Button>
        </div>
      </section>
    </>
  );
};

export default Home;