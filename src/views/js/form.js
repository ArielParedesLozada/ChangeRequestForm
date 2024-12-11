document.getElementById('form-accept').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = [
        document.getElementById('form-id').value,
        document.getElementById('form-title').value,
        document.getElementById('form-version').value,
        document.getElementById('form-date-sol').value,
        document.getElementById('form-priority').value,
        true,
        document.getElementById('form-description').value,
        document.getElementById('form-reason').value,
        document.getElementById('form-solicitante').value,
        document.getElementById('form-project').value,
        new Date(),
        document.getElementById('form-reviewer').value,
        document.getElementById('form-enviroment').value,
        document.getElementById('form-modules').value,
        document.getElementById('form-affected').value,
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

document.getElementById('form-reject').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = [
        document.getElementById('form-id').value,
        document.getElementById('form-title').value,
        document.getElementById('form-version').value,
        document.getElementById('form-date-sol').value,
        document.getElementById('form-priority').value,
        false,
        document.getElementById('form-description').value,
        document.getElementById('form-reason').value,
        document.getElementById('form-solicitante').value,
        document.getElementById('form-project').value,
        new Date(),
        document.getElementById('form-reviewer').value,
        document.getElementById('form-enviroment').value,
        document.getElementById('form-modules').value,
        document.getElementById('form-affected').value,
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
        document.getElementById('form-title').value,
        document.getElementById('form-version').value,
        document.getElementById('form-date-sol').value,
        document.getElementById('form-priority').value,
        document.getElementById('form-status').value,
        document.getElementById('form-description').value,
        document.getElementById('form-reason').value,
        document.getElementById('form-solicitante').value,
        document.getElementById('form-project').value,
        document.getElementById('form-date').value,
        document.getElementById('form-reviewer').value,
        document.getElementById('form-enviroment').value,
        document.getElementById('form-modules').value,
        document.getElementById('form-affected').value,
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

fetch('/personal')
.then(response => response.json())
.then(data => {
    const select = document.getElementById('form-reviewer') 
    let selectText = select.innerHTML
    for (let i = 0; i < data.body.length; i++) {
        selectText += `
            <option value="${data.body[i][0]}">${data.body[i][1]} ${data.body[i][2]}</option>
        `
    }
    select.innerHTML = selectText
})