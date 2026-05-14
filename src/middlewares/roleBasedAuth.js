const roleBasedAuth = (role) => (req, res, next) => {
    try {
        if (req.user.roles.includes(role)) return next()
        res.status(401).json({ message: "Access denied." })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export default roleBasedAuth;