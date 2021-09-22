import IMenuItem from "./IMenuItem";

export default interface IMenu {
  id: number;
  title: string;
  menuItems: IMenuItem[];
}
