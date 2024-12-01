document.getElementById('form-accept').addEventListener('submit', async (e) => {
    e.preventDefault()
    const id = document.getElementById('form-id').value
    const NOM_SOL = document.getElementById('form-name').value
    const EST_SOL = true
    const db = JSON.stringify({ id, NOM_SOL, EST_SOL })
    console.log(db)
    try {
        const response = await fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, NOM_SOL, EST_SOL })
        })
        const result = await response.json()
        console.log(result)
        window.alert('EXITO')
        location.reload()
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        window.alert('Error al enviar los datos');
    }
})
