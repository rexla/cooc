import React from "react";

import MyTemplate from "../components/MyTemplate";

export default {
  title: "Example/MyTemplate",
  component: MyTemplate,
  argTypes: {},
};

const Template = (args) => <MyTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {};
