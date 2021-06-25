start=`date +%s`
npm run prettify

npm run build;
rm -rf webapp_swabx.tgz;
tar -zcvf webapp_swabx.tgz build;

end=`date +%s`
runtime=$((end-start))
echo "$runtime"
