import { mdiClose, mdiPlus } from "@mdi/js";
import { Button, IconButton, SvgIcon } from "@mui/material";
import { StyledTextField } from "../FormItem";

type P = {
  items: string[];
  onChange?: (items: string[]) => void;
  emptyText?: string;
};

export default function GrowableInputList({ items, onChange, emptyText }: P) {
  return (
    <div className="col mv-8">
      {!items.length ? (
        <i className="mv-4 text text-small">{emptyText ?? "Empty"}</i>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="row mv-4">
            <StyledTextField
              className="expanded"
              size="small"
              color="info"
              value={item}
              autoFocus={!item}
              placeholder="Enter value"
              onChange={(e) => {
                const list = [...items];
                list[idx] = e.currentTarget.value;
                onChange?.(list);
              }}
            />
            <IconButton
              className="mv-4"
              size="small"
              onClick={() => {
                const list = [...items];
                //@ts-ignore
                list[idx] = undefined;
                onChange?.(list.filter((i) => typeof i !== "undefined"));
              }}
            >
              <SvgIcon>
                <path d={mdiClose} />
              </SvgIcon>
            </IconButton>
          </div>
        ))
      )}
      <Button
        style={{ marginRight: 34 }}
        onClick={() => {
          onChange?.([...items, ""]);
        }}
      >
        <SvgIcon>
          <path d={mdiPlus} />
        </SvgIcon>
      </Button>
    </div>
  );
}
