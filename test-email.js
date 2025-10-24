// Test script for email API
const fetch = require('node-fetch');

const testEmailSend = async () => {
  try {
    console.log('🧪 Testing email send API...\n');

    // Test data
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject from API',
      message: 'This is a test message from the email API.\n\nTesting multiple lines and formatting.'
    };

    console.log('📤 Sending test email with data:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n🔄 Making API request...\n');

    const response = await fetch('http://localhost:3001/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('📋 Response:', JSON.stringify(responseData, null, 2));
    } else {
      console.log('❌ Email failed to send:');
      console.log('📋 Error response:', JSON.stringify(responseData, null, 2));
    }

  } catch (error) {
    console.error('🚨 Error testing email:', error.message);
  }
};

// Test with invalid email
const testInvalidEmail = async () => {
  try {
    console.log('\n🧪 Testing with invalid email...\n');

    const invalidData = {
      name: 'Invalid Test',
      email: 'invalid-email',
      subject: 'Test Invalid Email',
      message: 'This should fail validation.'
    };

    const response = await fetch('http://localhost:3001/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData)
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.log('✅ Validation working correctly - rejected invalid email');
      console.log('📋 Error response:', JSON.stringify(responseData, null, 2));
    } else {
      console.log('❌ Validation failed - should have rejected invalid email');
    }

  } catch (error) {
    console.error('🚨 Error testing invalid email:', error.message);
  }
};

// Run tests
const runTests = async () => {
  await testEmailSend();
  await testInvalidEmail();
  console.log('\n🏁 Testing completed!');
};

runTests();