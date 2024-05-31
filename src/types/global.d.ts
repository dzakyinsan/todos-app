export type TModal = {
  open: boolean;
  title?: string;
  contentTemplate?: React.ReactNode;
  className?: string;
  onCancel?: () => void;
  width?: number;
};
