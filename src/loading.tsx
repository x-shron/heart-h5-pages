import React from "react";
import { SpinLoading } from "antd-mobile";

export default () => {
  return (
    <div style={{ height: "50vh",  display: "flex", justifyContent: "center",alignItems: "center" }}>
      <SpinLoading style={{ '--size': '48px' }} color='primary' />
    </div>
  );
};
