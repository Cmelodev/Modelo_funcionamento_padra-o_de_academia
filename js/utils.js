/* ============================================================
   POWER FIT — UTILITÁRIOS COMPARTILHADOS
   ============================================================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const fmt = valor => Number(valor).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
const iniciais = nome => nome.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
const avatarClass = id => ['green', 'orange', 'gray', ''][Number(id) % 4];
const hoje = () => new Date().toLocaleDateString('pt-BR');

const badgeMap = {
  Ativo:'green', Inadimplente:'orange', Inativo:'gray',
  Pago:'green', Pendente:'gray', Atrasado:'orange',
  Liberado:'green', Bloqueado:'orange'
};
const badge = status => `<span class="badge badge-${badgeMap[status] || 'gray'}">${status}</span>`;

function queryParam(nome){
  return new URLSearchParams(window.location.search).get(nome);
}

function opcoesAlunos(){
  return db.alunos.map(a => `<option value="${a.nome}">${a.nome}</option>`).join('');
}

/* ---------- Notificações ---------- */
function toast(msg, tipo = 'green'){
  const wrap = document.getElementById('toasts');
  if(!wrap) return;

  const el = document.createElement('div');
  el.className = 'toast' + (tipo === 'orange' ? ' orange' : '');
  el.innerHTML = `<svg class="i" style="width:17px;height:17px"><use href="#${tipo === 'orange' ? 'i-alert' : 'i-check'}"/></svg><span>${msg}</span>`;
  wrap.appendChild(el);

  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 220);
  }, 3400);
}

/* ---------- Modais ---------- */
function openModal(id){
  const modal = document.getElementById(id);
  if(!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id){
  const modal = document.getElementById(id);
  if(!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    $$('.modal.open').forEach(m => closeModal(m.id));
  }
});

/* ---------- Abas ---------- */
function switchTab(grupo, aba){
  $$(`[data-tabgroup="${grupo}"]`).forEach(b => b.classList.toggle('active', b.dataset.tab === aba));
  $$(`[data-panelgroup="${grupo}"]`).forEach(p => p.classList.toggle('active', p.dataset.panel === aba));
}
