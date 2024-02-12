const { MongoClient, ServerApiVersion } = require("mongodb");

async function create_database_service(params) {
    const { uri, database_name } = params;



    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        const database = client.db(database_name);

        const users = database.collection('users');

        function create_user(params) {
            users.insertOne(params);
        }

        function get_user(params) {
            return users.findOne({ username: params.username });
        }


        function save_token(params) {
            const { username, auth_token } = params;

            users.updateOne({ username }, { $set: { auth_token } });
        }

        function get_user_by_token({ auth_token }) {
            return users.findOne({ auth_token });
        }

        return {
            create_user,
            get_user,
            save_token,
            get_user_by_token,
        };
    } catch (e) {
        console.error(e);
        await client.close();
        throw new Error('Error connecting to database');
    }
}

module.exports = { create_database_service };