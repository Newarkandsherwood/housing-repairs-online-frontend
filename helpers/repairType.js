export function getRepairType(data) {
  var result = 'Tenant';
  if(data['communal'] === 'yes'){
    result = 'Communal'
  } else{
    if(data['isTenant'] === 'no' || undefined){
      result = 'Leasehold'
    }
  }
  return result;
}
