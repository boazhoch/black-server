type conf = { USERS: { [index: string]: string } };

const CONFIG: conf = {
  USERS: {
    boaz: 'password',
  },
};

export { conf };
export default CONFIG;
