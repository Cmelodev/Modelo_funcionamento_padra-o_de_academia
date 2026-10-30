/* ============================================================
   POWER FIT — PORTAL DO ALUNO
   ============================================================ */
function popularSeletorAlunos(){
  const sel = $('#alunoSelector');
  if(!sel) return;
  const isAluno = window.auth && window.auth.role === 'aluno';
  if(isAluno){
    sel.innerHTML = `<option value="${window.auth.nome}">${window.auth.nome}</option>`;
    sel.value = window.auth.nome;
    sel.disabled = true;
    sel.style.display = 'none';
    return;
  }
  sel.innerHTML = db.alunos.map(a => `<option value="${a.nome}">${a.nome}</option>`).join('');
}

function selecionarAluno(nome){
  const url = new URL(window.location.href);
  url.searchParams.set('aluno', nome);
  window.history.replaceState({}, '', url);
  renderPortal();
}

function renderPortal(){
  const nomeParam = queryParam('aluno');
  const isAluno = window.auth && window.auth.role === 'aluno';
  const nome = isAluno ? window.auth.nome : (nomeParam || (db.alunos[0] ? db.alunos[0].nome : ''));
  const sel = $('#alunoSelector');
  if(sel && nome) sel.value = nome;

  const aluno = db.alunos.find(a => a.nome === nome);

  // Dados
  const dadosEl = $('#alunoDados');
  if(aluno){
    dadosEl.innerHTML = `
      <div class="user-cell" style="margin-bottom:12px">
        <div class="avatar ${avatarClass(aluno.id)}">${iniciais(aluno.nome)}</div>
        <div>
          <div class="name">${aluno.nome}</div>
          <div class="mail">${aluno.email}</div>
        </div>
      </div>
      <div class="ficha-meta">
        <div><span>Matrícula</span><strong>#${aluno.id}</strong></div>
        <div><span>Telefone</span><strong>${aluno.tel}</strong></div>
        <div><span>Plano</span><strong>${aluno.plano}</strong></div>
        <div><span>Professor</span><strong>${aluno.prof}</strong></div>
        <div><span>Cadastro</span><strong>${aluno.desde}</strong></div>
        <div><span>Status</span><strong>${badge(aluno.status)}</strong></div>
      </div>`;
  } else {
    dadosEl.innerHTML = '<div class="empty">Aluno não encontrado.</div>';
  }

  // Plano
  const planoEl = $('#alunoPlano');
  if(aluno){
    const valor = PLANOS_VALORES[aluno.plano] || 0;
    planoEl.innerHTML = `
      <div class="metric" style="box-shadow:none;border:1px solid var(--line-soft)">
        <div class="metric-value" style="font-size:22px">${aluno.status}</div>
        <div class="metric-label">Situação do cadastro</div>
        <div class="metric-foot"><span class="muted">Mensalidade: ${fmt(valor)}</span></div>
      </div>
      <div style="margin-top:12px">
        <div class="muted" style="font-size:12px">Último pagamento</div>
        <div style="font-weight:700">${aluno.pagamento}</div>
      </div>`;
  } else {
    planoEl.innerHTML = '<div class="empty">—</div>';
  }

  // Ficha
  const fichaEl = $('#alunoFicha');
  const ficha = db.fichas.find(f => f.aluno === nome);
  if(ficha){
    fichaEl.innerHTML = `
      <div class="ficha-meta">
        <div><span>Professor</span><strong>${ficha.prof}</strong></div>
        <div><span>Objetivo</span><strong>${ficha.objetivo}</strong></div>
        <div><span>Divisão</span><strong>${ficha.dias}</strong></div>
        <div><span>Exercícios</span><strong>${ficha.exercicios.length}</strong></div>
      </div>
      <div class="table-wrap" style="border:1px solid var(--line-soft);border-radius:12px;margin-top:12px">
        <table>
          <thead><tr><th>Exercício</th><th>Séries</th><th>Reps</th><th>Carga</th></tr></thead>
          <tbody>
            ${ficha.exercicios.map(ex => `<tr><td><b>${ex.nome}</b></td><td>${ex.series}</td><td>${ex.reps}</td><td>${ex.carga}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } else {
    fichaEl.innerHTML = '<div class="empty">Nenhuma ficha de treino cadastrada para este aluno.</div>';
  }

  // Acessos
  const acessos = db.acessos.filter(a => a.aluno === nome).slice(0, 10);
  $('#alunoAcessos').innerHTML = acessos.length
    ? acessos.map(a => `<tr><td>${a.hora}</td><td>${badge(a.status)}</td></tr>`).join('')
    : `<tr><td colspan="2"><div class="empty">Nenhum acesso registrado.</div></td></tr>`;
}

/* ---------- Inicialização ---------- */
popularSeletorAlunos();
const isAluno = window.auth && window.auth.role === 'aluno';
const inicial = isAluno ? window.auth.nome : (queryParam('aluno') || (db.alunos[0] ? db.alunos[0].nome : ''));
if(inicial) selecionarAluno(inicial);
else renderPortal();
