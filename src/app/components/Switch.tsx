import React from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        className={`w-20 h-10 rounded-full transition-colors duration-300 ease-in-out ${
          checked ? 'bg-[var(--woolworths-green)]' : 'bg-gray-300'
        }`}
        style={{
          boxShadow: checked
            ? 'inset 0 0 0 2px var(--woolworths-green)'
            : 'inset 0 0 0 2px #ccc'
        }}
      >
        <div
          className={`relative top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
            checked ? 'translate-x-10' : 'translate-x-0'
          }`}
        />
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
    </label>
  );
};

export default Switch;
