import React from "react";

import CoocLogo from "../components/CoocLogo";

export default {
  title: "Cooc/CoocLogo",
  component: CoocLogo,
  argTypes: {},
};

const Template = (args) => <CoocLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
