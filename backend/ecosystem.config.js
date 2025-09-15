require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF = 'origin/master',
  REPOSITORY_URL,
  DEPLOY_PATH,
  FILE,
  KEY,
} = process.env;

module.exports = {
  apps: [{
    name: 'be-app',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPOSITORY_URL,
      path: DEPLOY_PATH,
      key: KEY,
      'pre-deploy-local': `scp ${FILE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
