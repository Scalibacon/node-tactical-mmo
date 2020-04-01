const app = require('./app');
const PORT = 80;

const server = app.listen(PORT, () => console.log(`Servidor ON na porta ${PORT}`) );