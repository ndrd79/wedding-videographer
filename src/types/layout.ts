export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    href: string;
    label: string;
  }>;
}
