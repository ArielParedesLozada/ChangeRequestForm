//const { response } = require("express")

document.getElementById('new-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = [
        0,
        document.getElementById('form-title').value,
        document.getElementById('form-version').value,
        new Date().toISOString().split('T')[0],
        document.getElementById('form-priority').value,
        null,
        document.getElementById('form-description').value,
        document.getElementById('form-reason').value,
        document.getElementById('form-solicitante').value,
        document.getElementById('form-project').value,
        null,
        null,
        null,
        null,
        null,
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

fetch('/personal')
.then(response => response.json())
.then(data => {
    const select = document.getElementById('form-solicitante') 
    let selectText = select.innerHTML
    for (let i = 0; i < data.body.length; i++) {
        selectText += `
            <option value="${data.body[i][0]}">${data.body[i][1]} ${data.body[i][2]}</option>
        `
    }
    select.innerHTML = selectText
})

fetch('/projects')
.then(response => response.json())
.then(data => {
    const select = document.getElementById('form-project') 
    let selectText = select.innerHTML
    for (let i = 0; i < data.body.length; i++) {
        selectText += `
            <option value="${data.body[i][0]}">${data.body[i][1]}</option>
        `
    }
    select.innerHTML = selectText
})