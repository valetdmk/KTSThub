import { useState, useEffect } from 'react';
import UserCard from '../components/UI/UserCard';
import type { UserProps } from '../components/UI/UserCard';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<UserProps[]>([]);
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('participants');
    if (saved) {
      setParticipants(JSON.parse(saved));
    } else {
      const initial: UserProps[] = [
        { id: '1', name: 'Ксения', email: 'ksenia@example.com', completed: false },
        { id: '2', name: 'Мария', bio: 'Из России', completed: true }
      ];
      setParticipants(initial);
    }
  }, []);

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
      completed: false
    };
    setParticipants([...participants, newOne]);
    setNewName('');
    setError('');
    setShowForm(false);
  };

  const toggleCompleted = (id: string) => {
    setParticipants(
      participants.map(p =>
        p.id === id ? { ...p, completed: !p.completed } : p
      )
    );
  };

  const filtered = participants.filter(p => 
    filter === 'all' || (filter === 'active' && !p.completed) || (filter === 'completed' && p.completed)
  );

  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  {participants.length === 0 && !error && (
  <p>Нет участников</p>
)}


  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Участники</h1>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'font-bold' : ''}>Все</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'font-bold' : ''}>Активные</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'font-bold' : ''}>Завершённые</button>
        </div>
      </header>

      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">Ошибка: {error}</div>} {/* Ошибки */}

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
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded">
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
              <Button variant="secondary" onClick={() => setShowForm(false)}>Отмена</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Participants;