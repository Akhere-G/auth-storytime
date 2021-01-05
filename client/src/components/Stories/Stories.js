import React from "react";
import Story from "./Story/Story";
import styles from "./Stories.module.css";
const Stories = ({ stories, deleteStory, editStory }) => {
  return (
    <>
      {stories.map(story => {
        return (
          <li className={styles.story}>
            <Story
              key={story._id}
              {...story}
              deleteStory={deleteStory}
              editStory={editStory}
            />
          </li>
        );
      })}
    </>
  );
};

export default Stories;
