export interface NavItem {
  label: string;
  subLabel?: string;
  children?: NavItem[];
  href?: string;
  tags?: {
    label: string;
    colorPalette: string;
  }[];
}

export type NavItems = NavItem[];

export type NavItemsAsProps = {
  navItems: NavItems;
};
