type blackList = {
  sourceUser: string;
  sourceIP: string;
  destHostname: string;
  destPort: string;
  destMethod: string;
};

// blacklist policy.

const blackList = [
  {
    sourceUser: 'admin',
    sourceIP: '::ffff:127.0.0.1',
    destHostname: '127.0.0.1',
    destPort: '5000',
    destMethod: 'GET',
  },
];

export { blackList };
export default blackList;
