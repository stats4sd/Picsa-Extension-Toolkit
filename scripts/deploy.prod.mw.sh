# deploy script for malawi.picsa.app domain (mw version)
firebase use production

echo 'Deploy Malawi Version';

# deploy
firebase deploy --only hosting:picsa-malawi