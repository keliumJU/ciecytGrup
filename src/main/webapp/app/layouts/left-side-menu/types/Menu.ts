export type Menu = {
  name: string;
  iconClass: string;
  active: boolean;
  submenu: { iconClass: string; name: string; url: string }[];
};
