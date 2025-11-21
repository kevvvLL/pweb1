// Test script to verify password hash
const bcrypt = require('bcryptjs');

// Read from environment or use the hash directly
const hash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$XYL9Uu55k04yVAvMeEMqS.vA7lFJsLo/1cMxZ8hpy74BMnymka0i2';
const testPassword = 'admin123';

console.log('\n=== Password Hash Verification ===\n');
console.log('Testing password:', testPassword);
console.log('Hash from env:', process.env.ADMIN_PASSWORD_HASH ? 'Found' : 'Not found');
console.log('Using hash:', hash.substring(0, 20) + '...\n');

bcrypt.compare(testPassword, hash).then(result => {
    if (result) {
        console.log('✅ Password verification SUCCESSFUL!');
        console.log('The password "admin123" matches the hash.\n');
    } else {
        console.log('❌ Password verification FAILED!');
        console.log('The password does not match the hash.\n');
        console.log('Please check your .env.local file.\n');
    }
}).catch(error => {
    console.error('❌ Error:', error);
});
