const app = require('./app');
const { info } = require('./utils/logger');

const port = require('./utils/config').PORT;

app.listen(port, () => info(`Server running on port ${port}`));
             