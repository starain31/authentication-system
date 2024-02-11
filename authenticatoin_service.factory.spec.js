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
}); 