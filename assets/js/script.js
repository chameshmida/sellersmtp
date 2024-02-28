function makeTest(emailToTest) {
    const formData = new FormData();
    const successMessage = 'Test email est envoyé avec succès!';
    const errorMessage = 'Test email a échoué, veuillez essayer plus tard ou contactez-nous via telegram.';
    const catchedMessage = "Invalid email adresse ou n'est pas pris en charge.";

    if (!emailToTest.includes("outlook") && !emailToTest.includes("hotmail") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToTest)) {
        
        //const agent = new https.Agent({
        //rejectUnauthorized: false,
        //});
        formData.append('emailtest', emailToTest);

        

        try {

        fetch('https://toolsfresh.tech:5000/sender/testemail', {
            method: 'POST',
            body: formData
            //body: formData, agent
        })
        .then(response => {
            if (response.status === 200) {
                document.getElementById('messageResponse').innerHTML = successMessage;
                document.querySelector('.toast').classList.replace('bg-success', 'bg-success');
                document.querySelector('.toast').classList.replace('bg-danger', 'bg-success');
                document.querySelector('.toast').classList.replace('bg-warning', 'bg-success');
                return $('.toast').toast('show');

            } else {
                document.getElementById('messageResponse').innerHTML = errorMessage;
                document.querySelector('.toast').classList.replace('bg-success', 'bg-danger');
            document.querySelector('.toast').classList.replace('bg-danger', 'bg-danger');
            document.querySelector('.toast').classList.replace('bg-warning', 'bg-danger');
                return $('.toast').toast('show');
            }
        })

        } catch (error) {
            console.log(error);
        }
    
    } else {
        // Handle the case when emailToTest includes "outlook" or "hotmail" or "Invalid email addresse"
        document.getElementById('messageResponse').innerHTML = catchedMessage;
        document.querySelector('.toast').classList.replace('bg-success', 'bg-warning');
        document.querySelector('.toast').classList.replace('bg-danger', 'bg-warning');
        document.querySelector('.toast').classList.replace('bg-warning', 'bg-warning');
        return $('.toast').toast('show');
    } 

}

// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = '0x4AAAAAAASv05btA1xlQPx47tWyXZeQCd8';

async function handlePost(request) {
	const body = await request.formData();
	// Turnstile injects a token in "cf-turnstile-response".
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');

	// Validate the token by calling the
	// "/siteverify" API endpoint.
	let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome = await result.json();
	if (outcome.success) {
		// ...
	}
}

