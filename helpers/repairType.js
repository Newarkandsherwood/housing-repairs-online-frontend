const communalRepairType =  'Communal';
const tenantRepairType =  'Tenant';
const leaseholdRepairType =  'Leasehold';

export function getRepairType(data) {
  var result = tenantRepairType;
  if(data['communal'] === 'yes'){
    result = communalRepairType
  } else{
    if(data['isTenant'] === 'no' || undefined){
      result = leaseholdRepairType
    }
  }
  return result;
}

export function isCommunalRepairType(data) {
  return getRepairType(data) === communalRepairType
}

export function isTenantRepairType(data) {
  return getRepairType(data) === tenantRepairType
}
