import { useState, useEffect } from 'react';
import UserCard from '../components/UI/UserCard';
import type { UserProps } from '../components/UI/UserCard';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { api } from '../shared/api/httpClient';
import { EmptyState } from '../shared/ui/EmptyState';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<UserProps[]>([]);
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // загрузка участников
  useEffect(() => {
    const loadParticipants = async () => {
      try {
        setLoading(true);

        const response = await api.get<UserProps[]>('/participants');

        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setParticipants(response.data);
        }
      } catch (e) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();
  }, []);

  // сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants));
  }, [participants]);

  const addParticipant = () => {
    if (!newName.trim()) {
      setError('Имя не может быть пустым!');
      return;
    }

    const newOne: UserProps = {
      id: Date.now().toString(),
      name: newName,
      completed: false,
    };

    setParticipants(prev => [...prev, newOne]);
    setNewName('');
    setError('');
    setShowForm(false);
  };

  const toggleCompleted = (id: string) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === id ? { ...p, completed: !p.completed } : p
      )
    );
  };

  const filtered = participants.filter(p =>
    filter === 'all' ||
    (filter === 'active' && !p.completed) ||
    (filter === 'completed' && p.completed)
  );

  const sorted = [...filtered].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  //  Рендер 

  if (loading) {
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  if (!loading && participants.length === 0 && !error) {
    return (
      <EmptyState
        title="Нет участников"
        actionText="Обновить"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Участники</h1>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'font-bold' : ''}
          >
            Все
          </button>

          <button
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'font-bold' : ''}
          >
            Активные
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'font-bold' : ''}
          >
            Завершённые
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          Ошибка: {error}
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map(participant => (
          <UserCard
            key={participant.id}
            {...participant}
            onClick={() => toggleCompleted(participant.id)}
          />
        ))}
      </main>

      <footer className="text-center mt-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Скрыть форму' : 'Добавить участника'}
        </button>
      </footer>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2>Новый участник</h2>

            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Имя"
            />

            <div className="flex gap-2 mt-4">
              <Button onClick={addParticipant}>Добавить</Button>

              <Button
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Participants;
