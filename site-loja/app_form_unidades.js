function fnAlterarFoto() {
    if (foto.value != '') {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('${foto.value}')`
    } else {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('https://plus.unsplash.com/premium_photo-1661964205360-b0621b5a9366?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9qYXxlbnwwfHwwfHx8MA%3D%3D')`
    }
    console.log(foto.value)
}

function fnLimparCampos() {
    document.getElementById("form-unidades").reset()
}

function fnCadastrarUnidade() {

    let formUnidades = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
        foto: document.getElementById("foto").value
    }
    console.dir(formUnidades)

    fetch('http://localhost:3000/unidades/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUnidades)
})
.then(resposta => resposta.json())
.then((dados) =>{
    fnLimparCampos()
    console.log(dados)
})
.catch(erro => console.log(erro.message))
}

let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-unidade")


foto.addEventListener("blur", function () {
    fnAlterarFoto()
})

btn_salvar.addEventListener("click", function () {
    fnCadastrarUnidade()
})


 