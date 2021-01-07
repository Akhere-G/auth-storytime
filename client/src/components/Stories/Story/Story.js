import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../api";
import { returnErrors } from "../../../actions/errorActions";
import { authTypes } from "../../../actions/types";
import styles from "./Story.module.css";
import { formatDistance } from "date-fns";

const getTimeFrom = date => {
  try {
    return formatDistance(new Date(date), new Date());
  } catch (err) {
    return "A few moments ago";
  }
};

const Story = ({
  _id,
  userId,
  title,
  message,
  tags,
  date,
  deleteStory,
  editStory,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [owner, setOwner] = useState(null);

  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.user._id);
  const isCurrentUser = currentUserId === userId;
  useEffect(() => {
    const getUser = async id => {
      try {
        const userId = await id;
        const { data: user } = await api.getUser(userId);
        setOwner(user);
      } catch (err) {
        const response = await err.response;
        dispatch(returnErrors(response.data.msg, response.status));
        dispatch({ type: authTypes.AUTH_ERROR });
        setOwner(null);
      }
    };
    if (userId) {
      getUser(userId);
    }

    return () => {};
  }, [dispatch, setOwner, userId]);

  return (
    <div className={`${styles.story} ${isHidden ? styles.hide : styles.show}`}>
      <header
        className={`${styles.header} ${
          isCurrentUser ? styles.currentUserHeader : ""
        }`}
      >
        {owner ? <h2>{owner.name}</h2> : <div className={styles.loader}></div>}
        <p>{getTimeFrom(date)}</p>
      </header>
      <div className={styles.body}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
        </div>

        <footer className={styles.footer}>
          <p className={styles.tags}>
            {tags.map(t => `#${t.trim()}`).join(" ")}
          </p>

          {isCurrentUser && (
            <div className={styles.buttons}>
              <button
                className={styles.editBtn}
                onClick={() => {
                  editStory(_id, { title, message, tags, _id, userId });
                }}
              >
                edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  setIsHidden(true);
                  setTimeout(() => {
                    deleteStory(_id);
                  }, 500);
                }}
              >
                delete
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Story;
