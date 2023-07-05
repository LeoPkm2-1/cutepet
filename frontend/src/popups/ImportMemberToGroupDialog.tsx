import styled from '@emotion/styled';
import { mdiClose, mdiDelete, mdiFile } from '@mdi/js';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SvgIcon,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import { companyApi } from '../api/company';
import Button from '../components/Button';
import FileSelector from '../components/FileSelector';
import { StyledTextField } from '../components/FormItem';
import Table from '../components/Table';
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

export default function ImportMemberToGroupDialog(props: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    target: number;
  }>(defaultFormData);
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | undefined>();
  const [data, setData] = useState<any[]>([]);
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

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (!file) {
        setData([]);
        return;
      }
      const reader = new FileReader();

      reader.onload = function (progressEvent) {
        try {
          const arr = JSON.parse(reader.result as string);
          if (Array.isArray(arr)) {
            setData(arr);
            return;
          }
          throw new Error('File format is invalid.');
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = function (e) {
        reject(new Error('Cannot read file.'));
      };
      reader.readAsText(file);
    });
  }, [file]);

  // const data = useMemo(() =>{
  //   if(!file){
  //     return [];
  //   }
  // }, [file])

  return (
    <Dialog open={props.open} maxWidth="xs" fullWidth>
      <form
        onReset={() => {
          setFile(undefined);
        }}
        onSubmit={handleFormSubmitted}
      >
        <DialogTitle sx={{ fontFamily: 'inherit' }}>
          <span>
            Import members to{' '}
            <span className="text-bold">{props.group?.name}</span>
          </span>
        </DialogTitle>
        <DialogContent>
          <div
            className="text col"
            // style={{
            //   overflow: 'hidden',
            // }}
          >
            {!file ? (
              <FileSelector
                accept=".json"
                id="import-members"
                onFileChange={setFile}
              />
            ) : (
              <>
                <div className="row">
                  <div className="expanded">
                    Selected file: <b>{file.name}</b>
                  </div>
                  <IconButton
                    size="small"
                    style={{ marginLeft: 4 }}
                    // color="error"
                  >
                    <SvgIcon fontSize="inherit">
                      <path d={mdiDelete} />
                    </SvgIcon>
                  </IconButton>
                </div>
                <div>Preview:</div>
                <div>
                  <Table
                    columns={[
                      {
                        key: 'name',
                        dataKey: 'name',
                        label: 'Name',
                      },
                      {
                        key: 'email',
                        dataKey: 'email',
                        label: 'Email',
                      },
                    ]}
                    dataSource={data}
                    rowKey={(r: any) => r.email}
                  />
                </div>
              </>
            )}
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
