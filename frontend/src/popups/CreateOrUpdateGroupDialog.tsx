import styled from '@emotion/styled';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { group } from 'console';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { companyApi } from '../api/company';
import Button from '../components/Button';
import { StyledTextField } from '../components/FormItem';
import { Group } from '../models/members';
import { MinuteLabel, StyledSlider } from './styled';

type Props = {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  group?: Group;
  parentGroup?: Group;
  companyId: string;
};

const defaultFormData = {
  name: '',
  description: '',
  target: 5,
};

export default function CreateOrUpdateGroupDialog(props: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    target: number;
  }>(defaultFormData);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.group) {
      setFormData({
        name: props.group?.name,
        description: props.group.description ?? '',
        target: 5,
      });
    }
  }, [props.group]);

  const handleFormSubmitted: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    Promise.resolve()
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        if (props.group) {
          return companyApi
            .putUpdateGroup(props.companyId, props.group.id, formData)
            .then((res) => {
              enqueueSnackbar(`Update group '${formData.name}' success.`, {
                variant: 'success',
              });
              return res;
            });
        }

        if (props.parentGroup) {
          return companyApi
            .postCreateSubGroup(props.companyId, props.parentGroup.id, formData)
            .then((res) => {
              console.log('create sub-group success', res);
              enqueueSnackbar(
                `Create sub group with name '${formData.name}' success.`,
                { variant: 'success' }
              );
              return res;
            });
        }

        // add new group to company
        return companyApi
          .postCreateGroup(props.companyId, formData)
          .then((res) => {
            console.log('create success', res);
            enqueueSnackbar(
              `Create new group with name '${formData.name}' success.`,
              { variant: 'success' }
            );
            return res;
          });
      })
      .then((res) => {
        setLoading(false);
        form.reset();
        props.onSuccess?.();
        props.onClose?.();
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(
          err?.error?.message ?? err?.message ?? 'Action failed.',
          { variant: 'error' }
        );
      });
  };

  return (
    <Dialog
      open={props.open}
      // onClose={this._handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <form
        onReset={() => setFormData(defaultFormData)}
        onSubmit={handleFormSubmitted}
      >
        <DialogTitle sx={{ fontFamily: 'inherit' }}>
          {props.group ? (
            <span>
              Edit: <span className="text-bold">{props.group.name}</span>
            </span>
          ) : props.parentGroup ? (
            'Add sub-group'
          ) : (
            'Create new group'
          )}
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
              name="group-name"
              placeholder="Enter group's name"
              label="Group's name"
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
              name="descriptions"
              placeholder="Enter group's description"
              label="Group's description"
              multiline
              value={formData.description}
              minRows={5}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.currentTarget.value,
                })
              }
              inputProps={{
                maxLength: 255,
              }}
            />
            <span style={{ marginTop: 8 }}>Mindfully Timer target:</span>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mt: 1, mb: 1 }}
              alignItems="center"
            >
              <StyledSlider
                max={30}
                min={1}
                value={formData.target}
                valueLabelFormat={(v) => `${v} mins`}
                // size="small"
                step={1}
                valueLabelDisplay="auto"
                onChange={(e, v) => {
                  setFormData({
                    ...formData,
                    target: v as number,
                  });
                }}
              />
              <MinuteLabel>{formData.target} minutes</MinuteLabel>
            </Stack>
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
            {loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : props.group ? (
              'Update'
            ) : (
              'Create'
            )}
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
