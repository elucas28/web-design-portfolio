document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenu.classList.toggle('active');
        });
    }

    // Projeto Filtros
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
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal de Projeto
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');

    // Dados dos projetos (você pode expandir isso)
    const projectsData = {
        1: {
            title: 'App de Finanças',
            description: 'Um aplicativo mobile para gerenciamento de finanças pessoais, com foco em uma interface limpa e intuitiva.',
            technologies: ['Figma', 'Prototype', 'User Testing'],
            images: ['https://via.placeholder.com/800x600', 'https://via.placeholder.com/800x600'],
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

    // Abrir Modal
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
            }
        });
    });

    // Fechar Modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Fechar Modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fechar menu mobile se estiver aberto
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
