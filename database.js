let connection;

async function connect() {
    const Sequelize = require('sequelize');
    const config = require('./config');

    let sequelize;
    while (!sequelize) {
        try {
            sequelize = new Sequelize(config.postgresDB, config.postgresUser, config.postgresPassword, {
                host: config.postgresHostname,
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },

                // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
                operatorsAliases: false
            });
        } catch (err) {
            console.error(err.message);
            console.log('Waiting 10 seconds');
            await new Promise((r) => setTimeout(r, 10 * 1000));
        }
    }

    // Create entity user
    const Score = sequelize.define('score', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        highScore: Sequelize.INTEGER
    });

    // Export entities
    return {
        sequelize,
        Score
    };
}

module.exports = {
    async getConnection() {
        if (!connection) {
            connection = await connect();
        }

        return connection;
    }
}
