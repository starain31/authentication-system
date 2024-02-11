function create_authentication_service({ database_service, hash_service }) {
    function register(params) {
        const password_hash = hash_service.hash_password(params.password);

        database_service.create_user({
            username: params.username,
            password: password_hash,
            email: params.email,
        });

        return true;
    }

    function login(params) {
        const user = database_service.get_user(params);
        if (!user) {
            throw new Error('Invalid username');
        }

        const password_hash = hash_service.hash_password(params.password);

        if (user.password !== password_hash) {
            throw new Error('Invalid password');
        }
        return "token";
    }

    return {
        login,
        register,
    };
}

module.exports = {
    create_authentication_service,
};