import React from 'react';

const SurveyField = ({ label, name, defaultValue, register, validation, error }) => {
  return (
    <div>
      <label>{ label }</label>
      <input 
        type="text" 
        name={name} 
        ref={register(validation)} 
        style={{ marginBottom: '5px' }}
        defaultValue={defaultValue}
      />
      <div className="red-text text-darken-2" style={{ marginBottom: '20px' }}>
        { error[name] && error[name].message }
      </div>
    </div>
  );
}

export default SurveyField;