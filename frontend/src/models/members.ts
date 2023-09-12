export interface Group {
  id: string;
  name: string;
  description?: string;
  numberOfMembers: number;
  percentPracticed: number;
  createdAt: string;
  target: number;
  deleted?: boolean;
  subGroups?: Group[];
  members?: Member[];
  path: string[];
  practicedReportByTimersGM?: number[];
  practicedReportByTimersMT?: number[];
  practicedReportByTimersSM?: number[];
  practicedReportByTimersBE?: number[];
  latestUpdatedByTimer: string;
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  userId: number;
  deleted: boolean;
  createdAt: string;
  lastLogined: string;
  percentPracticed: number;
}
