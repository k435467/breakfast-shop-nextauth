import IMenuCategory from "./IMenuCategory";
import IMenuItem from "./IMenuItem";

export default interface IMenu extends IMenuCategory {
  menuItems: IMenuItem[];
}
