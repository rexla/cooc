import React from "react";
import PropTypes from "prop-types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Input,
  Box,
} from "@chakra-ui/react";

const InputPassword = ({ id, name, register }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        placeholder="請輸入密碼"
        {...register(`${name}`)}
      />
      <InputRightElement width="3.5rem">
        <IconButton
          h="1.75rem"
          backgroundColor={"white"}
          size="sm"
          aria-label="View"
          onClick={handleClick}
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
};
InputPassword.propTpyes = {
  id: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.object,
};
InputPassword.defaultProps = {
  id: "password",
  name: "password",
};
export default InputPassword;
