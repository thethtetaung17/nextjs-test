/* eslint-disable */
// const { nextI18NextRewrites } = require('next-i18next/rewrites');

// const localeSubpaths = {};

module.exports = {
    // rewrites: async () => nextI18NextRewrites(localeSubpaths),
    // publicRuntimeConfig: {
    //     localeSubpaths,
    // },
    webpack: (config, { isServer }) => {
        // Fixes packages that depend on fs/module module
        if (!isServer) {
            config.node = { fs: 'empty', module: 'empty' };
        }

        return config;
    },
    images: {
        domains: [
            'cx-devx-cdn-uploaded-images.s3.ap-southeast-1.amazonaws.com',
            'media-exp1.licdn.com',
            'cdn1.vectorstock.com',
            'encrypted-tbn0.gstatic.com',
            'i.dlpng.com',
            'www.pngarts.com'
        ],
    },
};
