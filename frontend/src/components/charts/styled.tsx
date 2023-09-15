import styled from '@emotion/styled';
import { ResponsiveContainer } from 'recharts';

export const Container = styled(ResponsiveContainer)`
  .recharts-tooltip-cursor {
    fill: rgba(60, 164, 184, 0.2);
  }
  .recharts-tooltip-wrapper {
    outline: none;
  }
  .recharts-legend-item-text {
    color: #333 !important;
    font-size: 12px;
  }
  .recharts-sector {
    :hover {
      opacity: 0.95;
    }
  }
`;
