const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.get('http://localhost:3000/api/lessons');
    console.log('API Response:', response.data);
    console.log('Test passed: API is working and returning lesson data');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI();