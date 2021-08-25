module.exports = {
  setting: {
    jwtKey: 'my_secret_key',
    jwtExpirySeconds: '30d',
    jwtExpiryMilleSeconds: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hrs * 60 mins * 60 secs
  },
  keyoptions: {
    algorithm: 'HS256',
    expiresIn: '30d',
  },
};
