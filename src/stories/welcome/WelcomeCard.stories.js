import React from "react";

import WelcomeCard from "../../pages/welcome/WelcomeCard";

export default {
  title: "Pages/Welcome/WelcomeCard",
  component: WelcomeCard,
  argTypes: {},
};

const Template = (args) => <WelcomeCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imagePath: "/images/welcome/elementary.png",
  title: "國小課外課程",
  text1: "111現正報名項目：",
  text2: "110學年度第一學期國小課外課程",
  text3: "110學年度暑假國小課外課程",
};

export const WithLink = Template.bind({});
WithLink.args = {
  imagePath: "/images/welcome/management.png",
  title: "管理",
  text1: "國小課外課程",
  text2: "活動課程",
  text3: "權限設定",
  link1: "/page/link1",
  link2: "/page/link2",
  link3: "/page/link3",
};
