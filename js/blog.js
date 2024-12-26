// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "Princípios de UI Design para Iniciantes",
        excerpt: "Aprenda os fundamentos essenciais do UI Design e como aplicá-los em seus projetos.",
        image: "../img/blog/ui-design-principles.jpg",
        date: "2024-12-26",
        author: "Eduardo Lucas",
        tags: ["ui-design", "tips"],
        readTime: "5 min"
    },
    {
        id: 2,
        title: "UX Research: Como Conduzir Entrevistas com Usuários",
        excerpt: "Guia completo sobre como realizar entrevistas efetivas para pesquisa de UX.",
        image: "../img/blog/ux-research.jpg",
        date: "2024-12-24",
        author: "Eduardo Lucas",
        tags: ["ux-design", "tips"],
        readTime: "8 min"
    },
    {
        id: 3,
        title: "Otimizando Performance em Sites React",
        excerpt: "Dicas práticas para melhorar a performance de suas aplicações React.",
        image: "../img/blog/react-performance.jpg",
        date: "2024-12-22",
        author: "Eduardo Lucas",
        tags: ["web-dev", "tips"],
        readTime: "6 min"
    }
];

// Estado da aplicação
let currentTag = 'all';
let currentPage = 1;
const postsPerPage = 6;
let filteredPosts = [...blogPosts];

// Elementos DOM
const blogGrid = document.querySelector('.blog-grid');
const tagButtons = document.querySelectorAll('.tag');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pagination = document.querySelector('.pagination');

// Formatar data
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Criar card do blog
function createBlogCard(post) {
    return `
        <article class="blog-card" data-aos="fade-up">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span>${formatDate(post.date)}</span>
                    <span>•</span>
                    <span>${post.readTime} de leitura</span>
                </div>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}

// Renderizar posts
function renderPosts() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    blogGrid.innerHTML = currentPosts.map(createBlogCard).join('');
    updatePagination();
}

// Atualizar paginação
function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const pagesContainer = pagination.querySelector('.pages');
    const prevButton = pagination.querySelector('.prev');
    const nextButton = pagination.querySelector('.next');

    // Atualizar botões prev/next
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Atualizar números das páginas
    pagesContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => {
            currentPage = i;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagesContainer.appendChild(button);
    }
}

// Filtrar posts por tag
function filterByTag(tag) {
    currentTag = tag;
    currentPage = 1;
    
    filteredPosts = tag === 'all' 
        ? [...blogPosts]
        : blogPosts.filter(post => post.tags.includes(tag));
    
    renderPosts();
}

// Buscar posts
function searchPosts(query) {
    query = query.toLowerCase();
    filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    currentPage = 1;
    renderPosts();
}

document.addEventListener('DOMContentLoaded', () => {
    // Filtros
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

    // Modal de Post
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');

    // Dados dos posts
    const postsData = {
        1: {
            title: 'Tendências de UI Design para 2024',
            content: `
                <img src="../img/blog/post1.jpg" alt="UI Design Trends 2024">
                <h2>Tendências de UI Design para 2024</h2>
                <p>O mundo do design de interface está em constante evolução, e 2024 promete trazer mudanças significativas na maneira como criamos e interagimos com interfaces digitais.</p>
                
                <h3>Principais Tendências</h3>
                <ul>
                    <li>Design Minimalista e Funcional</li>
                    <li>Microinterações Avançadas</li>
                    <li>Glassmorphism 2.0</li>
                    <li>Cores Vibrantes e Contrastantes</li>
                </ul>
                
                <p>Estas tendências refletem uma mudança na maneira como os usuários interagem com produtos digitais, priorizando experiências mais intuitivas e emocionalmente conectadas.</p>
                
                <h3>Impacto no Design</h3>
                <p>A implementação dessas tendências deve ser feita de forma estratégica, sempre considerando as necessidades dos usuários e os objetivos do produto.</p>
            `
        },
        2: {
            title: 'A Importância da Pesquisa UX',
            content: `
                <img src="../img/blog/post2.jpg" alt="UX Research">
                <h2>A Importância da Pesquisa UX</h2>
                <p>A pesquisa de experiência do usuário é fundamental para criar produtos digitais que realmente atendam às necessidades dos usuários.</p>
                
                <h3>Métodos de Pesquisa</h3>
                <ul>
                    <li>Entrevistas com Usuários</li>
                    <li>Testes de Usabilidade</li>
                    <li>Análise de Dados</li>
                    <li>Pesquisas Contextuais</li>
                </ul>
                
                <p>Uma pesquisa UX bem conduzida pode revelar insights valiosos sobre o comportamento e as necessidades dos usuários.</p>
                
                <h3>Benefícios</h3>
                <p>Investir em pesquisa UX pode reduzir custos de desenvolvimento, aumentar a satisfação do usuário e melhorar as taxas de conversão.</p>
            `
        },
        3: {
            title: 'Desenvolvimento Web Moderno',
            content: `
                <img src="../img/blog/post3.jpg" alt="Web Development">
                <h2>Desenvolvimento Web Moderno</h2>
                <p>O desenvolvimento web moderno exige uma combinação de habilidades técnicas e compreensão profunda de experiência do usuário.</p>
                
                <h3>Tecnologias Essenciais</h3>
                <ul>
                    <li>HTML5 Semântico</li>
                    <li>CSS3 Moderno</li>
                    <li>JavaScript ES6+</li>
                    <li>Frameworks Modernos</li>
                </ul>
                
                <p>A escolha das tecnologias certas é crucial para criar aplicações web performáticas e escaláveis.</p>
                
                <h3>Melhores Práticas</h3>
                <p>Seguir as melhores práticas de desenvolvimento garante código mais limpo, manutenível e acessível.</p>
            `
        }
    };

    // Abrir Modal com animação suave
    document.querySelectorAll('.btn-view-project').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.getAttribute('data-post');
            const post = postsData[postId];

            if (post) {
                modalBody.innerHTML = post.content;
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

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            tagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterByTag(button.dataset.tag);
        });
    });

    searchButton.addEventListener('click', () => {
        searchPosts(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPosts(searchInput.value);
        }
    });

    pagination.querySelector('.prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    pagination.querySelector('.next').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Inicializar blog
    renderPosts();
});
