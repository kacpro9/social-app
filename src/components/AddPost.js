import "./AddPost.css";
import axios from "axios";
import { useState } from "react";

const AddPost = (props) => {
  const [postContent, setPostContent] = useState("");

  const addPost = (e) => {
    e.preventDefault();

    if (!postContent) {
      return;
    }

    axios
      .post("https://akademia108.pl/api/social-app/post/add", {
        content: postContent,
      })
      .then((res) => {
        props.getPrevPost();
        setPostContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="addPostForm" onSubmit={addPost}>
      <textarea
        placeholder="Add post"
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent}
      ></textarea>
      <button className="btn">Add post</button>
    </form>
  );
};

export default AddPost;
