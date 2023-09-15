import { mdiHelpCircleOutline } from '@mdi/js';
import { Grid, IconButton, SvgIcon } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  PageContainer,
  PageContentContainer,
  PageHeaderTitle,
  PageTitle,
} from '../../../../components/styled';
import { AccountType } from '../../../../models/user';
import useQuery from '../../../../hooks/use-query';
import qs from 'query-string';
import DateRangePicker from '../../../../components/DateRangePicker';
import moment, { Moment } from 'moment';
import { DateRange } from '@mui/lab';
import { Member } from '../../../../models/members';
import { companyApi } from '../../../../api/company';
import { MemberName } from './styled';
import Button from '../../../../components/Button';
import ChartContainer from '../../../../components/ChartContainer';
import MPieChart from '../../../../components/charts/MPieChart';
import MLineChart from '../../../../components/charts/MLineChart';
import MBarChart from '../../../../components/charts/MBarChart';
import { hourFormat, timeFormat } from '../../../../utils/formatter';
import { round } from 'lodash';
import { createSearchQuery } from '../../../../utils/query';
import { useDateRange, useDateRangeQuery } from '../../../../hooks/date-range';

export default function MemberReportPage() {
  const { pathname } = useLocation();
  const params = useParams();
  const naviagte = useNavigate();
  const query = useQuery();
  const [list, setList] = useState<Member[]>([]);
  const ref = useRef<number>();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(query.keyword);
  const accountType =
    (query.account_type as AccountType) ?? AccountType.Standard;
  const [, setDefaultDateRange] = useDateRange();

  const dateRange = useDateRangeQuery(query);
  useEffect(() => {
    document.title = 'Member Report - Mindfully Partner Portal';
  }, []);

  function updateURL(params: {
    keyword?: string;
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
  }) {
    naviagte({
      pathname,
      search: createSearchQuery({ ...query, ...params }),
    });
  }

  useEffect(() => {
    if (query.keyword !== text) {
      setText(query.keyword);
    }
    setLoading(true);
    // membersApi
    //   .getGroups({
    //     accountType,
    //     limit: 20,
    //     page: +(query.page ?? 1),
    //     search: query.keyword?.toString(),
    //   })
    //   .then(setList)
    //   .catch((err) => {
    //     setList([]);
    //     // if (err?.error?.code === "ENTITY_NOT_FOUND") {
    //     // }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [query.keyword, query.page, accountType]);

  const handleSearch = (value: string) => {
    setText(value);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = window.setTimeout(() => {
      updateURL({ keyword: value, page: 1 });
      ref.current = undefined;
    }, 200);
  };

  return (
    <PageContainer>
      <PageTitle>
        <PageHeaderTitle>
          <span>Members</span>
          <span className="secondary-title mh-8">| Report</span>
        </PageHeaderTitle>
        <DateRangePicker
          value={dateRange}
          onChange={([startDate, endDate]) => {
            updateURL({
              start_date: startDate?.unix().toString(),
              end_date: endDate?.unix().toString(),
            });
            setDefaultDateRange({ startDate, endDate });
          }}
        />
      </PageTitle>
      <PageContentContainer>
        <MemberName>
          Nguyen Van A<span className="email-text">(nguyenvana@gmail.com)</span>
        </MemberName>
        <Button
          color="success"
          size="small"
          style={{
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          (View user infomation)
        </Button>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <ChartContainer
              minHeight={350}
              header={
                <>
                  <span>Ratio of practice time with Mindful Timer</span>
                  <IconButton size="small">
                    <SvgIcon fontSize="small">
                      <path d={mdiHelpCircleOutline} />
                    </SvgIcon>
                  </IconButton>
                </>
              }
            >
              <MPieChart
                data={[
                  {
                    label: 'Completed',
                    value: 50,
                    color: '#14ADA6',
                  },
                  {
                    label: 'Half-completed',
                    value: 45,
                    color: 'rgba(20, 173, 165, 0.7)',
                  },
                  {
                    label: 'Incompleted',
                    value: 5,
                    color: 'rgba(20, 173, 165, 0.5)',
                  },
                ]}
              />
            </ChartContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartContainer
              minHeight={350}
              header={
                <>
                  <span>Ratio of practice time with Mindful Timer</span>
                  <IconButton size="small">
                    <SvgIcon fontSize="small">
                      <path d={mdiHelpCircleOutline} />
                    </SvgIcon>
                  </IconButton>
                </>
              }
            >
              <MLineChart
                indexKey="date"
                tooltipValueFormatter={(m, name, item) => {
                  // const key = name.toString();
                  // return [m + 'm'];
                  return m + 'm';
                }}
                yTickFormatter={(m) => m + 'm'}
                references={[
                  {
                    key: 'target1',
                    color: '#14ADA6',
                    value: 8,
                    label: '(target 1)',
                  },
                  {
                    key: 'target2',
                    color: '#BA36CF',
                    value: 2.5,
                    label: '(target 2)',
                  },
                ]}
                lines={[
                  {
                    key: 'value1',
                    color: '#14ADA6',
                  },
                  {
                    key: 'value2',
                    color: '#BA36CF',
                  },
                ]}
                data={[
                  {
                    date: '01-09-2022',
                    value1: 6,
                    value2: 2,
                  },
                  {
                    date: '02-09-2022',
                    value1: 8,
                    value2: 2.2,
                  },
                  {
                    date: '03-09-2022',
                    value1: 4,
                    value2: 2.5,
                  },
                  {
                    date: '04-09-2022',
                    value1: 5,
                    value2: 1.25,
                  },
                  {
                    date: '06-09-2022',
                    value1: 7,
                    value2: 3,
                  },
                  {
                    date: '07-09-2022',
                    value1: 8.5,
                    value2: 2.9,
                  },
                ]}
              />
            </ChartContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartContainer
              minHeight={350}
              header={
                <>
                  <span>Ratio of practice time with Mindful Timer</span>
                  <IconButton size="small">
                    <SvgIcon fontSize="small">
                      <path d={mdiHelpCircleOutline} />
                    </SvgIcon>
                  </IconButton>
                </>
              }
            >
              <MBarChart
                indexKey="hour"
                tooltipValueFormatter={(m) => m + ' mins'}
                tooltipLabelFormatter={timeFormat}
                xTickFormatter={(v) => hourFormat(v)}
                yTickFormatter={(min) => round(min / 60, 1) + 'h'}
                bars={[
                  {
                    key: 'duration',
                    color: '#14ADA6',
                  },
                ]}
                data={[
                  {
                    hour: 0,
                    duration: 2,
                  },
                  {
                    hour: 1,
                    duration: 7,
                  },
                  {
                    hour: 2,
                    duration: 11,
                  },
                  {
                    hour: 3,
                    duration: 13,
                  },
                  {
                    hour: 4,
                    duration: 17,
                  },
                  {
                    hour: 5,
                    duration: 19,
                  },
                  {
                    hour: 6,
                    duration: 23,
                  },
                  {
                    hour: 7,
                    duration: 31,
                  },
                  {
                    hour: 8,
                    duration: 37,
                  },
                  {
                    hour: 9,
                    duration: 43,
                  },
                  {
                    hour: 10,
                    duration: 53,
                  },
                  {
                    hour: 11,
                    duration: 67,
                  },
                  {
                    hour: 12,
                    duration: 71,
                  },
                  {
                    hour: 13,
                    duration: 59,
                  },
                  {
                    hour: 14,
                    duration: 47,
                  },
                  {
                    hour: 15,
                    duration: 37,
                  },
                  {
                    hour: 16,
                    duration: 31,
                  },
                  {
                    hour: 17,
                    duration: 29,
                  },
                  {
                    hour: 18,
                    duration: 23,
                  },
                  {
                    hour: 19,
                    duration: 17,
                  },
                  {
                    hour: 20,
                    duration: 11,
                  },
                  {
                    hour: 21,
                    duration: 9,
                  },
                  {
                    hour: 22,
                    duration: 7,
                  },
                  {
                    hour: 23,
                    duration: 5,
                  },
                ]}
              />
            </ChartContainer>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <ChartContainer minHeight={350}></ChartContainer>
          </Grid> */}
        </Grid>
      </PageContentContainer>
    </PageContainer>
  );
}
