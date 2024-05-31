export type TTodoState = {
  data: IDataTodo[] | null;
};

interface IDataTodo {
  key: string;
  name: string;
  date: string;
  overdue: boolean;
  children: children[];
}

interface children {
  key: number;
  name: string;
}
