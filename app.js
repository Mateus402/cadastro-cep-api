var rua = document.getElementById('rua')
var bairro = document.getElementById('bairro')
var estado = document.getElementById('estado')
var cidade = document.getElementById('cidade')


async function buscarEndereco (cep) {
    var msgErro = document.getElementById('errosCep')
    msgErro.innerHTML = ` `
    try {
        var consultaCep = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
        var consultaConvertida = await consultaCep.json()
        if (consultaConvertida.error) {
            throw Error('O CEP informado não existe')
        }
        
        rua.value = consultaConvertida.logradouro
        bairro.value = consultaConvertida.bairro
        estado.value = consultaConvertida.uf
        cidade.value = consultaConvertida.localidade

        console.log(consultaConvertida)
    } catch (error) {
        msgErro.innerHTML = `
        <p>O CEP informado não foi encontrado</p>
        `
        console.log(error)
    }
}

var cep = document.getElementById('cep')

cep.addEventListener("focusout", () => buscarEndereco(cep.value))

document.body.addEventListener('click', e => {
    if(e.target.id == 'btn-recarregar') {
        window.location.reload()
    }
})
