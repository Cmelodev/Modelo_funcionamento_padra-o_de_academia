/* ============================================================
   POWER FIT — LAYOUT COMPARTILHADO
   Sidebar, topbar, perfil e autenticação Google (simulada)
   ============================================================ */

const AUTH_KEY = 'powerfit_auth';
const usuarioGoogle = {
  nome: 'Leandro Silva',
  email: 'leandro.silva@gmail.com',
  cargo: 'Administrador',
  iniciais: 'LS'
};

function lerAuth(){
  try {
    const valor = localStorage.getItem(AUTH_KEY);
    if(!valor || valor === '0') return null;
    if(valor === '1' || valor === 'admin') return { role:'admin' };
    if(valor.startsWith('aluno:')) return { role:'aluno', nome: valor.slice(6) };
    return null;
  } catch (erro) {
    return { role:'admin' };
  }
}

function gravarAuth(auth){
  try {
    if(!auth) { localStorage.setItem(AUTH_KEY, '0'); return; }
    if(auth.role === 'admin') localStorage.setItem(AUTH_KEY, 'admin');
    else if(auth.role === 'aluno') localStorage.setItem(AUTH_KEY, 'aluno:' + auth.nome);
  } catch (erro) { /* armazenamento indisponível */ }
}

var auth = lerAuth();
// visitante (não logado) mantém acesso de demonstração, mas exibe opções de login

/* ---------- Sidebar ---------- */
const NAV_PRINCIPAL = [
  { page:'dashboard', href:'index.html',      icone:'i-grid',  label:'Dashboard' },
  { page:'alunos',    href:'alunos.html',    icone:'i-users', label:'Alunos', badge:true },
  { page:'financeiro',href:'financeiro.html',icone:'i-card',  label:'Financeiro' },
  { page:'acessos',   href:'acessos.html',   icone:'i-door',  label:'Controle de acesso' }
];

const NAV_TREINO = [
  { page:'treinos',    href:'treinos.html',    icone:'i-dumbbell', label:'Fichas de treino' },
  { page:'relatorios', href:'relatorios.html', icone:'i-chart',    label:'Relatórios' }
];

const NAV_PORTAL = [
  { page:'aluno', href:'aluno.html', icone:'i-user', label:'Portal do aluno' }
];

function itemNav(item){
  const paginaAtual = document.body.dataset.page;
  const ativo = paginaAtual === item.page ? ' active' : '';
  const badgeHtml = item.badge && db.alunos.length
    ? `<span class="nav-badge">${db.alunos.length}</span>`
    : '';
  return `<a class="nav-item${ativo}" data-page="${item.page}" href="${item.href}">
      <svg class="i"><use href="#${item.icone}"/></svg> ${item.label}${badgeHtml}
    </a>`;
}

