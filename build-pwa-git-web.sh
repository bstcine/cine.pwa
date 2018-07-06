if [ ${PWD##*/} != "cine.pwa" ];
  then
  echo "please run at cine.pwa."
  exit 2
fi
echo "npm install start..."
cnpm install
echo "npm install done"
npm run-script prod
echo "npm prod done"
if [ ! -d "../cine.web" ];
  then
  echo "not find cine.web."
  exit 3
fi
cd ../cine.web
echo "update cine.web git code start..."
git pull origin master
echo "update cine.web git code done."
rm -rf webapp
mkdir webapp
cp -R ../cine.pwa/build/* ./webapp
git add webapp
git commit -m 'webapp'
git push origin master:master
echo "build cine.pwa to cine.web git commit done"
