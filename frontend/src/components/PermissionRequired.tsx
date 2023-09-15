import React from "react";
import { useProfile } from "../hooks/user";
import { AccountType, numToAccountType } from "../models/user";

type Props = {
  replaceEl?: React.ReactNode;
  accountTypes: AccountType[];
};

const PermissionRequired: React.FC<Props> = ({
  children,
  replaceEl,
  accountTypes,
}) => {
  const accountType = numToAccountType(useProfile()?.accountType);
  let hasPermission = true;
  if (accountTypes.length > 0) {
    hasPermission = accountType ? accountTypes.includes(accountType) : false;
  }
  return <>{hasPermission ? children : replaceEl}</>;
};

export default PermissionRequired;
