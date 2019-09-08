import process from 'process';

type conf = { USERS: { [index: string]: string }; PORT: string };

const CONFIG: conf = {
  PORT: process.env.PORT || '4444',
  USERS: {
    boaz: 'password',
  },
};

export { conf };
export default CONFIG;
