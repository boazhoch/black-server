import process from 'process';

type conf = { PORT: string };

const CONFIG: conf = {
  PORT: process.env.PORT || '4444',
};

export { conf };
export default CONFIG;
