import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t text-center" style={{ borderColor: 'var(--glacial-200)' }}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <Image
          src="/media/nch-logo.svg"
          alt="Nordic Circular Hotspot"
          width={32}
          height={32}
          className="h-8 w-auto opacity-70"
        />
        <span className="text-lg font-semibold" style={{ color: 'var(--glacial-700)' }}>
          Nordic Circular Summit 2025
        </span>
      </div>
      <p className="text-sm" style={{ color: 'var(--sage-500)' }}>
        Circular Frontiers: Shaping Our Future • Nuuk, Greenland
      </p>
    </footer>
  );
}
