import React from "react";

import CoocButton from "../components/CoocButton";

export default {
  title: "Cooc/CoocButton",
  component: CoocButton,
  argTypes: {},
};

const Template = (args) => <CoocButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
