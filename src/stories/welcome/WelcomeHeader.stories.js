import React from "react";

import WelcomeHeader from "../../pages/welcome/WelcomeHeader";

export default {
  title: "Pages/Welcome/WelcomeHeader",
  component: WelcomeHeader,
  argTypes: {},
};

const Template = (args) => <WelcomeHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};
