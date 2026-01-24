import React from 'react';

export interface UserProps {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  completed?: boolean;
  onClick?: () => void; 
}

const UserCard: React.FC<UserProps> = ({ 
  id, 
  name = 'Гость', 
  email, 
  avatar, 
  bio, 
  completed = false,
  onClick // ← Деструктуризация onClick
}) => {
  return (
    <article 
      className={`bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto cursor-pointer hover:shadow-lg transition-shadow ${completed ? 'opacity-50 line-through' : ''}`}
      onClick={onClick} // ← Применяем onClick к карточке
    >
      {avatar && (
        <img 
          src={avatar} 
          alt={`${name}'s avatar`} 
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" 
        />
      )}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        {email && <p className="text-gray-600 mb-2">Email: {email}</p>}
        {bio && <p className="text-gray-500 italic">{bio}</p>}
        <p className="text-sm text-gray-400 mt-4">ID: {id}</p>
        {completed && <span className="block text-green-600">Завершено</span>}
        
        <button 
          onClick={(e) => { e.stopPropagation(); onClick?.(); }} // stopPropagation, чтобы не кликать по всей карточке
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={completed} // Отключаем, если уже завершено
        >
          {completed ? 'Уже завершено' : 'Переключить статус'}
        </button>
      </div>
    </article>
  );
};

export default UserCard;