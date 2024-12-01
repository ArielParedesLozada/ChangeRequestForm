document.getElementById('new-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = [
        0,
        document.getElementById('form-name').value,
        null
    ]
    try {
        const response = await fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        window.alert(result.error ? 'ERROR' : 'EXITO')
        location.reload()
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        window.alert('Error al enviar los datos');
    }
})