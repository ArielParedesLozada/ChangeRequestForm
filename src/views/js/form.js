document.getElementById('form-accept').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = [
        document.getElementById('form-id').value,
        document.getElementById('form-name').value,
        true
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


document.getElementById('form-delete').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = [
        document.getElementById('form-id').value,
        document.getElementById('form-name').value,
        true
    ]
    try {
        const response = await fetch('/form', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        window.alert(result.error ? 'ERROR' : 'EXITO')
        window.location.href = "/forms"
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        window.alert('Error al enviar los datos');
    }
})