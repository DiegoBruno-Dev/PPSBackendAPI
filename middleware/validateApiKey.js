const validateApiKey = (req, res, next) => {
    const apiKey = req.header('api_key'); 

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
    }

    next();
};

module.exports = validateApiKey;
