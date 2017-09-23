#Go to the different nodejs directories and "npm install" the local package.json

echo " "
echo "--- NPM INSTALL this mess please ---"
echo " "

cd ../ethermediary/ethermediary_web/nodejs/
npm install
cd ..
cd ..
cd ../ethermediary/ethermediary_api/
npm install

echo " "
echo "--- Package installed ! ---"
echo " "
