import { Typography } from '@mui/material';

export default function Tag(props: { text: string}) {
  return (
    <span
      style={{
        fontFamily: 'quicksand',
        fontSize: '10px',
        fontWeight: '600',
        backgroundColor: '#0e647e',
        color: '#fff',
        borderRadius: '20px',
        padding:"4px 8px",
        marginRight:"5px",
        marginBottom:"5px",
        cursor:"pointer",
      }}
    >
      #{props?.text}
    </span>
  );
}
