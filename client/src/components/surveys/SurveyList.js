import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchSurveys } from '../../actions';

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector(state => state.surveys);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch])

  const renderSurveys = () => {
    if(!surveys.length) return;

    return surveys.reverse().map(survey => {
      return (
        <div key={survey._id} className="card grey lighten-2">
          <div className="card-content">
            <span className="card-title">{ survey.title }</span>
            <p>{ survey.body }</p>
            <p className="right">
              Sent on: { new Date(survey.dateSent).toLocaleDateString() }
            </p>
          </div>
          <div className="card-action">
            <a href="#" className="text-black">Yes: { survey.yes }</a>
            <a href="#" className="text-black">No: { survey.no }</a>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      { renderSurveys() }
    </div>
  )
}

export default SurveyList;