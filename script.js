//código para abrir e fechar o menu responsivo
function menuShow() {
    //captura o elemento com classe .mobile-menu
    let menuMobile = document.querySelector('.mobile-menu');

    //Se no atributo "class" do elemento "mobile-menu" conter "open"
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open'); //remove a classe "open" do elemento
        document.querySelector('.icon').src = "https://ameicare.com.br/open.svg"; //atribui a imagem do sandwich ao botão
    } else { //senão (se o elemento não conter a classe "open")
        menuMobile.classList.add('open'); //adiciona a classe "open" ao elemento
        document.querySelector('.icon').src = "https://ameicare.com.br/close.svg"; //atribui a imagem X ao botão
    }
}               