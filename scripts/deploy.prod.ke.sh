# deploy script for kenya.picsa.app domain (ke version)
firebase use production

echo 'Deploy Kenya Version';

# deploy
firebase deploy --only hosting:picsa-kenya