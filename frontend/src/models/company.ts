export interface Company {
  name: string;
  admins: number[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  logoURL: string;
  id: string;
}

export interface Option {
  label: string;
  value: number | string;
  items?: Option[];
}