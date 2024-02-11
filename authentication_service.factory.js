function create_authentication_service({ database_service, crypto_service }) {
    function register(params) {
        const password_hash = crypto_service.hash_password(params.password);

        database_service.create_user({
            username: params.username,
            password: password_hash,
            email: params.email,
        });

        return true;
    }

    function login(params) {
        const { username, password } = params;

        const user = database_service.get_user({ username });

        if (!user) {
            throw new Error('Invalid username');
        }

        const password_hash = crypto_service.hash_password(params.password);

        if (user.password !== password_hash) {
            throw new Error('Invalid password');
        }

        const auth_token = crypto_service.create_random_token();

        database_service.save_token({ username, auth_token });

        return auth_token;
    }

    function authenticate({ auth_token }) {
        const user = database_service.get_user_by_token({ auth_token });

        if (!user) {
            throw new Error('Invalid token');
        }

        return true;
    }

    return {
        login,
        register,
        authenticate,
    };
}

module.exports = {
    create_authentication_service,
};