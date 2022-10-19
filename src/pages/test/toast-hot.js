import React, { useState, useEffect } from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

import { Toaster, toast, resolveValue } from "react-hot-toast";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { delay } from "../../lib/delay";

const ToastHot = ({ cookies }) => {
  return (
    <Stack margin={"30px"}>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => toast.success("Hello World", { id: "pageToast" })}
      >
        Simple Toast
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => toast.custom(<div>Hello World</div>)}
      >
        Custom Toast
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => toast.loading("Waiting...")}
      >
        Loading
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() =>
          toast.promise(delay(1000), {
            loading: "Loading",
            success: "Got the data",
            error: "Error when fetching",
          })
        }
      >
        Promise Simple Usage
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() =>
          toast.promise(
            delay(1000),
            {
              loading: "Loading",
              success: (data) => `Successfully saved ${data.name}`,
              error: (err) => `This just happened: ${err.toString()}`,
            },
            {
              style: {
                minWidth: "250px",
              },
              success: {
                duration: 5000,
                icon: "🔥",
              },
            }
          )
        }
      >
        Promise Advanced Usage ... 怪怪的
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() =>
          toast(
            (t) => (
              <span>
                Custom and <b>bold</b>
                <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
              </span>
            ),
            {
              icon: <TriangleDownIcon />,
            }
          )
        }
      >
        with button
      </Button>
    </Stack>
  );
};
export default ToastHot;
