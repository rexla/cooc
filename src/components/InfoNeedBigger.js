import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, Box, VStack, HStack, Center } from "@chakra-ui/react";
import Image from "next/image";

const InfoNeedBigger = (props) => {
  return (
    <VStack h={"100%"}>
      <Flex
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Image
          src="/images/orange-sit-bird.png" // Route of the image file
          height={130}
          width={130}
          alt="InfoNeedBigger"
        />
        <Text fontSize="md" marginTop={"5"}>
          為確保功能操作流暢
        </Text>
        <Text fontSize="md">請使用電腦或8吋以上平板進行操作</Text>
      </Flex>
    </VStack>
  );
};

InfoNeedBigger.propTypes = {};

export default InfoNeedBigger;
