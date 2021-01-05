import React from "react";
import styles from "./Form.module.css";
import { Link } from "react-router-dom";

const Form = ({
  onSubmit,
  formGroups,
  title,
  submitText,
  linkPath,
  linkText,
  errorText,
}) => {
  return (
    <form
      className='card'
      onSubmit={e => {
        onSubmit(e);
      }}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {errorText && <p className={styles.error}>{errorText}</p>}
      {formGroups.map((formGroup, index) => {
        return (
          <div key={index} className={styles.formGroup}>
            <label htmlFor={formGroup.labelText}>{formGroup.labelText}</label>
            <input
              type={formGroup.inputType}
              id={formGroup.labelText}
              value={formGroup.inputValue}
              onChange={e => {
                formGroup.setValue(e.target.value);
              }}
              ref={formGroup.inputRef}
            />
          </div>
        );
      })}

      <div className={styles.link}>
        <Link to={linkPath}>{linkText}</Link>
      </div>
      <div className={styles.formBtnGroup}>
        <button className='btn btn-primary' type='submit'>
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default Form;
