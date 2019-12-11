import React from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

import FIELDS from './formFields';

const SurveyForm = ({ onSurveySubmit, formData }) => {
  const { 
    register,
    handleSubmit,
    formState,
    errors
  } = useForm({ mode: 'onBlur' });

  const submitHandler = formValues => {
    console.log({ formValues });
    console.log({ errors, formState }, formState.isValid);
    
    onSurveySubmit(formValues);
  }

  const renderFields = () => {
    return FIELDS.map(({ name, label, validation }) => {
      return (
        <SurveyField 
          name={name} 
          label={label} 
          key={name} 
          register={register}
          validation={validation}
          error={errors}
          defaultValue={formData[name]}
        />
      );
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        { renderFields() }
        <Link to="/surveys" className="red darken-2 btn-flat white-text">Cancel</Link>
        <button type="submit" className="teal right btn-flat white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;