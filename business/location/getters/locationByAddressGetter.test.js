const locationByAddressGetter = require('./locationByAddressGetter')

test('should return Rio de Janeiro lat/lon', async () =>{

    const result = await locationByAddressGetter.get('Rio de Janeiro');

    expect(result.latitude).toEqual(-22.9068467)
    expect(result.longitude).toEqual(-43.1728965)

})