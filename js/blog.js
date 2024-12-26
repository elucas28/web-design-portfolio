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

// Event Listeners
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
