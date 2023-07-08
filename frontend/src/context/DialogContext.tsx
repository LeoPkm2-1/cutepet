import React, { useCallback, useState } from 'react';
import { Props } from 'react-select';
import ConfirmDialog from '../components/ConfirmDialog';

export interface ConfirmDialogOption {
  key?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  cancelText?: string;
  okText?: string;
  okColor?:
    | 'inherit'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning';
}

type DialogContextValue = {
  dialogs: ConfirmDialogOption[];
  addDialog: (dialogs: ConfirmDialogOption) => void;
};

const defaultValue = Object.freeze<DialogContextValue>({
  dialogs: [],
  addDialog: () => {
    throw new Error('not_implement');
  },
});

export const Context = React.createContext(defaultValue);

type ContextState = {
  dialogs: ConfirmDialogOption[];
};

export default class DialogContext extends React.Component<
  Props,
  ContextState
> {
  state = { dialogs: defaultValue.dialogs };

  addDialog = (option: ConfirmDialogOption) => {
    this.setState((state) => ({
      dialogs: [...state.dialogs, option],
    }));
  };
  removeDialog = (key?: string) => {
    this.setState((state) => ({
      dialogs: state.dialogs.filter((o) => o.key !== key),
    }));
  };

  render(): React.ReactNode {
    return (
      <Context.Provider
        value={{ dialogs: this.state.dialogs, addDialog: this.addDialog }}
      >
        {this.props.children}
        {this.state.dialogs.map((dialog) => (
          <ConfirmDialog
            {...dialog}
            onDispose={() => {
              this.removeDialog(dialog.key);
            }}
          />
        ))}
      </Context.Provider>
    );
  }
}

// export default function (props: { children?: React.ReactNode }) {
//   const [value, setValue] = useState<ConfirmDialogOption[]>(
//     defaultValue.dialogs
//   );
//   const setDialogs = useCallback(
//     (dialogs: ConfirmDialogOption[]) => setValue(dialogs),
//     []
//   );

//   return (
//     <Context.Provider value={{ dialogs: value, setDialogs }}>
//       {props.children}
//     </Context.Provider>
//   );
// }
