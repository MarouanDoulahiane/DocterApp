// useAuth.js

import { useContext } from 'react';
import AuthContext from './AuthContext'; // Import AuthContext as default

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
