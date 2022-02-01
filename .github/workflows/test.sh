files=(tests/cypress/integration/**/*)

data_string="${files[*]#*/*/*}"
echo ""
echo '---'

echo "::set-output name=list::${data_string//${IFS:0:1}/,}"
