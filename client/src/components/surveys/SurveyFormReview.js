import React from 'react';
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

import FIELDS from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, history }) => {
  const dispatch = useDispatch();
  
  const userInputs = FIELDS.map(({ label, name }) => {
    return (
      <div key={label}>
        <label>{ label }</label>
        <div>{ formValues[name] }</div>
      </div>
    );
  });
  

  return (
    <div>
      <h5>Confirmation page</h5>
      { userInputs }
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={() => onCancel() }
      >
        Back
      </button>
      <button 
        className="green btn-flat right white-text"
        onClick={() => dispatch(actions.submitSurvey(formValues, history))}
      >
        Confirm
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

export default withRouter(SurveyFormReview);