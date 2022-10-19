import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, Box, VStack, HStack, Center } from "@chakra-ui/react";
import Image from "next/image";
import CoocLink from "../components/CoocLink";

const Custom404 = (props) => {
  return (
    <VStack spacing="24px" h={"100%"}>
      <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize="4xl">404 Not Found</Text>
      </Flex>
      <Flex
        flex={1}
        w={[24, 32, 40]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="/images/orange-sit-bird.png" // Route of the image file
          height={300} // Desired size with correct aspect ratio
          width={300} // Desired size with correct aspect ratio
          alt="404"
        />
      </Flex>

      <Flex flex={1} direction={"column"}>
        <Text fontSize="sm">請點選上方圖案回到首頁，或是</Text>
        <CoocLink text="校外教師登入" url="/pteacher/login" />
      </Flex>
    </VStack>
  );
};

Custom404.propTypes = {};

export default Custom404;
