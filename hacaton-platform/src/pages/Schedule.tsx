import { useState, useEffect } from 'react';
import type { Event } from '../utils/types';
import Button from '../components/UI/Button';

const Schedule: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Фейк-фетч — замени на API
    const fakeEvents: Event[] = [
      { id: '1', title: 'Встреча команды', date: '2026-01-25T14:00:00', status: 'upcoming', description: 'Обсуждение плана' },
      { id: '2', title: 'Демо проекта', date: '2026-01-24T10:00:00', status: 'ongoing', description: 'Презентация' },
      { id: '3', title: 'Ретроспектива', date: '2026-01-20T16:00:00', status: 'completed' }
    ];
    setEvents(fakeEvents);
    setLoading(false);
  }, []);

  // Фильтрация и сортировка по дате
  const filtered = events.filter(e => filter === 'all' || e.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Загрузка расписания...</p></div>;
  }

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Расписание</h1>
        <div className="flex justify-center gap-4 mt-4">
          {['all', 'upcoming', 'ongoing', 'completed'].map(f => (
            <Button key={f} variant={filter === f ? 'primary' : 'secondary'} onClick={() => setFilter(f as any)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </header>

      {sorted.length === 0 ? (
        <div className="text-center p-8"><p>Нет событий. Добавьте первое!</p></div>
      ) : (
        <main>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Название</th>
                <th className="border border-gray-300 p-2">Дата</th>
                <th className="border border-gray-300 p-2">Статус</th>
                <th className="border border-gray-300 p-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(event => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{event.title}</td>
                  <td className="border border-gray-300 p-2">{new Date(event.date).toLocaleString('ru-RU')}</td>
                  <td className="border border-gray-300 p-2">
                    <span className={`px-2 py-1 rounded text-sm ${event.status === 'upcoming' ? 'bg-yellow-200' : event.status === 'ongoing' ? 'bg-blue-200' : 'bg-green-200'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2">{event.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </>
  );
};

export default Schedule;