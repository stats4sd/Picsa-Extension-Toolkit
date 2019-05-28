# deploy script for next.picsa.app domain (mw version)
firebase use staging

echo 'Preparing Staging Resources';

# deploy
firebase deploy --only hosting:picsa-staging