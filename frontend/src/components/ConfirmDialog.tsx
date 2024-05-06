import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';

type P = {
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  content?: React.ReactNode;
  title?: React.ReactNode;
  onDispose?: () => void;
  okColor?:
    | 'inherit'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning';
};

type S = {
  open: boolean;
};

const initState = Object.freeze({
  open: true,
});

export default class ConfirmDialog extends React.Component<P, S> {
  state = initState;

  componentDidUpdate() {
    if (!this.state.open) {
      window.setTimeout(() => {
        this.props.onDispose?.();
      }, 300);
    }
  }

  show = () => {
    this.setState({ open: true });
  };

  private _handleCancel = () => {
    this.setState({ open: false }, this.props.onCancel);
  };

  private _handleOk = () => {
    this.setState({ open: false }, this.props.onOk);
  };

  private _handleAnimatedEnd = () => {};

  render(): React.ReactNode {
    return (
      <Dialog
        open={this.state.open}
        // on={this._handleAnimatedEnd}
        // onClose={this._handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="text text-bold">{this.props.title}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text">{this.props.content}</div>
        </DialogContent>
        <DialogActions>
          <StyledButton
            color="inherit"
            onClick={this._handleCancel}
            size="small"
          >
            {this.props.cancelText ?? 'Cancel'}
          </StyledButton>
          <StyledButton
            color={this.props.okColor ?? 'info'}
            variant="contained"
            onClick={this._handleOk}
            size="small"
            autoFocus
          >
            {this.props.okText ?? 'OK'}
          </StyledButton>
        </DialogActions>
      </Dialog>
    );
  }
}

const StyledButton = styled(Button)`
  font-family: quicksand;
  text-transform: none;
`;
