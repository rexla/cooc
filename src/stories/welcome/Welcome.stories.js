import React from "react";

import Welcome from "../../pages/test/fake-login";

export default {
  title: "Pages/Welcome",
  component: Welcome,
  argTypes: {},
};

const Template = (args) => <Welcome {...args} />;

export const Default = Template.bind({});
Default.args = {};
