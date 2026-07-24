// Бургер меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Закрытие меню при клике на ссылку
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Закрытие меню при изменении размера окна (переход на десктоп)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

// FAQ-аккордеон реализован полностью на CSS
// (.faq-toggle:checked ~ .faq-card-answer), JS не требуется

// Переключатель языка — <details>, открытие/закрытие и анимация на CSS.
// JS нужен только для закрытия по клику вне меню и по Escape.
document.addEventListener('click', function (e) {
    document.querySelectorAll('.lang-dropdown[open]').forEach(function (d) {
        if (!d.contains(e.target)) {
            d.removeAttribute('open');
        }
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.lang-dropdown[open]').forEach(function (d) {
        d.removeAttribute('open');
        var summary = d.querySelector('summary');
        if (summary) summary.focus();
    });
});

// Скрытие шапки при скролле вниз и возврат при скролле вверх.
// JS только переключает классы — вся анимация в CSS (transform/opacity).
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('header');
    if (!header) return;

    var DELTA = 4;      // порог, чтобы не дёргаться на микро-скролле
    var lastY = window.pageYOffset;
    var ticking = false;

    function headerHeight() {
        return header.offsetHeight || 96;
    }

    function update() {
        ticking = false;
        var y = window.pageYOffset;
        if (y < 0) y = 0;                       // iOS bounce

        header.classList.toggle('header-scrolled', y > 8);

        // при открытом мобильном меню шапка всегда видима
        if (document.body.classList.contains('menu-open')) {
            header.classList.remove('header-hidden');
            lastY = y;
            return;
        }

        if (y > lastY + DELTA && y > headerHeight() * 1.5) {
            if (!header.classList.contains('header-hidden')) {
                header.classList.add('header-hidden');
                // выпадающее меню языка уезжает вместе с шапкой — закрываем
                document.querySelectorAll('.lang-dropdown[open]').forEach(function (d) {
                    d.removeAttribute('open');
                });
            }
        } else if (y < lastY - DELTA || y <= headerHeight()) {
            header.classList.remove('header-hidden');
        }

        lastY = y;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    }, { passive: true });

    update();
});

document.addEventListener('DOMContentLoaded', function () {
  const animatedBlocks = document.querySelectorAll('.trigger-anim');

  function animateOnScroll() {
    let delay = 0;
    animatedBlocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight * 0.9 && !block.classList.contains('active-anim')) {
        setTimeout(() => {
          block.classList.add('active-anim');
        }, delay);
        delay += 100; // 0.1s = 100ms
      }
    });
  }

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});