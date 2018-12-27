module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ],
    };
};
