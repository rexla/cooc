import React from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { delay } from "../../lib/delay";
import {
  Flex,
  Text,
  Stack,
  Box,
  VStack,
  HStack,
  Center,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputPassword from "../../components/InputPassword";
import Logger from "../../lib/Logger";
import { useRouter } from "next/router";
import { requestPassword } from "../../lib/Api";

const logger = new Logger("/pteacher/change-password");

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
      "密碼格式需包含英文及數字且至少設定8碼以上"
    )
    .required("必填"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "需與上欄一致"),
});

const ChangePassword = (props) => {
  const router = useRouter();
  const query = router.query;
  logger.debug("query", query);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);

  const onError = (errors) => {
    logger.debug("onError", errors);
  };
  const onSubmit = async (values) => {
    logger.debug("submitForm", values);
    await changePassword(values);
    await delay(1000);
  };

  async function changePassword(values) {
    try {
      let resData = await requestPassword(
        parseInt(query.PartTimeTeacherId),
        parseInt(query.RandomKey),
        values.password,
        logger
      );
      logger.debug("pteacherLogin success", resData);
      toast.success("變更密碼成功");
      router.push("/pteacher/login");
      await delay(1000);
    } catch (em) {
      logger.debug("pteacherLogin fail", em);
      toast.error(em);
    }
  }

  return (
    <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
      <Stack spacing={3} marginTop={10}>
        <Text align={"center"} textStyle={"h1"}>
          酷課雲報名系統
        </Text>
        <Text align={"center"} textStyle={"h1"}>
          校外教師入口變更密碼
        </Text>
      </Stack>
      <Stack marginTop={10}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">請輸入新密碼</FormLabel>
            {/* <FormHelperText marginBottom={2}>
              密碼格式須為8個字符以上的英數組合，不含特殊符號
            </FormHelperText> */}
            <InputPassword
              id={"password"}
              name={"password"}
              register={register}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Box h={5} />
          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">請再次確認密碼</FormLabel>
            {/* <FormHelperText marginBottom={2}>需與上欄一致</FormHelperText> */}
            <InputPassword
              id={"confirmPassword"}
              name={"confirmPassword"}
              register={register}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Box h={8} />
          <Center>
            <Button
              type={"submit"}
              colorScheme={"primary"}
              w={"36"}
              isLoading={isSubmitting}
            >
              確認變更
            </Button>
          </Center>
        </form>
      </Stack>
    </Flex>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
