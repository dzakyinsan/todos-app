declare interface IMainContext {
  store: any;
  dispatch: any;
}

export type TModal = {
  open: boolean;
  title?: string;
  contentTemplate?: React.ReactNode;
  className?: string;
  onCancel?: () => void;
};
