module.exports = {
  servers: {
    one: {
      host: '128.199.102.73',
      username: 'root',
      // pem:
      password: 'ansonb06iatd',
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'rachel_fyp',
    path: '../',
    docker: {
      //image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base', // use this image if using Meteor 1.4+
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://rachel_fyp.net',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 600
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
