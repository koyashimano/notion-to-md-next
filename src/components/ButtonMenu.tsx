"use client";

import { ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type MenuOption = {
  onClick: () => void;
  label: string;
};

export type ButtonMenuProps = {
  children: ReactNode;
  options: MenuOption[];
  disabled?: boolean;
};

export default function ButtonMenu({
  children,
  options,
  disabled,
}: ButtonMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleClose = () => setIsMenuOpen(false);

  return (
    <button ref={menuButtonRef} onClick={handleToggle} disabled={disabled}>
      {children}
      {isMenuOpen &&
        createPortal(
          <div>
            <div className="fixed inset-0 z-10" onClick={handleClose} />
            <div
              className="absolute z-20 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              style={{
                top: menuButtonRef.current?.getBoundingClientRect().bottom,
                right:
                  document.body.getBoundingClientRect().width -
                  (menuButtonRef.current?.getBoundingClientRect().right ?? 0),
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1" role="menu">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.onClick();
                      handleClose();
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </button>
  );
}
