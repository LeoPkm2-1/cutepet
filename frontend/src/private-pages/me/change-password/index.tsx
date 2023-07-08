import { useState } from "react";
import { PageTitle } from "../../../components/styled";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { StyledTextField } from "../../../components/FormItem";
import { useSnackbar } from "notistack";
import { FormErrorObj } from "../../../models/form";
import { RootState } from "../../../redux";
import { connect } from "react-redux";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const defaultState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

type Props = ReturnType<typeof mapStateToProps>;

function ChangePasswordPage(props: Props) {
  const [state, setState] = useState<{
    newPassword: string;
    confirmPassword: string;
    currentPassword: string;
  }>(defaultState);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState<FormErrorObj>({});
  const [loading, setLoading] = useState(false);

  function clearError(field: string) {
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  }

  const verifyData = (data: {
    newPassword: string;
    confirmPassword: string;
    currentPassword: string;
  }) => {
    const errors: FormErrorObj = {};
    if (data.currentPassword.length < 6) {
      errors.currentPassword = "You must enter current password.";
    }
    if (data.newPassword.length < 6) {
      errors.newPassword = "Password has at least 6 characters.";
    }
    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Confirm password not matches.";
    }
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

    const errors = verifyData(state);

    if (errors) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    const auth = getAuth();

    const user = auth.currentUser;
    if (!user?.email) {
      return;
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      state.currentPassword
    );
    reauthenticateWithCredential(user, credential)
      .then((userCredential) => {
        return updatePassword(user, state.newPassword);
      })
      .then(() => {
        enqueueSnackbar("Update password success", { variant: "success" });
        setState(defaultState);
      })
      .catch((err) => {
        const code = err.code;
        if (code === "auth/wrong-password") {
          setErrors({
            currentPassword: "Invalid password.",
          });
          return;
        }
        enqueueSnackbar(err?.message ?? "Update password error", {
          variant: "error",
        });
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
            <div className="expanded text text-4 text-bold">
              Change password
            </div>
          </PageTitle>
          <Card>
            <CardContent>
              <Stack onSubmit={handleFormSubmit} component="form" noValidate>
                <StyledTextField
                  fullWidth
                  size="small"
                  label="Current password"
                  name="current-password"
                  type="password"
                  margin="normal"
                  placeholder="Enter current password"
                  color="info"
                  value={state.currentPassword}
                  error={!!errors["currentPassword"]}
                  helperText={errors["currentPassword"]}
                  onChange={(e) => {
                    setState({
                      ...state,
                      currentPassword: e.currentTarget.value,
                    });
                    if (!!errors["currentPassword"]) {
                      clearError("currentPassword");
                    }
                  }}
                  required
                />
                <StyledTextField
                  fullWidth
                  size="small"
                  label="New password"
                  name="new-password"
                  type="password"
                  placeholder="Enter new password"
                  color="info"
                  margin="normal"
                  value={state.newPassword}
                  error={!!errors["newPassword"]}
                  helperText={errors["newPassword"]}
                  onChange={(e) => {
                    setState({
                      ...state,
                      newPassword: e.currentTarget.value,
                    });
                    if (!!errors["newPassword"]) {
                      clearError("newPassword");
                    }
                  }}
                  required
                />
                <StyledTextField
                  fullWidth
                  size="small"
                  label="Confirm password"
                  name="confirm-password"
                  type="password"
                  placeholder="Enter confirm password"
                  color="info"
                  margin="normal"
                  value={state.confirmPassword}
                  error={!!errors["confirmPassword"]}
                  helperText={errors["confirmPassword"]}
                  onChange={(e) => {
                    setState({
                      ...state,
                      confirmPassword: e.currentTarget.value,
                    });
                    if (!!errors["confirmPassword"]) {
                      clearError("confirmPassword");
                    }
                  }}
                  required
                />

                <Button
                  variant="contained"
                  type="submit"
                  color="info"
                  disabled={loading}
                  sx={{
                    textTransform: "none",
                    fontFamily: "inherit",
                    alignSelf: "flex-end",
                    marginTop: 2,
                  }}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  Change password
                </Button>
              </Stack>
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

export default connect(mapStateToProps)(ChangePasswordPage);
