async function main() {
  console.log('Testing PDF Route...')
  try {
    const res = await fetch('http://localhost:3000/api/resume/one/pdf')
    console.log('PDF Status:', res.status)
    const text = await res.text()
    console.log('PDF Response:', text.substring(0, 200)) // Truncate
  } catch (e) {
    console.error('PDF Fetch Error:', e.message)
  }

  console.log('\nTesting PUT Resume Route...')
  try {
    // This will likely fail with 401 Unauthorized because we don't have a session cookie
    // But we want to see if it even reaches the validation logic or DB logic
    const res = await fetch('http://localhost:3000/api/resume', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        experiences: [] // Send valid array
      })
    })
    console.log('PUT Status:', res.status)
    const text = await res.text()
    console.log('PUT Response:', text)
  } catch (e) {
    console.error('PUT Fetch Error:', e.message)
  }
}

main()
