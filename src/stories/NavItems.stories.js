import React from "react";

import NavItems from "../components/NavItems";

export default {
  title: "Cooc/NavItems",
  component: NavItems,
  argTypes: {},
};

const Template = (args) => <NavItems {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};
