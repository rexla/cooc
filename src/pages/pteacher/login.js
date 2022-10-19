import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import CoocLink from "../../components/CoocLink";
import InputPassword from "../../components/InputPassword";
import { requestPTeacherLogin } from "../../lib/Api";
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
import { useAppContext } from "../../contexts/AppContext";

const logger = new Logger("/pteacher/login");

const PLoginHeader = () => {
  const ssoUrl =
    "https://cooc.tp.edu.tw/oauth/authorize?response_type=code&client_id=59dab00f7875c65975cc3926799b74431c418fbc&redirect_uri=https%3A%2F%2Factregister.tp.edu.tw%3A443%2Fapi%2FfromcoocToken&scope=User.Info,User.Role,User.SSORole,User.IDNumber";
  return (
    <div>
      <p className="mt-10 mb-5 text-2xl font-bold">酷課雲報名系統</p>
      <div className="flex">
        <span className="text-sm">台北市親師生請由</span>
        <CoocLink url={ssoUrl} text={"單一身份認證帳號登入"} />
      </div>
      <p className="font-pf text-sm">進入酷課雲後點選報名系統</p>
    </div>
  );
};
const PLoginCenter = () => {
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
      <p className="text-2xl font-bold">校外教師登入</p>
    </div>
  );
};

const schema = yup.object().shape({
  phone: yup.string().length(10, "請輸入10位數手機號碼").required("必填"),
  password: yup.string().required("必填"),
});

const testTeachers = [
  { name: "陳曉東", phone: "0928123666", password: "173669" },
  { name: "王美花", phone: "0928123999", password: "568505" },
];

const PLoginForm = ({ setIsLogin }) => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onError = (errors) => {
    logger.warn("onError", errors);
  };
  const onSubmit = async (values) => {
    logger.debug("submitForm", values);

    await pteacherLogin(values);
    await delay(1000);
  };
  /*
    resData 表示就是200 一定是成功
    catch 表示401
     1.用戶不存在
     2.密碼錯誤
  */
  async function pteacherLogin({ phone, password }) {
    try {
      let resData = await requestPTeacherLogin(phone, password, logger);
      logger.debug("pteacherLogin success", resData);

      // 第一次登陸
      if (resData.IsDefaultPassword) {
        router.push({
          pathname: "/pteacher/email-verifier",
          query: {
            partTimeTeacherId: resData.PartTimeTeacherId,
            randomKey: resData.SetEmailRandomKey,
          },
        });
        // 本學期未授課
      } else if (resData.Identity.Roles.length === 0) {
        toast.error("本學期未授課");
      } else {
        setUser(resData);
        localStorage.setItem("cooc-user", JSON.stringify(resData));
        router.push("/");
      }
    } catch (em) {
      logger.debug("pteacherLogin fail", em);
      toast.error(em);
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
          <FormLabel htmlFor="password">密碼</FormLabel>
          <InputPassword
            id={"password"}
            name={"password"}
            register={register}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <div className="h-1"></div>
        <div className="flex justify-end">
          <Button
            type="button"
            colorScheme={"primary"}
            size="xs"
            variant="link"
            onClick={() => setIsLogin(false)}
          >
            忘記密碼
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
          登入
        </Button>
      </form>
    </Box>
  );
};

const PteacheLogin = ({ setIsLogin }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-col items-center justify-center text-center">
        <PLoginHeader />
        <PLoginCenter />
        <PLoginForm setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default PteacheLogin;
