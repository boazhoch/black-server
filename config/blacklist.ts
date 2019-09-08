type blackList = {
  sourceUser: string;
  sourceIP: string;
  destHostname: string;
  destPort: number;
  destMethod: string;
};

const blackList = [
  {
    sourceUser: 'admin',
    sourceIP: '127.0.0.1',
    destHostname: 'localhost',
    destPort: 5501,
    destMethod: 'GET',
  },
];

export { blackList };
export default blackList;
