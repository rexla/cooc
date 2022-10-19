import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { requestSendEmail } from "../../lib/Api";
import Logger from "../../lib/Logger";
import { useRouter } from "next/router";
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
import { delay } from "../../lib/delay";

const logger = new Logger("/pteacher/forget-password");

const ForgetPasswordHeader = () => {
  return (
    <div>
      <p className="mt-10 mb-5 text-2xl font-bold">酷課雲報名系統</p>
    </div>
  );
};
const ForgetPasswordCenter = () => {
  return (
    <div className="flex-co10 mb-5">
      <div className="mt-5 mb-5">
        <Image
          src="/images/pteacher-login.png" // Route of the image file
          height={120} // Desired size with correct aspect ratio
          width={120} // Desired size with correct aspect ratio
          alt="臺北市政府教育局 Logo"
        />
      </div>
      <p className="text-2xl font-bold">忘記密碼</p>
    </div>
  );
};

const schema = yup.object().shape({
  phone: yup.string().length(10, "請輸入10位數手機號碼").required("必填"),
  email: yup.string().email("請輸入電子信箱").required("必填"),
});

const ForgetPasswordForm = ({ setIsLogin }) => {
  // const appContext = useAppContext();
  // const [user, setUser] = appContext.userState;
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onError = (errors) => {
    logger.warn("onError", errors);
  };
  const onSubmit = async (values) => {
    logger.debug("submitForm", values);

    await sendEmail(values);
    await delay(1000);
  };
  async function sendEmail({ phone, email }) {
    try {
      let resData = await requestSendEmail(phone, email, logger);

      logger.debug("sendEmail succuss", resData);
      toast.success("已送出驗證信");
    } catch (em) {
      toast.error(em);
      logger.debug("sendEmail failed", em);
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl isInvalid={errors.phone}>
          <FormLabel htmlFor="phone">帳號</FormLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="請輸入手機號碼"
            {...register("phone")}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <div className="h-5"></div>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="email">信箱</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="請輸入電子信箱"
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <div className="h-1"></div>
        <div className="flex justify-end">
          <Button
            type="button"
            colorScheme={"primary"}
            size="xs"
            variant="link"
            onClick={() => setIsLogin(true)}
          >
            返回登入頁
          </Button>
        </div>
        <div className="h-6" />
        <Button
          type="submit"
          colorScheme={"primary"}
          w={"36"}
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          送出
        </Button>
      </form>
    </Box>
  );
};

const PTeacherForgetPassword = ({ setIsLogin }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-col items-center justify-center text-center">
        <ForgetPasswordHeader />
        <ForgetPasswordCenter />
        <ForgetPasswordForm setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default PTeacherForgetPassword;
