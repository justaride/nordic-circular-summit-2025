import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode | string;
  showBackLink?: boolean;
  showLogo?: boolean;
}

export default function Header({ 
  title, 
  subtitle, 
  icon, 
  showBackLink = false,
  showLogo = false 
}: HeaderProps) {
  return (
    <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showBackLink && (
          <Link href="/" className="mb-2 inline-block transition-colors hover:text-[var(--glacial-800)]" style={{ color: 'var(--glacial-600)' }}>
            ← Back to Home
          </Link>
        )}
        
        <div className="flex items-center gap-4">
          {showLogo && (
            <Image
              src="/media/nch-logo.svg"
              alt="Nordic Circular Hotspot"
              width={56}
              height={56}
              className="h-14 w-auto"
            />
          )}
          
          <div className="flex items-center gap-3">
            {icon && <span className="text-3xl">{icon}</span>}
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-lg" style={{ color: 'var(--sage-600)' }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
