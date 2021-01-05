import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useErrors = type => {
  const newError = useSelector(state => state.error);
  const [error, setError] = useState({ id: null, msg: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    setError(prev => {
      switch (newError.id) {
        case type:
          return { id: newError.id, msg: newError.msg };
        default:
          return {
            id: null,
            msg: "",
          };
      }
    });
  }, [newError, dispatch, type]);

  return error;
};
