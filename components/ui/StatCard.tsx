import { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  accentColor: 'glacial' | 'sage';
}

export default function StatCard({ value, label, icon, accentColor }: StatCardProps) {
  const borderVar = accentColor === 'glacial' ? 'var(--glacial-400)' : 'var(--sage-400)';
  const textVar = accentColor === 'glacial' ? 'var(--glacial-700)' : 'var(--sage-700)';
  const labelVar = accentColor === 'glacial' ? 'var(--sage-600)' : 'var(--glacial-600)';

  return (
    <div 
      className="frost-card rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105" 
      style={{ borderLeft: `4px solid ${borderVar}` }}
    >
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <div className="text-3xl font-bold" style={{ color: textVar }}>
        {value}
      </div>
      <div style={{ color: labelVar }}>
        {label}
      </div>
    </div>
  );
}
