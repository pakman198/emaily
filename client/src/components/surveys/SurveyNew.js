import React, { useState } from 'react';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [ formReview, setFormReview ] = useState(false);
  const [ formData, setFormData ] = useState({});

  const surveySubmit = (formValues) => {
    setFormReview(true);
    setFormData(formValues);
  }

  const displayView = () => {
    if(!formReview) {
      return (
        <SurveyForm 
          onSurveySubmit={surveySubmit} 
          formData={formData}
        />
      );
    }

    return (
      <SurveyFormReview 
        onCancel={() => setFormReview(false)} 
        formValues={formData}
      />
    );
  }

  return (
    <div>
      { displayView() }
    </div>
  );
}

export default SurveyNew;