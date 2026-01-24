import { useState, useEffect } from 'react';
import UserCard from '../components/UI/UserCard';
import type { UserProps } from '../components/UI/UserCard';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<UserProps[]>([]); // Массив "задач"
  const [newName, setNewName] = useState(''); // Текст новой задачи
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all'); // Фильтр
  const [showForm, setShowForm] = useState(false); // Состояние модалки/формы
  const [error, setError] = useState(''); // Ошибки

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('participants');
    if (saved) {
      setParticipants(JSON.parse(saved));
    } else {
      // Фейковые начальные данные
      const initial: UserProps[] = [
        { id: '1', name: 'Ксения', email: 'ksenia@example.com', completed: false },
        { id: '2', name: 'Мария', bio: 'Из России', completed: true }
      ];
      setParticipants(initial);
    }
  }, []);

  // Автосохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants));
  }, [participants]);

  // Добавление (иммутабельно: spread)
  const addParticipant = () => {
    if (!newName.trim()) {
      setError('Имя не может быть пустым!');
      return;
    }
    const newOne: UserProps = {
      id: Date.now().toString(), // Timestamp как ID
      name: newName,
      completed: false
    };
    setParticipants([...participants, newOne]); // Spread для иммутабельности
    setNewName('');
    setError('');
    setShowForm(false);
  };

  // Toggle completed (иммутабельно: map)
  const toggleCompleted = (id: string) => {
    setParticipants( // Обновляем state новым массивом
      participants.map(p =>   // Проходим по каждому участнику (p)
        p.id === id ? { ...p, completed: !p.completed } : p // Логика замены
      )
    );
  };

  // Фильтрация (filter)
  const filtered = participants.filter(p => 
    filter === 'all' || (filter === 'active' && !p.completed) || (filter === 'completed' && p.completed)
  );

  // Сортировка по имени (опционально)
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  if (participants.length === 0 && !error) { // Empty state
    return <div className="text-center p-8"><p>Нет участников. Добавьте первого!</p></div>;
  }

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

      // рендеринг списка участников
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map(participant => ( // map с key
          <UserCard 
            key={participant.id} // Уникальный key!
            {...participant} // Spread props
            onClick={() => toggleCompleted(participant.id)} // Деструктуризация в обработчике
          />
        ))}
      </main>

      <footer className="text-center mt-8">
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded">
          {showForm ? 'Скрыть форму' : 'Добавить участника'}
        </button>
      </footer>

      {showForm && ( // Условный: показ/скрытие формы
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