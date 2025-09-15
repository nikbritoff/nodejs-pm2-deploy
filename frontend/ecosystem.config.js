require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF = 'origin/master',
  REPOSITORY_URL,
  DEPLOY_PATH,
  KEY,
} = process.env;


console.log(DEPLOY_HOST);

module.exports = {
  apps: [{
    name: 'fe-app',
    script: './build/index.html',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPOSITORY_URL,
      path: DEPLOY_PATH,
      key: KEY,
      'post-deploy': 'cd frontend && npm i && npm run build',
    },
  },
};
