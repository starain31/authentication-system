function auth_handler(req, res) {
    const auth_token = req.headers['authorization'];

    if (!auth_token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const user = authentication_service.get_user_by_auth_token({ auth_token });

    if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    req.user = user;
    next();
}