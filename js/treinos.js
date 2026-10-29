/* ============================================================
   POWER FIT — MÓDULO FICHAS DE TREINO
   ============================================================ */
function renderFichas(){
  $('#fichasGrid').innerHTML = db.fichas.map((f, i) => {
    const aluno = db.alunos.find(a => a.nome === f.aluno);
    const id = aluno ? aluno.id : '000';
    return `
      <div class="workout-card">
        <div class="workout-head">
          <div class="user-cell">
            <div class="avatar ${avatarClass(id)}">${iniciais(f.aluno)}</div>
            <div>
              <div class="name">${f.aluno}</div>
              <div class="mail">Prof. ${f.prof}</div>
            </div>
          </div>
          <span class="badge badge-black">${f.objetivo}</span>
        </div>
        <div class="workout-days">
          ${f.dias.split('/').map(d => `<span class="day-chip">${d.trim()}</span>`).join('')}
          <span class="muted">${f.exercicios.length} exercícios</span>
        </div>
        <ul class="ex-list">
          ${f.exercicios.slice(0, 3).map(ex => `<li><span>${ex.nome}</span><b>${ex.series}×${ex.reps}</b><small>${ex.carga}</small></li>`).join('')}
        </ul>
        <div class="workout-foot">
          <button class="btn btn-ghost btn-sm" onclick="verFicha(${i})">Ver ficha completa</button>
          <button class="btn btn-green btn-sm" onclick="toast('Ficha enviada para ${f.aluno}.')">Enviar</button>
        </div>
      </div>`;
  }).join('');
}

function addExerciseRow(dados = {}){
  const row = document.createElement('div');
  row.className = 'ex-row';
  row.innerHTML = `
    <input class="input" placeholder="Exercício" value="${dados.nome || ''}">
    <input class="input" placeholder="4" value="${dados.series || ''}">
    <input class="input" placeholder="10" value="${dados.reps || ''}">
    <input class="input" placeholder="20 kg" value="${dados.carga || ''}">
    <button type="button" class="mini-btn danger" title="Remover" onclick="this.parentElement.remove()">
      <svg class="i"><use href="#i-x"/></svg>
    </button>`;
  $('#exRows').appendChild(row);
}

function abrirFichaModal(){
  $('#fi-aluno').innerHTML = opcoesAlunos();
  $('#exRows').innerHTML = '';
  addExerciseRow();
  addExerciseRow();
  addExerciseRow();
  openModal('modal-ficha');
}

function salvarFicha(e){
  e.preventDefault();

  const exercicios = $$('#exRows .ex-row').map(row => {
    const campos = row.querySelectorAll('input');
    return {
      nome: campos[0].value.trim(),
      series: campos[1].value.trim() || '—',
      reps: campos[2].value.trim() || '—',
      carga: campos[3].value.trim() || '—'
    };
  }).filter(ex => ex.nome);

  if(!exercicios.length){
    toast('Adicione pelo menos um exercício à ficha.', 'orange');
    return;
  }

  db.fichas.unshift({
    aluno: $('#fi-aluno').value,
    prof: $('#fi-prof').value,
    objetivo: $('#fi-objetivo').value,
    dias: $('#fi-dias').value,
    exercicios
  });

  saveDB();
  renderFichas();
  closeModal('modal-ficha');
  toast('Ficha de treino criada com sucesso.');
  e.target.reset();
}

function verFicha(i){
  const ficha = db.fichas[i];
  if(!ficha) return;

  $('#vf-title').textContent = 'Ficha de ' + ficha.aluno;
  $('#vf-body').innerHTML = `
    <div class="ficha-meta">
      <div><span>Professor</span><strong>${ficha.prof}</strong></div>
      <div><span>Objetivo</span><strong>${ficha.objetivo}</strong></div>
      <div><span>Divisão</span><strong>${ficha.dias}</strong></div>
    </div>
    <div class="table-wrap" style="border:1px solid var(--line-soft);border-radius:12px">
      <table>
        <thead><tr><th>Exercício</th><th>Séries</th><th>Reps</th><th>Carga</th></tr></thead>
        <tbody>
          ${ficha.exercicios.map(ex => `<tr><td><b>${ex.nome}</b></td><td>${ex.series}</td><td>${ex.reps}</td><td>${ex.carga}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  openModal('modal-ficha-view');
}

/* ---------- Inicialização ---------- */
renderFichas();
