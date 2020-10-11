const app = require('./app')
const http = require('http')
const config = require('./utils/configs')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT || 3003
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})
