if [ ${PWD##*/} != "cine.pwa2" ];
  then
  echo "please run at cine.pwa2."
  exit 2
fi
echo "npm install start..."
cnpm install
echo "npm install done"
npm run-script ${1:-'dev'}
echo "npm prod done"
if [ ! -d "build" ];
  then
  echo "not build dir."
  exit 3
fi
if [ ! -d "../cine.web" ];
  then
  echo "not find cine.web."
  exit 4
fi
cd ../cine.web
echo "update cine.web git code start..."
git pull origin master
echo "update cine.web git code done."
rm -rf webapp
mkdir webapp
cp -R ../cine.pwa2/build/* ./webapp
git add webapp
git commit -m 'webapp'
git push origin master:master
echo "build cine.pwa to cine.web git commit done"