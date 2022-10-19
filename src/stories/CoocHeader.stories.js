import React from "react";

import CoocProfile from "../components/CoocProfile";
import CoocLogo from "../components/CoocLogo";
import CoocHeader from "../components/CoocHeader";

export default {
  title: "Cooc/CoocHeader",
  component: CoocHeader,
  argTypes: {},
};

const Template = (args) => <CoocHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <CoocLogo />
      <CoocProfile onClick={() => console.log("test coocprofile click")} />
    </>
  ),
};
