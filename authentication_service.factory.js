function create_authentication_service({ database_service }) {
    function register(params) {
        return true;
    }

    function login(params) {
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