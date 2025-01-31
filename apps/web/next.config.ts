import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'ko77xaoqa4.ufs.sh',
        port: '',
        pathname: '/**',
      },

    ]
  }
};

export default withSerwist(nextConfig);