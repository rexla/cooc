import React from "react";
import ImageText from "../../pages/welcome/ImageText";

export default {
  title: "Pages/Welcome/ImageText",
  component: ImageText,
  argTypes: {},
};

const Template = (args) => <ImageText {...args} />;

export const Default = Template.bind({});
Default.args = {
  imagePath: "/images/welcome/elementary.png",
  title: "國小課外課程",
};
