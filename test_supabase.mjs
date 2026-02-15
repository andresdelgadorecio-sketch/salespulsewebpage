import fs from 'fs';
import path from 'path';

// Load .env.local manually since we are not using 'dotenv' package directly available
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const SUPABASE_URL = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_KEY = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

console.log('Testing connection to:', SUPABASE_URL);

async function testConnection() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/subscriptions?select=*&limit=1`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (response.ok) {
            console.log('✅ Connection Successful!');
            const data = await response.json();
            console.log('Data received:', data);
        } else {
            console.error('❌ Connection Failed:', response.status, response.statusText);
            console.error('Response:', await response.text());
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
}

testConnection();
