$(document).ready(function () {
    // Menu mobile
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    $(document).ready(function() {
        $(".cart-button").on("click", function() {
            $("#cart-items").toggle();
        });
    });
    
    // Rolagem suave
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop();
        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - header.outerHeight();
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    // Navegação suave ao clicar
    navItems.on('click', function (event) {
        event.preventDefault();
        const target = $(this).find('a').attr('href');
        const targetOffset = $(target).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset - $('header').outerHeight()
        }, 800);
    });

    // ScrollReveal para animações
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });
    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });
    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });
    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });

    // Carrinho de compras
    let cart = [];
    const $cartButton = $('#cart-button');
    const $cartCount = $('#cart-count');
    const $cartItems = $('#cart-items');
    

    // Função para atualizar o carrinho
    function updateCart() {
        $cartItems.empty();
        let total = 0;

        cart.forEach(item => {
            total += parseFloat(item.price);
            $cartItems.append(`<div>${item.name} - R$${item.price}</div>`);
        });

        $cartItems.append(`<div><strong>Total: R$${total.toFixed(2)}</strong></div>`);
        $cartItems.append('<button id="buy-now" class="btn btn-primary">Comprar</button>');
        $cartCount.text(cart.length);
        $cartItems.show();
    }

    // Adiciona evento de clique nos botões de adicionar ao carrinho
    $('.add-to-cart').click(function () {
        const $dish = $(this).closest('.dish');
        const name = $dish.find('.dish-title').text();
        const price = $dish.find('.dish-heart').data('price');

        cart.push({ name, price });
        updateCart();
    });

     // Evento para mostrar/ocultar itens do carrinho
    $cartButton.click(function () {
        // Verifica se o menu hamburger está ativo para evitar conflito
        if (!$('#mobile_menu').hasClass('active')) {
            $cartItems.toggle();
        }
    });

    // Evento para o botão "Comprar"
    $(document).on('click', '#buy-now', function () {
        alert('Compra finalizada com sucesso!');
        cart = []; // Limpa o carrinho após a compra
        updateCart(); // Atualiza o carrinho para mostrar que está vazio
    });
});
