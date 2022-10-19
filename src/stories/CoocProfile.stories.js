import React from "react";

import CoocProfile from "../components/CoocProfile";
import { AppProvider } from "../contexts/AppContext";

export default {
  title: "Cooc/CoocProfile",
  component: CoocProfile,
  decorators: [(story) => <AppProvider>{story()}</AppProvider>],
  argTypes: {
    // backgroundColor: { control: "color" },
  },
};

const Template = (args) => <CoocProfile {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const ArrowSizeSmall = Template.bind({});
ArrowSizeSmall.args = {
  arrowSize: "small",
};
export const UsernameAndSchool = Template.bind({});
UsernameAndSchool.args = {
  username: "Zest",
  school: "NTUT",
};
