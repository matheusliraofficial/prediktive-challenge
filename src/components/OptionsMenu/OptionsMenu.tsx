import React, { useEffect, useRef, useState, MouseEvent } from "react";
import type { OptionsMenuProps } from "./OptionsMenu.types";
import styles from "./OptionsMenu.module.scss";

export const OptionsMenu = ({ children, items }: OptionsMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsVisible(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (callback: () => void) => {
    callback();
    setIsVisible(false);
  };

  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      {children}
      {isVisible && (
        <div
          ref={menuRef}
          className={styles.optionsMenu__popup}
          style={
            {
              "--x-position": `${position.x}px`,
              "--y-position": `${position.y}px`,
            } as React.CSSProperties
          }
          data-testid="options-menu"
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => !item.disabled && handleClick(item.onClick)}
              className={`${styles.optionsMenu__item} ${item.disabled ? styles.optionsMenu__item_disabled : ''}`}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
