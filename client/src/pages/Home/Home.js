import React, { useState, useEffect, useRef } from "react";
import { Form, Stories } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as storyActions from "../../actions/storyActions";
import * as formActions from "../../actions/formActions";
import * as authActions from "../../actions/authActions";
import { formActionTypes } from "../../actions/types";
import { Head } from "../../components";

import styles from "./Home.module.css";
const Home = () => {
  const stories = useSelector(state => state.stories);
  const form = useSelector(state => state.form);

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [storyData, setStoryData] = useState({
    title: "",
    message: "",
    tags: [],
  });

  const titleRef = useRef(null);

  useEffect(() => {
    dispatch(authActions.loadUser());
    dispatch(storyActions.getStories());
  }, [dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    if (!storyData.title || !storyData.title.trim()) {
      setErrorMsg("Please add a title");
      return;
    } else if (!storyData.message || !storyData.message.trim()) {
      setErrorMsg("Please add a message");
      return;
    } else if (!storyData.tags) {
      setErrorMsg("Please add some tags");
      return;
    }
    setErrorMsg("");

    if (form.mode === formActionTypes.ADD_MODE) {
      const newStory = storyData;
      dispatch(storyActions.addStory(newStory));
    } else {
      const newStory = { ...storyData, _id: form.currentStory._id };
      dispatch(storyActions.updateStory(form.currentStory._id, newStory));
      dispatch(formActions.switchToAddMode());
    }
    clearForm();
  };

  const clearForm = () => {
    setStoryData({
      title: "",
      message: "",
      tags: [],
    });
  };

  const deleteStory = _id => {
    dispatch(storyActions.deleteStory(_id));
  };

  const editStory = (_id, storyData) => {
    dispatch(formActions.switchToEditMode(_id, storyData));
    setStoryData({
      title: storyData.title,
      message: storyData.message,
      tags: storyData.tags,
    });
    window.scrollTo({ top: 0, behaviour: "smooth" });
    setTimeout(() => {
      titleRef.current.focus();
    }, 400);
  };

  const formProps = {
    formGroups: [
      {
        labelText: "Title",
        inputType: "text",
        inputValue: storyData.title,
        setValue: val => {
          setStoryData(prev => ({
            ...prev,
            title: val,
          }));
        },
        inputRef: titleRef,
      },
      {
        labelText: "Message",
        inputType: "text",
        inputValue: storyData.message,
        setValue: val => {
          setStoryData(prev => ({
            ...prev,
            message: val,
          }));
        },
        inputRef: null,
      },
      {
        labelText: "Tags - separate with commas",
        inputType: "text",
        inputValue: storyData.tags,
        setValue: val => {
          setStoryData(prev => ({
            ...prev,
            tags: val.split(","),
          }));
        },
        inputRef: null,
      },
    ],
    onSubmit,
    title:
      form.mode === formActionTypes.ADD_MODE
        ? "Add a story"
        : "Update an story",
    submitText:
      form.mode === formActionTypes.ADD_MODE ? "Add a story" : "Update a story",
    linkPath: "/",
    linkText: "",
    errorText: errorMsg,
  };

  return (
    <section className='section'>
      <Head title='Storytime | Home' />
      <ul className={styles.home}>
        <li className={styles.form}>
          <Form {...formProps} {...form} />
        </li>

        <Stories
          stories={stories}
          deleteStory={deleteStory}
          editStory={editStory}
        />
      </ul>
    </section>
  );
};

export default Home;
