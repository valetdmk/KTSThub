import { useState } from "react";

const roles = [
  { id: "student", number: "01", label: "STUDENT" },
  { id: "business_partner", number: "02", label: "BUSINESS PARTNER" },
  { id: "judge", number: "03", label: "JUDGE" },
  { id: "organizer", number: "04", label: "ORGANIZER" },
];

export function RoleSelectionScreen() {
  const [, setSelectedRole] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  return (
    <div className="roles-grid">
      {roles.map((role) => (
        <div 
          key={role.id} 
          className={`role-card ${role.id === 'business_partner' || role.id === 'organizer' ? 'offset-down' : ''} ${role.id === 'student' || role.id === 'judge' ? 'offset-up' : ''}`}
        >
          <button 
            className={`select-btn ${role.id === 'student' || role.id === 'judge' ? 'bottom-right' : ''} ${role.id === 'business_partner' || role.id === 'organizer' ? 'top-right' : ''}`}
            onClick={() => handleSelect(role.id)}
          >
            Выбрать
          </button>
        </div>
      ))}
    </div>
  );
}