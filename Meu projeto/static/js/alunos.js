/* ============================================================
   POWER FIT — MÓDULO ALUNOS
   ============================================================ */
let editingAlunoId = null;

function atualizarBadgeAlunos(){
  const badgeEl = document.querySelector('.nav-item[data-page="alunos"] .nav-badge');
  if(badgeEl) badgeEl.textContent = db.alunos.length;
}

function renderAlunos(){
  const busca = $('#alunoSearch').value.toLowerCase().trim();
  const status = $('#alunoStatus').value;
  const plano = $('#alunoPlano').value;

  const lista = db.alunos.filter(a => {
    const buscaOk = (a.nome + ' ' + a.email + ' ' + a.id).toLowerCase().includes(busca);
    const statusOk = status === 'Todos' || a.status === status;
    const planoOk = plano === 'Todos' || a.plano === plano;
    return buscaOk && statusOk && planoOk;
  });

  $('#alunosBody').innerHTML = lista.length ? lista.map(a => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar ${avatarClass(a.id)}">${iniciais(a.nome)}</div>
          <div>
            <div class="name">${a.nome}</div>
            <div class="mail">${a.email}</div>
          </div>
        </div>
      </td>
      <td><span class="muted" style="font-weight:700">#${a.id}</span></td>
      <td><span class="plan-tag">${a.plano}</span></td>
      <td>${badge(a.status)}</td>
      <td>${a.pagamento}</td>
      <td>${a.prof}</td>
      <td>
        <div class="row-actions" style="justify-content:flex-end">
          <button class="mini-btn" title="Editar aluno" onclick="abrirAlunoModal('${a.id}')">
            <svg class="i"><use href="#i-edit"/></svg>
          </button>
          <button class="mini-btn danger" title="Excluir aluno" onclick="excluirAluno('${a.id}')">
            <svg class="i"><use href="#i-trash"/></svg>
          </button>
        </div>
      </td>
    </tr>`).join('') : `<tr><td colspan="7"><div class="empty">Nenhum aluno encontrado para os filtros aplicados.</div></td></tr>`;

  $('#alunoCount').textContent = `${lista.length} resultado(s)`;
  $('#alunoCount2').textContent = lista.length;
  atualizarBadgeAlunos();
}

function abrirAlunoModal(id){
  editingAlunoId = id || null;
  const aluno = id ? db.alunos.find(a => a.id === id) : null;

  $('#modal-aluno-title').textContent = aluno ? 'Editar aluno' : 'Novo aluno';
  $('#al-nome').value = aluno ? aluno.nome : '';
  $('#al-email').value = aluno ? aluno.email : '';
  $('#al-tel').value = aluno ? aluno.tel : '';
  $('#al-plano').value = aluno ? aluno.plano : 'Mensal';
  $('#al-status').value = aluno ? aluno.status : 'Ativo';
  $('#al-prof').value = aluno ? aluno.prof : 'Rafael Souza';

  openModal('modal-aluno');
}

function salvarAluno(e){
  e.preventDefault();

  const dados = {
    nome: $('#al-nome').value.trim(),
    email: $('#al-email').value.trim(),
    tel: $('#al-tel').value.trim() || '—',
    plano: $('#al-plano').value,
    status: $('#al-status').value,
    prof: $('#al-prof').value
  };

  if(editingAlunoId){
    const aluno = db.alunos.find(a => a.id === editingAlunoId);
    Object.assign(aluno, dados);
    toast('Dados do aluno atualizados com sucesso.');
  } else {
    const proximo = (db.alunos.length ? Math.max(...db.alunos.map(a => Number(a.id))) : 0) + 1;
    db.alunos.unshift({
      id: String(proximo).padStart(3, '0'),
      ...dados,
      desde: hoje(),
      pagamento: '—'
    });
    toast('Aluno cadastrado com sucesso.');
  }

  saveDB();
  renderAlunos();
  closeModal('modal-aluno');
  e.target.reset();
}

function excluirAluno(id){
  const aluno = db.alunos.find(a => a.id === id);
  if(!aluno) return;
  if(!confirm(`Excluir o aluno "${aluno.nome}"? Esta ação não pode ser desfeita.`)) return;

  db.alunos = db.alunos.filter(a => a.id !== id);
  saveDB();
  renderAlunos();
  toast('Aluno removido do cadastro.', 'orange');
}

/* ---------- Inicialização ---------- */
const buscaInicial = queryParam('q');
if(buscaInicial) $('#alunoSearch').value = buscaInicial;

renderAlunos();

if(queryParam('novo') === '1') abrirAlunoModal();
