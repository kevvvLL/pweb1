// Script to generate password hash for blog authentication
// Run this with: node scripts/generate-password-hash.js

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n=== Blog Password Hash Generator ===\n');
console.log('This will generate a password hash for your .env.local file.\n');

rl.question('Enter your desired admin password: ', async (password) => {
    if (!password || password.length < 6) {
        console.log('\n❌ Password must be at least 6 characters long.');
        rl.close();
        return;
    }

    console.log('\nGenerating hash...\n');

    try {
        const hash = await bcrypt.hash(password, 10);

        console.log('✅ Password hash generated successfully!\n');
        console.log('Add this to your .env.local file:\n');
        console.log('ADMIN_PASSWORD_HASH=' + hash);
        console.log('\nAlso add a session secret (random string):');
        console.log('SESSION_SECRET=' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
        console.log('\n');
    } catch (error) {
        console.error('❌ Error generating hash:', error);
    }

    rl.close();
});
