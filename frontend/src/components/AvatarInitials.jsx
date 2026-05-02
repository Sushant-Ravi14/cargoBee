import React from 'react';

const AvatarInitials = ({ name = '', size = 128, className = '' }) => {
  const getInitials = (fullName) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  // Deterministic gradient colour based on the first character's char-code
  const hue = (name.charCodeAt(0) || 0) * 37 % 360;
  const gradient = `linear-gradient(135deg, hsl(${hue},70%,55%), hsl(${(hue + 40) % 360},75%,45%))`;

  return (
    <div
      className={`flex items-center justify-center rounded-full select-none font-bold text-white shadow-xl ${className}`}
      style={{
        width: size,
        height: size,
        background: gradient,
        fontSize: size * 0.35,
        letterSpacing: '0.05em',
        flexShrink: 0,
      }}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};

export default AvatarInitials;
