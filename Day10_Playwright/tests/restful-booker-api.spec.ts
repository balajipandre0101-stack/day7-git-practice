
import { test, expect } from '@playwright/test';

const baseUrl = 'https://restful-booker.herokuapp.com';


// TEST 1: Get all booking IDs
test('API - Get all booking IDs', async ({ request }) => {

    const response = await request.get(`${baseUrl}/booking`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);

    console.log('Total bookings:', responseBody.length);

});


// TEST 2: Create a booking
test('API - Create a booking', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.bookingid).toBeTruthy();
    expect(responseBody.booking.firstname).toBe('Balaji');
    expect(responseBody.booking.lastname).toBe('Tester');
    expect(responseBody.booking.totalprice).toBe(1500);

    console.log('Created Booking ID:', responseBody.bookingid);

});


// TEST 3: Get booking by ID
test('API - Get booking by ID', async ({ request }) => {

    // Create a booking first
    const createResponse = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    // Get the created booking
    const response = await request.get(`${baseUrl}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.firstname).toBe('Balaji');
    expect(responseBody.lastname).toBe('Tester');
    expect(responseBody.totalprice).toBe(1500);

    console.log('Retrieved Booking ID:', bookingId);

});


// TEST 4: Update a booking
test('API - Update a booking', async ({ request }) => {

    // Create a booking
    const createResponse = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    // Generate authentication token
    const authResponse = await request.post(`${baseUrl}/auth`, {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;

    // Update the booking
    const updateResponse = await request.put(
        `${baseUrl}/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            },
            data: {
                firstname: 'Balaji',
                lastname: 'QAEngineer',
                totalprice: 2000,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-12-10',
                    checkout: '2026-12-15'
                },
                additionalneeds: 'Lunch and Breakfast'
            }
        }
    );

    expect(updateResponse.status()).toBe(200);

    const updatedBooking = await updateResponse.json();

    expect(updatedBooking.firstname).toBe('Balaji');
    expect(updatedBooking.lastname).toBe('QAEngineer');
    expect(updatedBooking.totalprice).toBe(2000);
    expect(updatedBooking.additionalneeds).toBe('Lunch and Breakfast');

    console.log('Updated Booking ID:', bookingId);

});


// TEST 5: Delete a booking
test('API - Delete a booking', async ({ request }) => {

    // Create a booking
    const createResponse = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    // Generate authentication token
    const authResponse = await request.post(`${baseUrl}/auth`, {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;

    // Delete the booking
    const deleteResponse = await request.delete(
        `${baseUrl}/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );

    expect(deleteResponse.status()).toBe(201);

    // Verify booking is deleted
    const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`);

    expect(getResponse.status()).toBe(404);

    console.log('Deleted Booking ID:', bookingId);

});


// TEST 6: Validate booking response schema
test('API - Validate booking response schema', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const booking = responseBody.booking;

    // Validate booking ID
    expect(typeof responseBody.bookingid).toBe('number');

    // Validate field data types
    expect(typeof booking.firstname).toBe('string');
    expect(typeof booking.lastname).toBe('string');
    expect(typeof booking.totalprice).toBe('number');
    expect(typeof booking.depositpaid).toBe('boolean');

    // Validate booking dates
    expect(typeof booking.bookingdates.checkin).toBe('string');
    expect(typeof booking.bookingdates.checkout).toBe('string');

    // Validate additional needs
    expect(typeof booking.additionalneeds).toBe('string');

    console.log('Booking response schema validated successfully');

});

test('API - Get booking with invalid ID', async ({ request }) => {

    const response = await request.get(`${baseUrl}/booking/999999999`);

    expect(response.status()).toBe(404);

    console.log('Invalid booking ID correctly returned 404');

});

test('API - Create booking with missing first name', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(response.status()).toBe(500);

    console.log('Missing first name test response:', response.status());

});


test('API - Get booking with negative ID', async ({ request }) => {

    const response = await request.get(`${baseUrl}/booking/-1`);

    expect(response.status()).toBe(404);

    console.log('Negative booking ID response:', response.status());

});


test('API - Get booking without ID', async ({ request }) => {

    const response = await request.get(`${baseUrl}/booking/`);

    expect(response.status()).toBe(200);

    console.log('Get all bookings response:', response.status());

});

test('API - Create booking with missing last name', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            totalprice: 1500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Missing last name response:', response.status());

    expect([200, 400, 500]).toContain(response.status());

});

test('API - Create booking with missing total price', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Missing total price response:', response.status());

    expect([200, 400, 500]).toContain(response.status());

});
test('API - Create booking without booking dates', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 2000,
            depositpaid: true,
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Missing booking dates response:', response.status());

    expect([200, 400, 500]).toContain(response.status());
});
test('API - Create booking without last name', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            totalprice: 2000,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Missing last name response:', response.status());

    expect([200, 400, 500]).toContain(response.status());
});
test('API - Create booking with invalid date format', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 2000,
            depositpaid: true,
            bookingdates: {
                checkin: 'invalid-date',
                checkout: 'wrong-date'
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Invalid date format response:', response.status());

    expect([200, 400, 500]).toContain(response.status());
});
test('API - Create booking with negative total price', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: -500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Negative total price response:', response.status());

    expect([200, 400, 500]).toContain(response.status());
});
test('API - Create booking with invalid depositpaid value', async ({ request }) => {

    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            firstname: 'Balaji',
            lastname: 'Tester',
            totalprice: 2000,
            depositpaid: 'yes',
            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log('Invalid depositpaid response:', response.status());

    expect([200, 400, 500]).toContain(response.status());
});