import axios from 'axios';

import { FETCH_USER } from './types';

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