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

document.querySelectorAll('.faq-card-question').forEach(function(question) {
    question.addEventListener('click', function() {
        var card = this.parentElement;
        var allCards = document.querySelectorAll('.faq-card');
        allCards.forEach(function(c) {
            c.classList.remove('active');
        });
        card.classList.add('active');
    });
});

// 

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