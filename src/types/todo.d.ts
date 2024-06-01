export type TTodoState = {
  data: IDataTodo[] | null;
  dataChecked: IDataTodo[] | null;
};

interface IDataTodo {
  key: string;
  name: string;
  date: string;
  isChecked: boolean;
  isShow: boolean;
  children: IChildren[];
  childrenKeys: string[];
}

interface IChildren {
  key: string;
  name: string;
  isChecked: boolean;
}
