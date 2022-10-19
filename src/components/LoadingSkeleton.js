import React from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Stack margin={"30px"}>
      <Box marginBottom={"30px"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>

      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />

      <Box>
        <Skeleton marginTop={"30px"}>
          <div>contents wrapped</div>
          <div>{"won't be visible"}</div>
        </Skeleton>
      </Box>
    </Stack>
  );
};

export default LoadingSkeleton;
