import React from "react";
import { useTab } from "@chakra-ui/react";

const CoocTab = React.forwardRef((props, ref) => {
  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps["aria-selected"];

  // 2. Hook into the Tabs `size`, `variant`, props
  // const styles = useMultiStyleConfig("Tabs", tabProps);

  return (
    <button {...tabProps} className="relative mr-10 h-[30px] pl-3">
      <p
        className={`text-xl transition-colors ${
          isSelected ? "text-black" : "text-cooc-footer-text"
        }`}
      >
        {tabProps.children}
      </p>
      <div className="absolute bottom-0 left-0 -z-10 h-3 w-full pr-2">
        <div
          className={`h-full w-full transition-colors ${
            isSelected ? "bg-cooc-tab-green" : "bg-cooc-tab-green-inactive"
          }`}
        ></div>
      </div>
    </button>
  );
});
CoocTab.displayName = "CoocTab";
export default CoocTab;
