import { ReactNode } from "react";

export interface OptionsMenuProps {
  /**
   * Children to render inside the options menu
   */
  children: ReactNode;

  /**
   * Items to render in the options menu
   */
  items: OptionsMenuItem[];
}

export interface OptionsMenuItem {
  /**
   * Label of the item
   */
  label: string;

  /**
   * Callback to execute when the item is clicked
   */
  onClick: () => void;

  /**
   * Icon to render in the item
   */
  icon?: ReactNode;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}
