import styled from '@emotion/styled';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { companyApi } from '../api/company';
import Button from '../components/Button';
import { StyledTextField } from '../components/FormItem';
import { Group } from '../models/members';

type Props = {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  group: Group;
  companyId: string;
};

const defaultFormData = {
  name: '',
  email: '',
  target: 5,
};

export default function AddMemberToGroupDialog(props: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    target: number;
  }>(defaultFormData);
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmitted: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    Promise.resolve()
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        return companyApi.postAddMembers(props.companyId, props.group.id, [
          formData,
        ]);
      })
      .then((res) => {
        setLoading(false);
        form.reset();
        enqueueSnackbar(
          `User '${formData.email}' has been added to group '${props.group.name}'.`,
          { variant: 'success' }
        );
        props.onSuccess?.();
        props.onClose?.();
      })
      .catch((err) => {
        setLoading(false);
        if (Array.isArray(err)) {
          err = err[0];
          if (err) {
            enqueueSnackbar(
              err?.error?.message ?? err?.message ?? 'Action failed.',
              { variant: 'error' }
            );
          }

          return;
        }
        enqueueSnackbar(
          err?.error?.message ?? err?.message ?? 'Action failed.',
          { variant: 'error' }
        );
      });
  };

  return (
    <Dialog open={props.open} maxWidth="xs" fullWidth>
      <form
        onReset={() => setFormData(defaultFormData)}
        onSubmit={handleFormSubmitted}
      >
        <DialogTitle sx={{ fontFamily: 'inherit' }}>
          <span>
            Add member to <span className="text-bold">{props.group?.name}</span>
          </span>
        </DialogTitle>
        <DialogContent>
          <div
            className="text col"
            // style={{
            //   overflow: 'hidden',
            // }}
          >
            <StyledTextField
              size="small"
              margin="normal"
              name="user-name"
              placeholder="Enter user's name"
              label="User's name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.currentTarget.value,
                })
              }
            />
            <StyledTextField
              size="small"
              margin="normal"
              name="email"
              placeholder="Enter user's email"
              label="User's email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.currentTarget.value,
                })
              }
              inputProps={{
                maxLength: 255,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <StyledButton
            color="inherit"
            type="reset"
            size="small"
            onClick={props.onClose}
          >
            Cancel
          </StyledButton>
          <StyledButton
            color="info"
            size="small"
            variant="contained"
            // onClick={this._handleOk}
            disabled={!formData.name || loading}
            type="submit"
            autoFocus
            sx={{ minWidth: 96, minHeight: 32 }}
          >
            {loading ? <CircularProgress size={16} color="inherit" /> : 'Add'}
          </StyledButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const StyledButton = styled(Button)`
  font-family: quicksand;
  text-transform: none;
`;
