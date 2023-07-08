import { useSelector } from "react-redux";
import { RootState } from "../redux";

export function useProfile() {
  const profile = useSelector((state: RootState) => state.user.profile);
  return profile;
}
