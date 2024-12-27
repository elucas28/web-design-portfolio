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
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
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
            title: 'IA no Design: O Futuro do UI/UX',
            content: `
                <img src="../img/project-1.jpg" alt="AI no Design - Interface moderna em diferentes dispositivos">
                <h2>IA no Design: O Futuro do UI/UX</h2>
                
                <p>A Inteligência Artificial está revolucionando a maneira como criamos e pensamos o design de interfaces. Em 2024, vemos uma integração cada vez maior entre IA e design, trazendo novas possibilidades e desafios.</p>
                
                <h3>Impacto da IA no Design</h3>
                <ul>
                    <li><strong>Geração de Layouts:</strong> Ferramentas como Midjourney e DALL-E estão sendo usadas para gerar conceitos iniciais de design.</li>
                    <li><strong>Personalização em Tempo Real:</strong> Interfaces que se adaptam ao comportamento do usuário usando IA.</li>
                    <li><strong>Automação de Tarefas:</strong> IA auxiliando em tarefas repetitivas, permitindo que designers foquem em aspectos mais criativos.</li>
                    <li><strong>Testes A/B Inteligentes:</strong> Algoritmos que otimizam interfaces baseados em dados de usuário.</li>
                </ul>
                
                <h3>Ferramentas de IA para Designers</h3>
                <p>Novas ferramentas estão surgindo rapidamente:</p>
                <ul>
                    <li>Adobe Firefly para geração de assets</li>
                    <li>Figma AI para automação de design</li>
                    <li>Uizard para prototipagem rápida</li>
                    <li>Khroma para paletas de cores inteligentes</li>
                </ul>
                
                <h3>O Papel do Designer na Era da IA</h3>
                <p>Com o avanço da IA, o papel do designer está evoluindo. Em vez de ser substituído, o designer se torna um curador e diretor criativo, usando IA como uma ferramenta para amplificar sua criatividade e eficiência.</p>
                
                <h3>Considerações Éticas</h3>
                <p>É crucial considerar as implicações éticas do uso de IA no design:</p>
                <ul>
                    <li>Vieses algorítmicos</li>
                    <li>Privacidade do usuário</li>
                    <li>Transparência nas decisões automatizadas</li>
                    <li>Acessibilidade e inclusão</li>
                </ul>
            `
        },
        2: {
            title: 'Design Systems em 2024',
            content: `
                <img src="../img/project-3.jpg" alt="Design Systems - Website responsivo com elementos visuais">
                <h2>Design Systems em 2024: Evolução e Tendências</h2>
                
                <p>Os Design Systems continuam evoluindo e se tornando cada vez mais cruciais para empresas de todos os tamanhos. Em 2024, vemos uma nova geração de sistemas de design que são mais flexíveis, escaláveis e inclusivos.</p>
                
                <h3>Tendências em Design Systems</h3>
                <ul>
                    <li><strong>Sistemas Adaptativos:</strong> Design systems que se ajustam automaticamente a diferentes contextos e necessidades.</li>
                    <li><strong>Tokens Dinâmicos:</strong> Uso avançado de design tokens para maior flexibilidade e consistência.</li>
                    <li><strong>Acessibilidade Integrada:</strong> Componentes com acessibilidade nativa e documentação WCAG.</li>
                    <li><strong>Internacionalização:</strong> Suporte robusto para diferentes idiomas e culturas.</li>
                </ul>
                
                <h3>Ferramentas e Tecnologias</h3>
                <p>As principais ferramentas para Design Systems em 2024:</p>
                <ul>
                    <li>Figma com Variants e Auto-layout avançado</li>
                    <li>Storybook 7.0 com melhor suporte a componentes</li>
                    <li>Tokens Studio para gestão de design tokens</li>
                    <li>Chromatic para testes visuais automatizados</li>
                </ul>
                
                <h3>Melhores Práticas</h3>
                <p>Recomendações para Design Systems modernos:</p>
                <ul>
                    <li>Documentação viva e interativa</li>
                    <li>Versionamento semântico</li>
                    <li>Testes automatizados</li>
                    <li>Feedback loop com usuários</li>
                </ul>
                
                <h3>Cases de Sucesso</h3>
                <p>Exemplos de empresas com Design Systems exemplares:</p>
                <ul>
                    <li>Material Design 3.0 (Google)</li>
                    <li>Polaris (Shopify)</li>
                    <li>Atlassian Design System</li>
                    <li>Carbon Design System (IBM)</li>
                </ul>
            `
        },
        3: {
            title: 'Web Components e o Futuro do Frontend',
            content: `
                <img src="../img/project-image.jpg" alt="Web Components - Interface moderna com componentes">
                <h2>Web Components e o Futuro do Frontend</h2>
                
                <p>Web Components estão se tornando cada vez mais relevantes no desenvolvimento frontend, oferecendo uma forma padronizada de criar componentes reutilizáveis que funcionam em qualquer framework.</p>
                
                <h3>Por que Web Components?</h3>
                <ul>
                    <li><strong>Interoperabilidade:</strong> Funcionam com qualquer framework ou biblioteca</li>
                    <li><strong>Encapsulamento:</strong> Shadow DOM para isolamento de estilos</li>
                    <li><strong>Reutilização:</strong> Componentes verdadeiramente portáveis</li>
                    <li><strong>Padronização:</strong> Parte da especificação web oficial</li>
                </ul>
                
                <h3>Tecnologias Fundamentais</h3>
                <p>Os pilares dos Web Components:</p>
                <ul>
                    <li>Custom Elements</li>
                    <li>Shadow DOM</li>
                    <li>HTML Templates</li>
                    <li>ES Modules</li>
                </ul>
                
                <h3>Frameworks e Bibliotecas</h3>
                <p>Ferramentas populares para Web Components:</p>
                <ul>
                    <li>Lit 3.0 (Google)</li>
                    <li>Stencil (Ionic)</li>
                    <li>Fast (Microsoft)</li>
                    <li>Hybrids</li>
                </ul>
                
                <h3>Casos de Uso</h3>
                <p>Exemplos práticos de uso de Web Components:</p>
                <ul>
                    <li>Microfrontends</li>
                    <li>Design Systems</li>
                    <li>Widgets embedáveis</li>
                    <li>Aplicações enterprise</li>
                </ul>
            `
        },
        4: {
            title: 'Motion Design na Era Digital',
            content: `
                <img src="../img/project-1.jpg" alt="Motion Design - Interface com animações e transições">
                <h2>Motion Design na Era Digital</h2>
                
                <p>O Motion Design se tornou um elemento crucial na experiência do usuário digital, criando interfaces mais intuitivas e engajantes através do movimento e da animação.</p>
                
                <h3>Princípios do Motion Design</h3>
                <ul>
                    <li><strong>Timing e Spacing:</strong> Criando animações naturais e fluidas</li>
                    <li><strong>Feedback Visual:</strong> Comunicando estados e ações</li>
                    <li><strong>Continuidade:</strong> Mantendo coerência nas transições</li>
                    <li><strong>Hierarquia:</strong> Guiando a atenção do usuário</li>
                </ul>
                
                <h3>Ferramentas e Tecnologias</h3>
                <p>Stack tecnológica para Motion Design:</p>
                <ul>
                    <li>After Effects para prototipagem</li>
                    <li>Lottie para animações web</li>
                    <li>GSAP para animações JavaScript</li>
                    <li>Framer Motion para React</li>
                </ul>
                
                <h3>Tendências em Motion Design</h3>
                <p>O que está em alta:</p>
                <ul>
                    <li>Microinterações responsivas</li>
                    <li>Animações 3D com WebGL</li>
                    <li>Scroll-driven animations</li>
                    <li>Animações adaptativas</li>
                </ul>
                
                <h3>Performance e Acessibilidade</h3>
                <p>Considerações importantes:</p>
                <ul>
                    <li>Otimização de performance</li>
                    <li>Redução de motion</li>
                    <li>Preferências do usuário</li>
                    <li>Fallbacks graciosos</li>
                </ul>
            `
        },
        5: {
            title: 'Acessibilidade: Além do WCAG',
            content: `
                <img src="../img/project-3.jpg" alt="Acessibilidade Web">
                <h2>Acessibilidade: Além do WCAG</h2>
                
                <p>A acessibilidade web está evoluindo além das diretrizes WCAG, focando em uma abordagem mais holística e centrada no usuário para criar experiências verdadeiramente inclusivas.</p>
                
                <h3>Além das Diretrizes</h3>
                <ul>
                    <li><strong>Design Inclusivo:</strong> Considerando diversidade desde o início</li>
                    <li><strong>Pesquisa com Usuários:</strong> Incluindo pessoas com deficiência no processo</li>
                    <li><strong>Tecnologias Assistivas:</strong> Compreendendo diferentes necessidades</li>
                    <li><strong>Cultura de Acessibilidade:</strong> Tornando-a parte do DNA da empresa</li>
                </ul>
                
                <h3>Tecnologias e Ferramentas</h3>
                <p>Recursos para melhorar a acessibilidade:</p>
                <ul>
                    <li>Axe DevTools para testes</li>
                    <li>NVDA e VoiceOver</li>
                    <li>Pa11y para CI/CD</li>
                    <li>Stark para design inclusivo</li>
                </ul>
                
                <h3>Tendências em Acessibilidade</h3>
                <p>Novidades no campo:</p>
                <ul>
                    <li>IA para geração de alt text</li>
                    <li>Personalização adaptativa</li>
                    <li>Overlays inteligentes</li>
                    <li>Testes automatizados avançados</li>
                </ul>
                
                <h3>Métricas e ROI</h3>
                <p>Benefícios mensuráveis:</p>
                <ul>
                    <li>Aumento de alcance</li>
                    <li>Melhor SEO</li>
                    <li>Redução de riscos legais</li>
                    <li>Satisfação do usuário</li>
                </ul>
            `
        },
        6: {
            title: 'Core Web Vitals em 2024',
            content: `
                <img src="../img/project-image.jpg" alt="Web Performance">
                <h2>Core Web Vitals em 2024: O Novo Padrão de Performance</h2>
                
                <p>Os Core Web Vitals continuam evoluindo e se tornando cada vez mais importantes para o sucesso de sites e aplicações web, com novos métricas e padrões sendo introduzidos.</p>
                
                <h3>Novas Métricas</h3>
                <ul>
                    <li><strong>LCP (Largest Contentful Paint):</strong> Agora com threshold mais rigoroso</li>
                    <li><strong>FID (First Input Delay):</strong> Substituído por INP em 2024</li>
                    <li><strong>CLS (Cumulative Layout Shift):</strong> Novas considerações para animações</li>
                    <li><strong>INP (Interaction to Next Paint):</strong> Nova métrica crucial</li>
                </ul>
                
                <h3>Ferramentas de Otimização</h3>
                <p>Stack tecnológica para performance:</p>
                <ul>
                    <li>Lighthouse CI</li>
                    <li>WebPageTest</li>
                    <li>Chrome UX Report</li>
                    <li>PageSpeed Insights</li>
                </ul>
                
                <h3>Estratégias de Otimização</h3>
                <p>Melhores práticas atualizadas:</p>
                <ul>
                    <li>Otimização de imagens com formatos modernos</li>
                    <li>Lazy loading inteligente</li>
                    <li>Estratégias de caching avançadas</li>
                    <li>Server-side rendering quando apropriado</li>
                </ul>
                
                <h3>Impacto nos Negócios</h3>
                <p>Benefícios de boa performance:</p>
                <ul>
                    <li>Melhor ranqueamento no Google</li>
                    <li>Aumento nas conversões</li>
                    <li>Redução de bounce rate</li>
                    <li>Maior engajamento do usuário</li>
                </ul>
            `
        }
    };

    // Abrir Modal
    document.querySelectorAll('.btn-view-project').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.getAttribute('data-post');
            const post = postsData[postId];

            if (post) {
                modalBody.innerHTML = post.content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modal.classList.add('modal-active');
                }, 10);
            }
        });
    });

    // Fechar Modal
    const closeModal = () => {
        modal.classList.remove('modal-active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };

    modalClose.addEventListener('click', closeModal);

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
