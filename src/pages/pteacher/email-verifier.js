import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Flex,
  Text,
  Stack,
  Box,
  FormErrorMessage,
  Center,
  FormControl,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Logger from "../../lib/Logger";
import { delay } from "../../lib/delay";
import { requestSetEmail } from "../../lib/Api";
import toast from "react-hot-toast";

const logger = new Logger("/pteacher/email-verifier");

const EmailVerifier = (props) => {
  const { query } = useRouter();
  logger.debug("query", query);

  const schema = yup.object().shape({
    emailVerify: yup.string().email("請輸入信箱").required("必填"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onError = (errors) => {
    logger.debug("onError", errors);
  };
  const onSubmit = async (values) => {
    logger.debug("submitForm", values);

    await setEmail(values);
    await delay(1000);
  };

  async function setEmail({ emailVerify }) {
    try {
      let resData = await requestSetEmail(
        parseInt(query.partTimeTeacherId),
        parseInt(query.randomKey),
        emailVerify,
        logger
      );

      logger.debug("setEmail succuss", resData);
      toast.success("已送出驗證信");
    } catch (em) {
      toast.error(em);
      logger.debug("setEmaiil failed", em);
    }
  }

  return (
    <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
      <Stack spacing={3} marginTop={10}>
        <Text align={"center"} textStyle={"h1"}>
          酷課雲報名系統
        </Text>
        <Text align={"center"} textStyle={"h1"}>
          校外教師入口信箱驗證
        </Text>
      </Stack>
      <Stack marginTop={10}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormControl isInvalid={errors.emailVerify}>
            <FormLabel htmlFor="emailVerify">
              請輸入您的電子信箱，我們將寄送驗證連結至此信箱
            </FormLabel>
            <Input
              id="emailVerify"
              type="emailVerify"
              placeholder="請輸入信箱"
              {...register("emailVerify")}
            />
            <FormErrorMessage>{errors.emailVerify?.message}</FormErrorMessage>
          </FormControl>

          <Box h={8} />
          <Center>
            <Button
              type={"submit"}
              colorScheme={"primary"}
              w={"36"}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              送出
            </Button>
          </Center>
        </form>
      </Stack>
    </Flex>
  );
};

EmailVerifier.propTypes = {};

export default EmailVerifier;
