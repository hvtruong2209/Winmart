export interface ICategoryItemModel {
  id: string;
  name: string;
}

export interface ICategory {
  selectId: string;
  name: string;
  categories: ICategoryItemModel[];
}
