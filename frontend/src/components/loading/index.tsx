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
                style={{ width: 64, height: 64, borderRadius:"50px", objectFit:"cover"}}
                src={`https://patch.com/img/cdn/users/22839933/2015/01/raw/20150154be78a81dad7.jpg`}
              />
            </div>
          </Backdrop>
    </>
  );
}
export default Loading;
