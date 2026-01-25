import Link from 'next/link';
import { ReactNode } from 'react';

interface NavigationCardProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  variant?: 'standard' | 'featured' | 'notebook';
  borderColor?: string; // For standard cards (e.g., 'var(--glacial-400)')
  gradient?: string;    // For featured cards
}

export default function NavigationCard({ 
  href, 
  title, 
  description, 
  icon, 
  variant = 'standard',
  borderColor,
  gradient
}: NavigationCardProps) {
  
  if (variant === 'standard') {
    return (
      <Link 
        href={href} 
        className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" 
        style={{ borderTop: `4px solid ${borderColor || 'var(--glacial-400)'}` }}
      >
        <div className="mb-3 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--sage-600)' }}>
          {description}
        </p>
      </Link>
    );
  }

  // Featured and Notebook variants use gradients and white text
  const defaultGradient = variant === 'notebook' 
    ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
    : 'linear-gradient(135deg, var(--glacial-600) 0%, var(--glacial-700) 100%)';

  return (
    <Link 
      href={href} 
      className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group text-white relative overflow-hidden" 
      style={{ background: gradient || defaultGradient }}
    >
      <div className="mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>
      <p className="opacity-90">
        {description}
      </p>
      {/* Add children/extra elements here if needed, like the sparkles in notebook */}
    </Link>
  );
}
