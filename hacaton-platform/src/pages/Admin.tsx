import { useState, useEffect } from 'react';
import type { UserProps } from '../components/UI/UserCard';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Admin: React.FC = () => {
  const [participants, setParticipants] = useState<UserProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('participants');
    if (saved) {
      setParticipants(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants));
  }, [participants]);

  const openEdit = (participant?: UserProps) => {
    if (participant) {
      setFormData({ name: participant.name, email: participant.email || '', bio: participant.bio || '' });
      setEditingId(participant.id);
    } else {
      setFormData({ name: '', email: '', bio: '' });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const save = () => {
    if (!formData.name.trim()) return; // Валидация
    const newOne: UserProps = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      email: formData.email || undefined,
      bio: formData.bio || undefined,
      completed: false
    };
    if (editingId) {
      // редактируем существующего участника, вместо того чтобы менять массив
      setParticipants(participants.map(p => p.id === editingId ? newOne : p));
    } else {
      // раскладывает элементы массива в новый
      setParticipants([...participants, newOne]);
    }
    setShowModal(false);
  };

  const deleteParticipant = (id: string) => {
    // Filter для удаления
    setParticipants(participants.filter(p => p.id !== id));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Загрузка...</p></div>;
  }

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Админ-панель</h1>
        <Button onClick={() => openEdit()} className="mt-4">Добавить участника</Button>
      </header>

      {participants.length === 0 ? (
        <div className="text-center p-8"><p>Нет участников для управления.</p></div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">{p.name}</h3>
              <p>{p.email}</p>
              <p className="text-gray-500">{p.bio}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="primary" onClick={() => openEdit(p)}>Редактировать</Button>
                <Button variant="secondary" onClick={() => deleteParticipant(p.id)}>Удалить</Button>
              </div>
            </div>
          ))}
        </main>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? 'Редактировать' : 'Добавить'}>
        <Input 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          placeholder="Имя" 
        />
        <Input 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          placeholder="Email" 
          type="email" 
        />
        <Input 
          value={formData.bio} 
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
          placeholder="Био" 
        />
        <div className="flex gap-2 mt-4">
          <Button onClick={save}>Сохранить</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
        </div>
      </Modal>
    </>
  );
};

export default Admin;