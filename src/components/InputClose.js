import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
} from "@chakra-ui/react";

const InputClose = ({ onChange }) => {
  const [value, setValue] = React.useState("");
  const handleClick = () => {
    setValue("");
    onChange("");
  };

  return (
    <InputGroup size="md">
      <Input
        type={"text"}
        placeholder="請輸入教師姓名"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          onChange(newValue);
        }}
      />
      <InputRightElement width="3.5rem">
        <IconButton
          h="1.75rem"
          borderRadius={"100%"}
          backgroundColor={"cooc-text-gray"}
          size="sm"
          aria-label="View"
          onClick={handleClick}
          icon={<CloseIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
};
InputClose.propTpyes = {};
InputClose.defaultProps = {};
export default InputClose;
