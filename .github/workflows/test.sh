files=(tests/cypress/integration/**/*)
 matrix=$((
   echo '{ "containers" : ['
   echo '"data_string",'
    for key in "${!files[@]}"
    do
      comma=","
      if [ ${files[$key]} == ${files[${#files[@]}-1]} ]; then
        comma=""
      fi
      echo "${files[$key]#*/*/*/*}${comma}"| sed 's/ /, /g'  | sed -r 's/^([^,]*)(,?)$/"\1"\2/'
    done

   echo " ]}"
 ) | jq -c .)
echo $matrix
echo $matrix | jq .
echo "::set-output name=matrix::$matrix"
