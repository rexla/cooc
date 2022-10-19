import React from "react";

import TextOrLink from "../../pages/welcome/TextOrLink";

export default {
  title: "Pages/Welcome/TextOrLink",
  component: TextOrLink,
  argTypes: {},
};

const Template = (args) => <TextOrLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "國小課外課程",
};

export const WithLink = Template.bind({});
WithLink.args = {
  text: "國小課外課程",
  link: "/page/link1",
};
