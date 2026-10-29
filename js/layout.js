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
    return valor === null ? true : valor === '1';
  } catch (erro) {
    return true;
  }
}

function gravarAuth(logado){
  try {
    localStorage.setItem(AUTH_KEY, logado ? '1' : '0');
  } catch (erro) { /* armazenamento indisponível */ }
}

var contaGoogle = lerAuth();

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
        <div class="nav-label">PRINCIPAL</div>
        ${NAV_PRINCIPAL.map(itemNav).join('')}
        <div class="nav-label">TREINAMENTO</div>
        ${NAV_TREINO.map(itemNav).join('')}
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

          <button class="btn btn-logout btn-block" id="pmLogout" onclick="sairGoogle()">
            <svg class="i"><use href="#i-logout"/></svg> Sair da conta
          </button>

          <button class="btn btn-google btn-block" id="pmLogin" onclick="entrarGoogle()" style="display:none">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Entrar com Google
          </button>

          <p class="pm-hint" id="pmHint" style="display:none">Entre com sua conta Google para acessar os dados administrativos da academia.</p>
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

  $('#profileAvatar').textContent = contaGoogle ? usuarioGoogle.iniciais : '?';
  $('#profileName').textContent = contaGoogle ? usuarioGoogle.nome : 'Visitante';
  $('#profileRole').textContent = contaGoogle ? usuarioGoogle.cargo : 'Entrar com Google';
  $('#pmAvatar').textContent = contaGoogle ? usuarioGoogle.iniciais : '?';
  $('#pmName').textContent = contaGoogle ? usuarioGoogle.nome : 'Visitante';
  $('#pmEmail').textContent = contaGoogle ? usuarioGoogle.email : 'Nenhuma conta conectada';
  $('#pmStatus').style.display = contaGoogle ? 'flex' : 'none';
  $('#pmLogout').style.display = contaGoogle ? 'flex' : 'none';
  $('#pmLogin').style.display = contaGoogle ? 'none' : 'flex';
  $('#pmHint').style.display = contaGoogle ? 'none' : 'block';
  $('#profileAvatar').className = 'avatar' + (contaGoogle ? '' : ' gray');
  $('#pmAvatar').className = 'avatar' + (contaGoogle ? '' : ' gray');
}

function entrarGoogle(){
  contaGoogle = true;
  gravarAuth(true);
  renderAuth();
  closeProfileMenu();
  toast('Login realizado com Google. Bem-vindo, ' + usuarioGoogle.nome + '!');
}

function sairGoogle(){
  contaGoogle = false;
  gravarAuth(false);
  renderAuth();
  closeProfileMenu();
  toast('Você saiu da conta. Para continuar, entre com o Google.', 'orange');
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
