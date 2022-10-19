import React from "react";

import NavItem from "../components/NavItem";

export default {
  title: "Cooc/NavItem",
  component: NavItem,
  argTypes: {},
};

const Template = (args) => <NavItem {...args} />;

export const First = Template.bind({});
First.args = {
  imagePath: "/images/navbar/report-check.png",
  text: "報名",
  arrow: "up",
  isFontLight: false,
};

export const Second = Template.bind({});
Second.args = {
  text: "國小課外課程",
  arrow: "up",
};
export const Third = Template.bind({});
Third.args = {
  text: "共通設定",
  isThird: true,
};
