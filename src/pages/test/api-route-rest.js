import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Button,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const ApiRouteRest = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const res = await fetch("/api/comments");
    console.log(res);
    const data = await res.json();
    console.log(data);
    setComments(data);
  };

  const submitComment = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("submit comment");
    console.log(data);
  };

  const deleteComment = async (commentId) => {
    console.log("commentId: " + commentId);
    const url = `/api/comments/${commentId}`;
    console.log("url: " + url);
    const res = await fetch(url, {
      method: "DELETE",
    });
    window.res = res;
    console.log(res);
    const data = await res.json();
    console.log("delete comment");
    console.log(data);
    fetchComments();
  };

  return (
    <Stack>
      <Input value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={submitComment}>Submit Comment</Button>
      <Button onClick={fetchComments}>Get Comments</Button>
      <OrderedList>
        {comments.map((comment) => {
          return (
            <ListItem key={v4()}>
              <Text>{comment.text}</Text>
              <Button onClick={() => deleteComment(comment.id)}>Delete</Button>
            </ListItem>
          );
        })}
      </OrderedList>
    </Stack>
  );
};

export default ApiRouteRest;
