const { create_authentication_service } = require('./authentication_service.factory');

function create_mock_database_service() { }

describe('Service: authenticationService', function () {
    let authentication_service;

    beforeAll(function () {
        const database_service = create_mock_database_service();
        authentication_service = create_authentication_service({ database_service });
    });

    it('should be defined', function () {
        expect(authentication_service).toBeDefined();
    });

    it('should have a login method', function () {
        expect(authentication_service.login).toBeDefined();
    });

    it('should have a register method', function () {
        expect(authentication_service.register).toBeDefined();
    });

    it('should register a user and able to login', function () {
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

}); 