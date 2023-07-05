import { useEffect, useState } from 'react';
import { PageContainer, PageTitle } from '../../../components/styled';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Switch,
} from '@mui/material';
import {
  Label,
  StyledFormControlLabel,
  StyledTextField,
} from '../../../components/FormItem';
import { AvatarSelect } from '../../../components/ImageSelect';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FormErrorObj } from '../../../models/form';
import userApis from '../../../api/user';
import { AccountTypeNum, User } from '../../../models/user';
import GrowableInputList from '../../../components/GrowableInputList';
import { AspectRatioContainer } from '../../../components/AspectRatio';
import { UserProfile } from '../../../models/user-profile';
import { RootState } from '../../../redux';
import { connect, useDispatch } from 'react-redux';
import { myselfApi } from '../../../api/myself';
import { UserActions } from '../../../redux/user';

const defaultState = {
  aliasName: '',
  displayName: '',
  anonymous: false,
  certificates: [],
  languages: [],
};

type Props = ReturnType<typeof mapStateToProps>;

function ProfilePage(props: Props) {
  const [state, setState] = useState<{
    aliasName: string;
    displayName: string;
    anonymous: boolean;
    avatar?: File;
    email?: string;
    intro?: string;
    age?: number | null;
    title?: string;
    address?: string;
    certificates: string[];
    languages: string[];
  }>(defaultState);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrorObj>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.profile) {
      let certificates: string[] = [];
      let languages: string[] = [];
      try {
        if (props.profile.additionalProp?.certificates) {
          certificates = JSON.parse(props.profile.additionalProp.certificates);
        }
      } catch {
        //
      }
      try {
        if (props.profile.additionalProp?.languages) {
          languages = JSON.parse(props.profile.additionalProp.languages);
        }
      } catch {
        //
      }

      setState({
        aliasName: props.profile.aliasName ?? '',
        displayName: props.profile.displayName ?? '',
        anonymous: props.profile.anonymous ?? false,
        email: props.profile.email ?? '',
        address: props.profile.additionalProp?.address ?? '',
        age: props.profile.age,
        intro: props.profile.additionalProp?.intro ?? '',
        title: props.profile.additionalProp?.title,
        certificates,
        languages,
      });
      return;
    }
    setState(defaultState);
  }, [props.profile]);

  function clearError(field: string) {
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  }

  const verifyData = (data: any) => {
    const errors: FormErrorObj = {};
    if (Object.keys(errors).length) {
      return errors;
    }
    return;
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!props.profile) {
      return;
    }

    const data: Partial<User> = {
      aliasName: state.aliasName,
      displayName: state.displayName,
      age: state.age,
      anonymous: state.anonymous,
      avatar: state.avatar,
      additionalProp: {
        title: state.title,
        intro: state.intro,
        address: state.address,
        certificates: JSON.stringify(
          state.certificates.filter((i) => !!i.trim())
        ),
        languages: JSON.stringify(state.languages.filter((i) => !!i.trim())),
      },
    };

    const errors = verifyData(data);
    if (errors) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    myselfApi
      .patchMySelf(data)
      .then((res) => {
        // @ts-ignore
        dispatch(UserActions.setProfile({ ...props.profile, ...res }));
        console.log(res);

        enqueueSnackbar('Update profile success', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Update profile error', { variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        marginTop: 48,
      }}
    >
      {!props.profile ? (
        <div className="expand centering">
          <CircularProgress />
        </div>
      ) : (
        <>
          <PageTitle>
            <div className="expanded text text-4 text-bold">Profile</div>
          </PageTitle>
          <Card>
            <CardContent>
              <Grid
                container
                spacing={4}
                onSubmit={handleFormSubmit}
                component="form"
                noValidate
              >
                <Grid item xs={12} sm={4} md={3}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Label>
                        <span className="text text-bold text-5">Avatar</span>
                      </Label>
                      <AspectRatioContainer className="mv-16">
                        <AvatarSelect
                          className="aspect-ratio_content"
                          defaultPreview={props.profile.photoURL}
                          onFileChange={(file) =>
                            setState({ ...state, avatar: file })
                          }
                        />
                      </AspectRatioContainer>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Label>
                        <span className="text text-bold text-5">
                          Informations
                        </span>
                      </Label>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        label="Email"
                        name="email"
                        placeholder="Account email"
                        color="info"
                        value={state.email ?? ''}
                        error={!!errors['email']}
                        helperText={errors['email']}
                        onChange={(e) => {
                          setState({
                            ...state,
                            email: e.currentTarget.value,
                          });
                          if (!!errors['email']) {
                            clearError('email');
                          }
                        }}
                        required
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        label="Display name"
                        name="display-name"
                        placeholder="Enter event name"
                        color="info"
                        value={state.displayName}
                        error={!!errors['displayName']}
                        helperText={errors['displayName']}
                        onChange={(e) => {
                          setState({
                            ...state,
                            displayName: e.currentTarget.value,
                          });
                          if (!!errors['displayName']) {
                            clearError('displayName');
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        label="Alias name"
                        name="alias-name"
                        placeholder="Enter event name"
                        color="info"
                        value={state.aliasName}
                        error={!!errors['aliasName']}
                        helperText={errors['aliasName']}
                        onChange={(e) => {
                          setState({
                            ...state,
                            aliasName: e.currentTarget.value,
                          });
                          if (!!errors['aliasName']) {
                            clearError('aliasName');
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        error={!!errors['age']}
                        helperText={errors['age']}
                        onChange={(e) => {
                          setState({
                            ...state,
                            age: +e.currentTarget.value,
                          });
                          if (errors['age']) {
                            clearError('age');
                          }
                        }}
                        size="small"
                        label="Age"
                        name="age"
                        placeholder="0"
                        color="info"
                        type="number"
                        inputProps={{
                          min: 0,
                        }}
                        value={state.age ?? ''}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledFormControlLabel
                        style={{ width: 'auto' }}
                        labelPlacement="start"
                        control={
                          <Switch
                            color="success"
                            name="anonymous"
                            checked={state.anonymous}
                            onChange={(e, checked) => {
                              setState({ ...state, anonymous: checked });
                              if (errors['anonymous']) {
                                clearError('anonymous');
                              }
                            }}
                          />
                        }
                        label="Anonymous"
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      // md={6}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        color="info"
                        disabled={loading}
                        sx={{
                          textTransform: 'none',
                          fontFamily: 'inherit',
                        }}
                        startIcon={loading && <CircularProgress size={20} />}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(ProfilePage);
