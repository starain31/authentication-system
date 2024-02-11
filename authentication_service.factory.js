function create_authentication_service({ database_service }) {
    function register(params) {
        database_service.create_user(params);
        return true;
    }

    function login(params) {
        const user = database_service.get_user(params);
        if (!user) {
            throw new Error('Invalid username');
        }

        if (user.password !== params.password) {
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