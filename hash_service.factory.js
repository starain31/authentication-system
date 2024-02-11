const { createHmac } = require('node:crypto');

function create_hash_service({ secret}) {
    
    function hash_password(password) {
        const hash = createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        return hash;
    }

    return {
        hash_password,
    };
}

module.exports = {
    create_hash_service,
};