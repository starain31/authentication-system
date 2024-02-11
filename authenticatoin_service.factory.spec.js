const { create_authentication_service } = require('./authentication_service.factory');
const { create_hash_service } = require('./hash_service.factory');

function create_mock_database_service() {
    const users = {};

    function create_user(params) {
        return users[params.username] = params;
    }

    function get_user(params) {
        return users[params.username];
    }

    return {
        create_user,
        get_user,
    };
}

describe('Service: authenticationService', function () {
    it('should be defined', function () {
        const database_service = create_mock_database_service();
        const hash_service = create_hash_service({ secret: 'mirpur rocks!!!' });
        const authentication_service = create_authentication_service({ database_service, hash_service });

        expect(authentication_service).toBeDefined();
    });

    it('should have a login method', function () {
        const database_service = create_mock_database_service();
        const hash_service = create_hash_service({ secret: 'mirpur rocks!!!' });
        const authentication_service = create_authentication_service({ database_service, hash_service });

        expect(authentication_service.login).toBeDefined();
    });

    it('should have a register method', function () {
        const database_service = create_mock_database_service();
        const hash_service = create_hash_service({ secret: 'mirpur rocks!!!' });
        const authentication_service = create_authentication_service({ database_service, hash_service });

        expect(authentication_service.register).toBeDefined();
    });

    it('should register a user and able to login', function () {
        const database_service = create_mock_database_service();
        const hash_service = create_hash_service({ secret: 'mirpur rocks!!!' });
        const authentication_service = create_authentication_service({ database_service, hash_service });

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
        const hash_service = create_hash_service({ secret: 'mirpur rocks!!!' });
        const authentication_service = create_authentication_service({ database_service, hash_service });

        const username = 'test_user_1';
        const password = 'test_user_1_password';
        const email = '';

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


}); 