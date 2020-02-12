module.exports = {
    port: process.env.PORT || 3000,
  secret: 'sweetholysecret',
  expireTime: `${24*10}h`,
  db: {
    url: 'mongodb://localhost/site_database'
  },
}