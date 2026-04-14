document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Diagnosis Modal Logic
    const openModalBtns = document.querySelectorAll('.open-modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');
    const diagnosisForm = document.getElementById('diagnosisForm');

    const openModal = () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Form Submission to WhatsApp
    diagnosisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const restaurantName = document.getElementById('restaurantName').value;
        const instagramHandle = document.getElementById('instagramHandle').value;
        const monthlyRevenue = document.getElementById('monthlyRevenue').value;
        
        const phoneNumber = '5585981848745';
        const message = `Olá! Gostaria de um Diagnóstico Gratuito para o meu restaurante *${restaurantName}*. Nosso perfil é *${instagramHandle}* e nosso faturamento mensal é *${monthlyRevenue}*.`;
        
        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(waUrl, '_blank');
        
        // Finalize
        closeModal();
        diagnosisForm.reset();
    });

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current item
            if (!isOpen) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Section-based Scroll Reveal Animation
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
            }
        });
    }, { threshold: 0.2 });

    // Observe all main sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Special case: Hero section should animate immediately or almost immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => hero.classList.add('section-active'), 100);
    }

    // Navbar Scroll Background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});
