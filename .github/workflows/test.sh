files=(tests/cypress/integration/**/*)
 matrix=$(
    for key in "${!files[@]}"
    do
      comma=","
      if [ ${files[$key]} == ${files[${#files[@]}-1]} ]; then
        comma=""
      fi
      echo "${files[$key]#*/*/*/*}${comma}" | sed -r 's/^([^,]*)(,?)$/"\1"\2/'
    done
 )
echo $matrix
echo "::set-output name=matrix::[$matrix]"
