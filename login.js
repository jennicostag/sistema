document.addEventListener("DOMContentLoaded", function() {
    let dadosString = localStorage.getItem("usuarios")
    let usernameStorage
    let passwordStorage
 
    if (dadosString){ //se houver conteúdo na variável "dadosString"
        let dados = JSON.parse(dadosString)
        usernameStorage = dados.username
        passwordStorage = dados.password
    }
    
    //capturar o elemento botão com id "btn_login"
    let btn_login = document.querySelector("#btn_login")

    btn_login.addEventListener("click", function(){
        let username = document.querySelector("#username").value
        let password = document.querySelector("#password").value
        let chave = document.querySelector("#chave").value
        
        //armazenando quantos caracteres tem o conteúdo da variável chave
        let key = chave.length;
        
        let mensagem = document.querySelector(".mensagem")

        //verificando se o usuário é diferente do usuário armazenado
        if (usernameStorage !== username) {
            mensagem.textContent = "Usuário incorreto. Por favor, verifique!"
            return //sair da função
        }
        
        //descriptografia da senha
        let textoDescripto = descripto(passwordStorage, key)

        //se a senha está correta
        if (textoDescripto !== password) {
            mensagem.textContent = "Senha incorreta. Por favor, verifique!"
            return //sair da função
        }

        //Chamar a página Dashboard
        window.location.href = "dashboard.html"
    })

})

function cripto(texto, key){
    let criptoTexto=""
    for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i)
        charCode += key
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
