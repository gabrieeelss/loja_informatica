
function fnLimparCampos() {
    document.getElementById("form-cad-user").reset()
}

function fnCadastrarUsuario() {

    let dadosUser = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        permissao: document.getElementById("permissao").value
    }
    console.dir(dadosUser)

    fetch('http://localhost:3000/cad-user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUser)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnLimparCampos()
            console.log(dados)
            fnCriarToast()
        })
        .catch(erro => console.log(erro.message))
}

let btn_salvar = document.getElementById("btn-salvar-user")

btn_salvar.addEventListener("click", function () {
    fnCadastrarUsuario()
})

// TOAST
function fnCriarToast() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}
