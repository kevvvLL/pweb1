const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function generateCredentials() {
    // Generate a random password (16 chars)
    const password = crypto.randomBytes(8).toString('hex');

    // Generate hash
    const hash = await bcrypt.hash(password, 10);

    // Generate session secret
    const secret = crypto.randomBytes(32).toString('hex');

    console.log('PASSWORD_START');
    console.log(password);
    console.log('PASSWORD_END');

    console.log('HASH_START');
    console.log(hash);
    console.log('HASH_END');

    console.log('SECRET_START');
    console.log(secret);
    console.log('SECRET_END');
}

generateCredentials();
