import { comments } from "../../../data/comments";

export default function handler(req, res) {
  const { commentId } = req.query;
  console.log("req.query commentId: " + commentId);
  if (req.method === "GET") {
    const comment = comments.find(
      (comment) => comment.id === parseInt(commentId)
    );
    res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    const deleteComment = comments.find((comment) => {
      return comment.id === parseInt(commentId);
    });

    const index = comments.findIndex((comment) => {
      return comment.id === parseInt(commentId);
    });

    comments.splice(index, 1);
    console.log("deleteComment");
    console.log(deleteComment);
    res.status(200).json(deleteComment);
  }
}
