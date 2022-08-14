import React from 'react';

export default React.createContext({
  token: undefined,
  userId: undefined,
  login: (token, userId, te) => {},
  logout: () => {},
});
