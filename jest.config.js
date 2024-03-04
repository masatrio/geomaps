module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
    },
    transformIgnorePatterns: [
        "/node_modules/(?!react-globe\\.gl)"
    ]
};
