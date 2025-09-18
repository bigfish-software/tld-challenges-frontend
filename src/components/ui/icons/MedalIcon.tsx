export interface MedalIconProps {
  /** Medal position: 1st, 2nd, or 3rd place */
  position: 1 | 2 | 3;
  /** Size of the medal icon */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export const MedalIcon = ({ 
  position, 
  size = 'md', 
  className = '' 
}: MedalIconProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  const colors = {
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32'  // Bronze
  };

  const medalColor = colors[position];
  const sizeClass = sizeClasses[size];

  return (
    <svg
      className={`${sizeClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Medal Circle */}
      <circle
        cx="12"
        cy="14"
        r="6"
        fill={medalColor}
        stroke="#8B4513"
        strokeWidth="0.5"
      />
      
      {/* Ribbon */}
      <path
        d="M8 2L12 8L16 2L14 2L12 4L10 2Z"
        fill={medalColor}
        stroke="#8B4513"
        strokeWidth="0.5"
      />
      
      {/* Medal Ring */}
      <circle
        cx="12"
        cy="14"
        r="4.5"
        fill="none"
        stroke="#8B4513"
        strokeWidth="0.5"
      />
    </svg>
  );
};