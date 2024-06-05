import { Backdrop } from "@mui/material";
import React from "react";
import { AspectRatioImg } from "../Image";
function Loading(props: any) {
  return (
    <>
     <Backdrop
            sx={{
              color: "#fff",
              zIndex: 10000,
              backdropFilter: "blur(4px)",
              background: "rgba(0,0,0,0.16)",
              flexDirection: "column",
            }}
            open={props.open}
          >
            <div>
              <img
                style={{ width: 64, height: 64, borderRadius:"100%", objectFit:"cover"}}
                src={`${process.env.PUBLIC_URL}/assets/images/cutepet.png`}
              />
            </div>
          </Backdrop>
    </>
  );
}
export default Loading;
