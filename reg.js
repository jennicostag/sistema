//Escutador do documento; "presta a atenção quando o doc for carregado"
document.addEventListener("DOMContentLoaded", function() {
    
    //capturando o elemento "btn_reg"
    let btn_reg = document.querySelector("#btn_reg")

    //Escutador: "presta atenção quando o botão for clicado"
    btn_reg.addEventListener("click", function(){
        //capturar todos os valores das caixas de texto
        let username = document.querySelector("#username").value
        let password1 = document.querySelector("#password1").value
        let chave1 = document.querySelector("#chave1").value
        let password2 = document.querySelector("#password2").value
        let chave2 = document.querySelector("#chave2").value
        let mensagem = document.querySelector(".mensagem")
        
        //verificar se a senha e a confirmação de senha são iguais
        if (password1!== password2){
            mensagem.textContent = "A senha não confere com a confirmação de senha. Por favor, verifique!"
            return
        }

        //verificar se a chave e a confirmação de chave são iguais
        if (chave1 !== chave2){
            mensagem.textContent = "A senha secreta não confere com a confirmação de senha secreta. Por favor, verifique!" 
            return
        }

        //armazena na variável "key" a quantidade de caracteres da chave
        let key = chave1.length

        //chamar função que criptografa a senha com a chave secreta
        let textoCripto = cripto(password1, key)

        //variável do tipo vertor (objeto) contendo "campos" dentro dela
        let dados = {
            username: username,
            password: textoCripto,
        }

        //criando armazenamento no navegador com o objeto "dados" criado
        localStorage.setItem("userData", JSON.stringify(dados))

        alert("Registro realizado com sucesso. Faça seu login!")

        //redirecionar o usuário para outra página
        window.location.href = "index.html"
        
    })
})

//função que criptografa a senha
function cripto(texto, key){
    let criptoTexto=""
    for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i)
        charCode += key //charCode = charCode + key
        criptoTexto += String.fromCharCode(charCode)
    }
    return criptoTexto
}

function descripto(criptoTexto, key) {
    let descriptoTexto = ""
    for (let i = 0; i < criptoTexto.length; i++){
        let charCode = criptoTexto.charCodeAt(i)
        charCode -= key
        descriptoTexto += String.fromCharCode(charCode)
    }
    return descriptoTexto
}

//ALGORITMO DA MÁSCARA DE ENTRADA PARA TELEFONE
//função para formatar telefone
function formatarTelefone(telefone){
    //remover todos os caracteres não numéricos do telefone
    telefone = telefone.replace(/\D/g, '')

    //aplica a máscara: (##) #####-####
    //"/" no início e no final da expressão regular delimita o padrão
    //"\D" isso representa qualquer caractere que não seja um dígito
    //"g" isso é uma flag que sifnifica "global", indicando que a pesquisa
    //deve continuar mesmo depois de encontrar uma correspondência
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2')
    //"d" representa um dígito decimal (0-9)
    //O trecho '($1) $2' faz parte da substituição na expressão regular
    //($1) refere-se ao primeiro grupo de captura na expressão regular
    //$2 refere-se ao segundo grupo
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2')

    return telefone
}

//Escutador: "prestar atenção no gatilho input, no campo telefone"
document.getElementById('tel').addEventListener('input', function(event){
    let input = event.target //captura o input para a variável input
    let telefone = input.value //armazena o valor do input na variável telefone

    let telefoneFormatado = formatarTelefone(telefone) //chama a função de máscara do tel

    input.value = telefoneFormatado //armazena no input a máscara formatada
})
//FIM

//ALGORITMO DA MÁSCARA DE ENTRADA PARA CEP
document.getElementById('cep').addEventListener('input', function(event){
    let input = event.target
    let cep = input.value

    //Remover todos os caracteres não numéricos do CEP
    cep = cep.replace(/\D/g, '')

    //verifica se o CEP possui a quantidade correta de caracteres
    if (cep.length ==8){
        //Formatar o CEP com a máscara de entrada #####-###
        cep = cep.substring(0, 2) + '.' + cep.substring(2, 5) + '-' + cep.substring(5)
        //substring é um método que retorna com uma parte de uma string
        //1º parâmetro é o índice
        //2º parâmetro é o índice limite
    }

    input.value = cep
})
//FIM

//ALGORITMO DA MÁSCARA DE ENTRADA PARA CPF
document.getElementById('cpf').addEventListener('input', function(event){
    let input = event.target
    let cpf = input.value

    cpf = cpf.replace(/\D/g, '')

    if (cpf.length ==11){
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9)
    }

    input.value = cpf
})
//FIM

//INÍCIO ALGORITMO ESTADOS E CIDADES
function popularSelectEstados(){
    let selectEstados = document.getElementById('estado')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => response.json())
    .then(estados => {
        estados.forEach(estado => {
            let option = document.createElement('option')
            option.value = estado.id
            option.textContent = estado.nome
            selectEstados.appendChild(option)
        })
    })
}

popularSelectEstados()
//FIM

//INICIO SELECT CIDADES
function popularSelectCidades(idEstado){
    const selectCidades = document.getElementById("cidades")
    selectCidades.innerHTML = ''

    const optionSelecione = document.createElement("option")
    optionSelecione.value = ''
    optionSelecione.textContent = "Selecione uma cidade..."
    selectCidades.appendChild(optionSelecione)

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios")
    .then(response => {
        if(!response.ok){
            throw new Error("Erro ao buscar cidade")
        }
        return response.json()
    })
    .then(cidades => {
        cidades.forEach(cidade => {
            const option = document.createElement("option")
            option.value = cidade.id
            option.textContent = cidade.nome
            selectCidades.appendChild(option)
        })
    })
    .catch(error => {
        alert(error.message)
    })
}