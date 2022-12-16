describe('PostTenantOrLeaseholdPropertyRepairChangeAppointmentSlotGateway', () => {
  let mockPostRequest;
  let TenantOrLeaseholdPropertyRepairChangeAppointmentSlotGateway;

  beforeAll(() => {
    mockPostRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data:'The repair has successfully been changed' }));
    TenantOrLeaseholdPropertyRepairChangeAppointmentSlotGateway = require('../../../api/gateways/TenantOrLeaseholdPropertyRepairChangeAppointmentSlotGateway')(mockPostRequest);
  });

  test('api gets called appropriately', async () => {
    var body = JSON.stringify({
      startDateTime: 'appointmentStartDateTime',
      endDateTime: 'appointmentEndDateTime',
      display : 'appointmentDisplay'
    })
    const result = await TenantOrLeaseholdPropertyRepairChangeAppointmentSlotGateway(body, 'LN1 3AT','RepairId');

    expect(mockPostRequest).toHaveBeenCalledWith(
      {
        uri:  '/repair/tenantOrLeaseholdPropertyRepairChangeAppointmentSlot?postcode=LN1 3AT&repairId=RepairId',
        body: body
      }
    )
    expect(result).toEqual('The repair has successfully been changed')
  });
});
