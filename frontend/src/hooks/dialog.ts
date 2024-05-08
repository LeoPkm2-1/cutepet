import { uniqueId } from "lodash";
import { useCallback, useContext } from "react";
import { ConfirmDialogOption, Context } from "../context/DialogContext";

export function useShowDialog() {
  const { addDialog } = useContext(Context);
  return useCallback(
    (option: ConfirmDialogOption) => {
      option.key = option.key ?? uniqueId("confirm-dialog-");
      addDialog(option);
    },
    [addDialog]
  );
}
