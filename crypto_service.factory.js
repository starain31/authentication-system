const { createHmac, randomBytes } = require('node:crypto');

function create_crypto_service({ secret, auth_token_lenght }) {

    function hash_password(password) {
        const hash = createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        return hash;
    }

    function create_random_token() {
        return randomBytes(auth_token_lenght).toString('hex');
    }

    return {
        hash_password,
        create_random_token,
    };
}

module.exports = {
    create_crypto_service,
};