import { useEffect } from 'react';
import {
  PageContainer,
  PageContentContainer,
  PageHeaderTitle,
  PageTitle,
} from '../../../components/styled';
import DateRangePicker from '../../../components/DateRangePicker';
import Select from '../../../components/Select';
import { Grid, IconButton, SvgIcon } from '@mui/material';
import ChartContainer from '../../../components/ChartContainer';
import { mdiHelpCircleOutline } from '@mdi/js';
import MPieChart from '../../../components/charts/MPieChart';
import MLineChart from '../../../components/charts/MLineChart';
import MBarChart from '../../../components/charts/MBarChart';
import { round } from 'lodash';
import { hourFormat, timeFormat } from '../../../utils/formatter';
import useQuery from '../../../hooks/use-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSearchQuery } from '../../../utils/query';
import { useDateRange, useDateRangeQuery } from '../../../hooks/date-range';
import PopoverSelect from '../../../components/Select/popover-select';

export default function DashboardPage() {
  const query = useQuery();
  const naviagte = useNavigate();
  const { pathname } = useLocation();
  const [, setDefaultDateRange] = useDateRange();

  const dateRange = useDateRangeQuery(query);

  function updateURL(params: {
    keyword?: string;
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
    target?: number;
    team?: number;
  }) {
    naviagte({
      pathname,
      search: createSearchQuery({ ...query, ...params }),
    });
  }

  useEffect(() => {
    document.title = 'Dashboard - Mindfully Partner Portal';
  }, []);
  return (
    <PageContainer>
      <PageTitle>
        <PageHeaderTitle>
          <span>Dashboard</span>
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
        <Grid container spacing={1}>
          <Grid sx ={{
            mt: "16px"
          }} item>
          <PopoverSelect></PopoverSelect>
          </Grid>
          <Grid item>
            <Select
              placeholder="Select target"
              sx={{
                minWidth: 180,
              }}
              fullWidth={false}
              label="Target"
              onChange={(option) => {
                updateURL({
                  target: option?.value as number,
                });
              }}
              value={+(query.target ?? 0)}
              options={[
                {
                  label: 'All Targets',
                  value: 0,
                },
                {
                  label: 'Timer',
                  value: 1,
                },
                {
                  label: 'Sound',
                  value: 2,
                },
                {
                  label: 'Breathe Exercise',
                  value: 3,
                },
                {
                  label: 'Guide',
                  value: 4,
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{
            mt: 2,
          }}
        >
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
                    value: 30,
                    color: 'rgba(20, 173, 165, 0.7)',
                  },
                  {
                    label: 'Incompleted',
                    value: 20,
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
                  <span>Practice Times of Day</span>
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
        </Grid>
      </PageContentContainer>
    </PageContainer>
  );
}