function montarSidebar(){
  const raiz = document.getElementById('sidebar-root');
  if(!raiz) return;

const isAdmin = auth && auth.role === 'admin';
  const isAluno = auth && auth.role === 'aluno';

  raiz.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <a class="brand-link" href="index.html" title="Voltar ao início">
          <div class="brand-mark">
            <svg class="i" style="stroke:#052e16"><use href="#i-dumbbell"/></svg>
          </div>
          <div>
            <div class="brand-name">POWER<span>FIT</span></div>
            <div class="brand-sub">ACADEMIA</div>
          </div>
        </a>
        <button class="icon-btn close-side" onclick="closeSidebar()" style="background:#17171b;border-color:#26262c;color:#d4d4d8" aria-label="Fechar menu">
          <svg class="i"><use href="#i-x"/></svg>
        </button>
      </div>

      <nav class="nav">
        ${isAdmin || !auth ? `
        <div class="nav-label">PRINCIPAL</div>
        ${NAV_PRINCIPAL.map(itemNav).join('')}
        <div class="nav-label">TREINAMENTO</div>
        ${NAV_TREINO.map(itemNav).join('')}
        ` : ''}
        <div class="nav-label">PORTAL</div>
        ${NAV_PORTAL.map(itemNav).join('')}
      </nav>

      <div class="sidebar-foot">
        <div class="sf-status"><span class="dot-live"></span> Sistema online</div>
        <div class="sf-sub">Versão 2.0 · Módulos independentes</div>
        <div class="sf-bar"><span></span></div>
      </div>
    </aside>`;
}

/* ---------- Topbar ---------- */
function montarTopbar(){
  const raiz = document.getElementById('topbar-root');
  if(!raiz) return;

  raiz.innerHTML = `
    <header class="topbar">
      <button class="icon-btn menu-btn" onclick="toggleSidebar()" aria-label="Abrir menu">
        <svg class="i"><use href="#i-menu"/></svg>
      </button>

      <a class="topbar-brand" href="index.html" title="Voltar ao início">
        <div class="brand-mark" style="width:34px;height:34px;border-radius:10px">
          <svg class="i" style="width:19px;height:19px;stroke:#052e16"><use href="#i-dumbbell"/></svg>
        </div>
        <div class="brand-name">POWER<span>FIT</span></div>
      </a>

      <form class="search-box" onsubmit="buscarGlobal(event)" role="search">
        <svg class="i"><use href="#i-search"/></svg>
        <input id="globalSearch" placeholder="Buscar aluno, matrícula..." autocomplete="off">
      </form>

      <div class="topbar-spacer"></div>

      <button class="icon-btn" onclick="toast('Você tem 4 mensalidades vencendo hoje.','orange')" aria-label="Notificações">
        <svg class="i"><use href="#i-bell"/></svg><span class="dot-notif"></span>
      </button>

      <div class="profile-wrap">
        <button class="profile-btn" id="profileBtn" onclick="toggleProfileMenu(event)" aria-label="Abrir menu do perfil" aria-expanded="false">
          <div class="avatar" id="profileAvatar">LS</div>
          <div class="profile-info">
            <strong id="profileName">Leandro Silva</strong>
            <span id="profileRole">Administrador</span>
          </div>
          <svg class="i"><use href="#i-chevron"/></svg>
        </button>

        <div class="profile-menu" id="profileMenu">
          <div class="pm-head">
            <div class="avatar" id="pmAvatar">LS</div>
            <div class="pm-id">
              <strong id="pmName">Leandro Silva</strong>
              <span id="pmEmail">leandro.silva@gmail.com</span>
            </div>
          </div>
          <div class="pm-status" id="pmStatus"><span class="dot-live"></span> Conta Google conectada</div>
          <div class="pm-divider"></div>

          <button class="btn btn-logout btn-block" id="pmLogout" onclick="sairConta()" style="display:none">
            <svg class="i"><use href="#i-logout"/></svg> Sair da conta
          </button>

          <button class="btn btn-google btn-block" id="pmLoginAdmin" onclick="entrarGoogle()" style="display:none">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Entrar como Administrador
          </button>

          <button class="btn btn-green btn-block" id="pmLoginAluno" onclick="entrarAluno()" style="display:none">
            <svg class="i"><use href="#i-user"/></svg> Entrar como Aluno
          </button>

          <p class="pm-hint" id="pmHint" style="display:none">Entre como administrador (Google) ou como aluno para acessar o sistema.</p>
        </div>
      </div>
    </header>`;

  renderAuth();
}

/* ---------- Navegação lateral ---------- */
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

function closeSidebar(){
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if(sidebar) sidebar.classList.remove('open');
  if(overlay) overlay.classList.remove('show');
}

function buscarGlobal(e){
  e.preventDefault();
  const termo = document.getElementById('globalSearch').value.trim();
  window.location.href = 'alunos.html' + (termo ? '?q=' + encodeURIComponent(termo) : '');
}

/* ---------- Perfil / autenticação ---------- */
function toggleProfileMenu(e){
  if(e) e.stopPropagation();
  const menu = document.getElementById('profileMenu');
  if(!menu) return;
  const aberto = menu.classList.toggle('open');
  document.getElementById('profileBtn').setAttribute('aria-expanded', aberto ? 'true' : 'false');
}

function closeProfileMenu(){
  const menu = document.getElementById('profileMenu');
  const btn = document.getElementById('profileBtn');
  if(menu) menu.classList.remove('open');
  if(btn) btn.setAttribute('aria-expanded', 'false');
}

function renderAuth(){
  if(!document.getElementById('profileName')) return;

  const isAdmin = auth && auth.role === 'admin';
  const isAluno = auth && auth.role === 'aluno';
  const nomeExibido = isAdmin ? usuarioGoogle.nome : (isAluno ? auth.nome : 'Visitante');
  const emailExibido = isAdmin ? usuarioGoogle.email : (isAluno ? 'Aluno' : 'Nenhuma conta conectada');
  const iniciaisExibidas = isAdmin ? usuarioGoogle.iniciais : (isAluno ? iniciais(auth.nome) : '?');
  const cargoExibido = isAdmin ? usuarioGoogle.cargo : (isAluno ? 'Aluno' : 'Entrar no sistema');

  $('#profileAvatar').textContent = iniciaisExibidas;
  $('#profileName').textContent = nomeExibido;
  $('#profileRole').textContent = cargoExibido;
  $('#pmAvatar').textContent = iniciaisExibidas;
  $('#pmName').textContent = nomeExibido;
  $('#pmEmail').textContent = emailExibido;
  $('#pmStatus').style.display = (isAdmin || isAluno) ? 'flex' : 'none';
  $('#pmLogout').style.display = (isAdmin || isAluno) ? 'flex' : 'none';
  $('#pmHint').style.display = (isAdmin || isAluno) ? 'none' : 'block';
  $('#profileAvatar').className = 'avatar' + ((isAdmin || isAluno) ? '' : ' gray');
  $('#pmAvatar').className = 'avatar' + ((isAdmin || isAluno) ? '' : ' gray');

  // Atualiza botões de login (admin x aluno)
  const loginAdmin = document.getElementById('pmLoginAdmin');
  const loginAluno = document.getElementById('pmLoginAluno');
  if(loginAdmin) loginAdmin.style.display = (isAdmin || isAluno) ? 'none' : 'flex';
  if(loginAluno) loginAluno.style.display = (isAdmin || isAluno) ? 'none' : 'flex';
}

function entrarGoogle(){
  auth = { role:'admin' };
  gravarAuth(auth);
  renderAuth();
  closeProfileMenu();
  toast('Login realizado como Administrador. Bem-vindo, ' + usuarioGoogle.nome + '!');
  if(document.body.dataset.page !== 'dashboard') window.location.href = 'index.html';
}

function entrarAluno(){
  const nome = prompt('Digite seu nome de aluno (conforme cadastro):');
  if(!nome) return;
  const aluno = db.alunos.find(a => a.nome.toLowerCase() === nome.trim().toLowerCase());
  if(!aluno){
    toast('Aluno não encontrado no cadastro.', 'orange');
    return;
  }
  auth = { role:'aluno', nome: aluno.nome };
  gravarAuth(auth);
  renderAuth();
  closeProfileMenu();
  toast('Login realizado. Bem-vindo, ' + aluno.nome + '!');
  window.location.href = 'aluno.html?aluno=' + encodeURIComponent(aluno.nome);
}

function sairConta(){
  auth = null;
  gravarAuth(null);
  renderAuth();
  closeProfileMenu();
  toast('Você saiu da conta.', 'orange');
  window.location.href = 'index.html';
}

/* ---------- Eventos globais ---------- */
document.addEventListener('click', e => {
  if(!e.target.closest('.profile-wrap')) closeProfileMenu();
});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    closeProfileMenu();
    closeSidebar();
  }
});

montarSidebar();
montarTopbar();

/* ---------- Guarda de permissão ---------- */
(function(){
  const pagina = document.body.dataset.page;
  const isAluno = auth && auth.role === 'aluno';
  if(isAluno && pagina !== 'aluno'){
    window.location.replace('aluno.html?aluno=' + encodeURIComponent(auth.nome));
  }
})();
