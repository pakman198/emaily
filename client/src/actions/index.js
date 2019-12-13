import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

// export const fetchUser = () => {

//   return dispatch => {
//     axios.get('/api/current_user')
//     .then(res => {
//       console.log({ res })
//       dispatch({ type: FETCH_USER, res })
//     })
//     .catch(err => {
//       
//     });
//   }
// } 

export const fetchUser = () => async dispatch => {
  try {
    const user = await axios.get('/api/current_user');
    
    dispatch({ type: FETCH_USER, payload: user.data })
  } catch(err) {
    console.log({ err })
  }
}

export const handleToken = (token) => async dispatch => {
  try {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch(err) {
    console.log({ err })
  }
}

export const submitSurvey = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/surveys', values);
  
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/surveys')
  } catch(err) {
    console.log({ err });
  }
}

export const fetchSurveys = () => async dispatch => {
  try {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  } catch(err) {
    console.log({ err });
  }
}