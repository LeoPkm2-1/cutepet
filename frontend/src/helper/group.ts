import { async } from '@firebase/util';
import { companyApi } from '../api/company';
import { Option } from '../models/company';

function findOption(path: string[], options: Option[]) {
  const leng = path.length;
  let newOption: Option | undefined = options?.find(
    (element) => element.value == path[0]
  );
  for (let i = 1; i < leng; i++) {
    if (i == leng - 1) {
      break;
    }
    newOption = newOption?.items?.find((element) => element.value == path[i]);
  }
  return newOption;
}
export async function getDataGroups(){
   return await companyApi
    .getAllGroups('632b9d47e75825a76ffe5164')
    .then((allGroups: any) => {
      if (allGroups) {
        const dataOption: Option[] = [{
            label: "All Teams",
            value: "/",
            items: [],
        }];
        allGroups.forEach((group: any) => {
          if (!group?.deleted) {
            if (group?.path.length === 1) {
              dataOption.push({
                value: group.id,
                label: group.name,
                items: [],
              });
            } else {
              if (findOption(group.path, dataOption)) {
                findOption(group.path, dataOption)?.items?.push({
                  value: group.id,
                  label: group.name,
                  items: [],
                });
              }
            }
          }
        });
        return dataOption;
      }
    });
}
