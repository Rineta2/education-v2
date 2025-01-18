export interface SubMenu {
  id: string;
  name: string;
  href: string;
}

export interface NavItem {
  id: number;
  name: string;
  href: string;
  submenu?: SubMenu[];
}
