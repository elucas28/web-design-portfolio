document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Detectar scroll para adicionar sombra ao header
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adicionar sombra ao rolar
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Esconder/mostrar header ao rolar
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    });

    // Projeto Filtros com animação suave
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Adiciona classe para animação
                card.classList.add('filtering');

                setTimeout(() => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('filtering');
                            card.classList.add('show');
                        }, 10);
                    } else {
                        card.classList.remove('show');
                        card.classList.add('filtering');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, 10);
            });
        });
    });

    // Modal de Projeto com melhor UX mobile
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');

    // Dados dos projetos
    const projectsData = {
        1: {
            title: 'Dashboard de Gestão de Agentes',
            description: 'Uma aplicação para gerenciamento de agentes inteligentes.',
            technologies: ['Windsurf', 'Retool'],
            images: ['c:\Users\eduar\Downloads\Use apps for business and personal use (800 x 600 px).png', 'c:\Users\eduar\Downloads\Mind Map.png'],
            challenge: 'O desafio era criar uma interface que simplificasse o gerenciamento financeiro para usuários iniciantes.',
            solution: 'Desenvolvemos uma UI minimalista com foco em visualização de dados e ações rápidas.'
        },
        2: {
            title: 'Pesquisa UX E-commerce',
            description: 'Projeto de pesquisa e redesign da experiência do usuário para uma plataforma de e-commerce.',
            technologies: ['User Research', 'Wireframing', 'Usability Testing'],
            images: ['https://via.placeholder.com/800x600', 'https://via.placeholder.com/800x600'],
            challenge: 'Melhorar as taxas de conversão e reduzir o abandono de carrinho.',
            solution: 'Implementamos um novo fluxo de checkout e melhoramos a navegação do catálogo.'
        },
        3: {
            title: 'Site Responsivo',
            description: 'Design e desenvolvimento de um site responsivo para uma empresa de tecnologia.',
            technologies: ['HTML/CSS', 'JavaScript', 'Responsive Design'],
            images: ['https://via.placeholder.com/800x600', 'https://via.placeholder.com/800x600'],
            challenge: 'Criar uma experiência consistente em todos os dispositivos.',
            solution: 'Utilizamos design adaptativo e progressive enhancement.'
        }
    };

    // Abrir Modal com animação suave
    document.querySelectorAll('.btn-view-project').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectsData[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <div class="project-modal-content">
                        <h2>${project.title}</h2>
                        <div class="project-images">
                            ${project.images.map(img => `
                                <img src="${img}" alt="${project.title}" loading="lazy">
                            `).join('')}
                        </div>
                        <div class="project-info">
                            <h3>Sobre o Projeto</h3>
                            <p>${project.description}</p>
                            
                            <h3>Desafio</h3>
                            <p>${project.challenge}</p>
                            
                            <h3>Solução</h3>
                            <p>${project.solution}</p>
                            
                            <h3>Tecnologias Utilizadas</h3>
                            <ul class="technologies-list">
                                ${project.technologies.map(tech => `
                                    <li>${tech}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Adiciona classe para animação
                setTimeout(() => {
                    modal.classList.add('modal-active');
                }, 10);
            }
        });
    });

    // Fechar Modal com animação
    const closeModal = () => {
        modal.classList.remove('modal-active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };

    modalClose.addEventListener('click', closeModal);

    // Fechar Modal ao clicar fora ou com tecla ESC
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Theme Switcher
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Função para definir o tema
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Inicializar tema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDarkScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Alternar tema
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Inicializar tema ao carregar a página
    initTheme();

    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Parar de observar após a animação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('section, .project-card, .skill-card').forEach(element => {
        observer.observe(element);
    });
});
