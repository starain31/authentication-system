const { create_authentication_service } = require('./authentication_service.factory');
const { create_crypto_service } = require('./crypto_service.factory');

const AUTH_TOKEN_LENGHT = 256;
const SECRET = 'mirpur rocks!!!';

function create_mock_database_service() {
    const users = {};

    function create_user(params) {
        return users[params.username] = params;
    }

    function get_user(params) {
        return users[params.username];
    }

    function save_token(params) {
        const { username, auth_token } = params;

        users[username].auth_token = auth_token;
    }

    function get_user_by_token({ auth_token }) {
        for (const username in users) {
            if (users[username].auth_token === auth_token) {
                return users[username];
            }
        }

        return null;
    }

    return {
        create_user,
        get_user,
        save_token,
        get_user_by_token,
    };
}

describe('Service: authenticationService', function () {
    it('should be defined', function () {
        const database_service = create_mock_database_service();
        const authentication_service = create_authentication_service({ database_service });

        expect(authentication_service).toBeDefined();
    });

    it('should have a login method', function () {
        const database_service = create_mock_database_service();
        const authentication_service = create_authentication_service({ database_service });

        expect(authentication_service.login).toBeDefined();
    });

    it('should have a register method', function () {
        const database_service = create_mock_database_service();
        const authentication_service = create_authentication_service({ database_service });

        expect(authentication_service.register).toBeDefined();
    });

    it('should register a user and able to login', function () {
        const database_service = create_mock_database_service();
        const crypto_service = create_crypto_service({ secret: SECRET, auth_token_lenght: AUTH_TOKEN_LENGHT });
        const authentication_service = create_authentication_service({ database_service, crypto_service });

        const username = 'test_user_1';
        const password = 'test_user_1_password';
        const email = 'test@test.com';

        const register_params = {
            username,
            password,
            email,
        };

        const result = authentication_service.register(register_params);

        expect(result).toBe(true);

        const login_params = {
            username,
            password,
        };

        const login_result = authentication_service.login(login_params);

        expect(typeof login_result).toBe('string');
    });

    it('should not log in with invalid credentials', function () {
        const database_service = create_mock_database_service();
        const crypto_service = create_crypto_service({ secret: SECRET, auth_token_lenght: AUTH_TOKEN_LENGHT });
        const authentication_service = create_authentication_service({ database_service, crypto_service });

        const username = 'test_user_1';
        const password = 'test_user_1_password';
        const email = 'test_user_1@test.com';

        const register_params = {
            username,
            password,
            email,
        };

        const result = authentication_service.register(register_params);

        const wrong_login_params = {
            username,
            password: 'wrong_password',
        };

        expect(function () {
            authentication_service.login(wrong_login_params);
        }).toThrow();
    });

    it('should authenticate a user with auth_token', function () {
        const database_service = create_mock_database_service();
        const crypto_service = create_crypto_service({ secret: SECRET, auth_token_lenght: AUTH_TOKEN_LENGHT });
        const authentication_service = create_authentication_service({ database_service, crypto_service });
        token
        const username = 'test_user_1';
        const password = 'test_user_1_password';
        const email = 'test_user_1@test.com';

        const register_params = {
            username,
            password,
            email,
        };

        authentication_service.register(register_params);

        const login_params = {
            username,
            password,
        };

        const auth_token = authentication_service.login(login_params);

        const authenticate_result = authentication_service.authenticate({ auth_token });

        expect(authenticate_result).toBe(true);
    });

}); 