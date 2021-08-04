import React from "react";
import Title from "antd/lib/typography/Title";

interface MainTitleProps {
  children: string;
}

function MainTitle(props: MainTitleProps) {
  return (
    <Title style={{ textAlign: "center", margin: "20px 0" }}>
      {props.children}
    </Title>
  );
}

export default MainTitle;
