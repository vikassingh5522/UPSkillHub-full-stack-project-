import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' }
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Modern Logo Icon */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Background gradient circle */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main rounded square background */}
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="14"
            fill="url(#logoGradient)"
            filter="url(#glow)"
          />

          {/* Inner glow effect */}
          <rect
            x="8"
            y="8"
            width="48"
            height="48"
            rx="10"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />

          {/* Upward arrow / growth symbol */}
          <path
            d="M32 16L42 28H36V36H28V28H22L32 16Z"
            fill="white"
            opacity="0.95"
          />

          {/* Book / knowledge base */}
          <path
            d="M20 38H44V46C44 47.1046 43.1046 48 42 48H22C20.8954 48 20 47.1046 20 46V38Z"
            fill="white"
            opacity="0.9"
          />

          {/* Book pages lines */}
          <path
            d="M24 42H40"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M24 45H36"
            stroke="url(#logoGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Sparkle / star accent */}
          <circle cx="46" cy="18" r="3" fill="white" opacity="0.8" />
          <circle cx="48" cy="16" r="1.5" fill="#FCD34D" />
        </svg>

        {/* Animated pulse ring */}
        <div className="absolute inset-0 rounded-xl bg-primary-500/20 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-black tracking-tight leading-none`}>
            <span className="text-white">Up</span>
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Skill</span>
          </span>
          <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
            Learn • Grow • Succeed
          </span>
        </div>
      )}
    </div>
  );
};

// Alternative minimalist logo
export const LogoMinimal: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 44, text: 'text-2xl' },
    xl: { icon: 56, text: 'text-3xl' }
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="minimalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        {/* Rounded square */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill="url(#minimalGradient)"
        />

        {/* U letter stylized as upward growth */}
        <path
          d="M16 14V28C16 32.4183 19.5817 36 24 36C28.4183 36 32 32.4183 32 28V14"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Arrow pointing up from U */}
        <path
          d="M24 8L28 14H20L24 8Z"
          fill="white"
        />
      </svg>

      {showText && (
        <span className={`${text} font-black tracking-tight`}>
          <span className="text-white">Up</span>
          <span className="text-primary-400">Skill</span>
        </span>
      )}
    </div>
  );
};

// Modern hexagon logo variant
export const LogoHex: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' }
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        {/* Hexagon background */}
        <path
          d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
          fill="url(#hexGradient)"
        />

        {/* Inner hexagon outline */}
        <path
          d="M32 10L50 21V43L32 54L14 43V21L32 10Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Graduation cap */}
        <path
          d="M32 22L46 28L32 34L18 28L32 22Z"
          fill="white"
        />
        <path
          d="M24 30V38L32 42L40 38V30"
          fill="white"
          opacity="0.9"
        />
        <path
          d="M46 28V36"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="46" cy="38" r="2" fill="white" />

        {/* Growth arrow */}
        <path
          d="M32 18L36 24H28L32 18Z"
          fill="#FCD34D"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-black tracking-tight leading-none`}>
            <span className="text-white">Up</span>
            <span className="text-primary-400">Skill</span>
            <span className="text-purple-400">Hub</span>
          </span>
          <span className="text-[9px] text-gray-500 tracking-widest uppercase">
            Elevate Your Skills
          </span>
        </div>
      )}
    </div>
  );
};

// Brain + Book combination logo
export const LogoBrain: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' }
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          {/* Rounded square background */}
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="16"
            fill="url(#brainGradient)"
          />

          {/* Open book base */}
          <path
            d="M12 44C12 42.8954 12.8954 42 14 42H50C51.1046 42 52 42.8954 52 44V48C52 49.1046 51.1046 50 50 50H14C12.8954 50 12 49.1046 12 48V44Z"
            fill="white"
            opacity="0.9"
          />

          {/* Book spine */}
          <path
            d="M32 42V50"
            stroke="url(#brainGradient)"
            strokeWidth="2"
          />

          {/* Left page */}
          <path
            d="M14 42V22C14 20 16 18 18 18H30C31 18 32 19 32 20V42H14Z"
            fill="white"
            opacity="0.95"
          />

          {/* Right page */}
          <path
            d="M50 42V22C50 20 48 18 46 18H34C33 18 32 19 32 20V42H50Z"
            fill="white"
            opacity="0.95"
          />

          {/* Knowledge spark / lightbulb */}
          <circle cx="32" cy="12" r="4" fill="#FCD34D" />
          <path
            d="M32 16V18"
            stroke="#FCD34D"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Reading lines on pages */}
          <path d="M18 24H28" stroke="url(#brainGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M18 28H26" stroke="url(#brainGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M18 32H27" stroke="url(#brainGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M36 24H46" stroke="url(#brainGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M38 28H46" stroke="url(#brainGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M37 32H46" stroke="url(#brainGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-black tracking-tight leading-none`}>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              UpSkill
            </span>
          </span>
          <span className="text-[10px] text-gray-400 tracking-wider font-medium">
            Knowledge Hub
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
