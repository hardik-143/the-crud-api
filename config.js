const DATABASEURL = process.env.DATABASEURL || 'mongodb://localhost:27017/tododb';
const PORT = process.env.PORT || 9000;

export { DATABASEURL, PORT };