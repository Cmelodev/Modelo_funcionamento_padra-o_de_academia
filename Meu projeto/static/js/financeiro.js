/* ============================================================
   POWER FIT — MÓDULO FINANCEIRO
   ============================================================ */
function renderPagamentos(){
  $('#pagBody').innerHTML = db.pagamentos.map((p, i) => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar ${['green','orange','gray',''][i % 4]}">${iniciais(p.aluno)}</div>
          <div><div class="name">${p.aluno}</div></div>
        </div>
      </td>
      <td><span class="plan-tag">${p.plano}</span></td>
      <td><b>${fmt(p.valor)}</b></td>
      <td>${p.venc}</td>
      <td>${badge(p.status)}</td>
      <td style="text-align:right">
        ${p.status === 'Pago'
          ? `<span class="muted" style="font-size:11px">${p.data}</span>`
          : `<button class="btn btn-orange btn-sm" onclick="receberPagamento(${i})">Receber</button>`}
      </td>
    </tr>`).join('');
}

function receberPagamento(i){
  const pagamento = db.pagamentos[i];
  pagamento.status = 'Pago';
  pagamento.data = hoje();

  const aluno = db.alunos.find(a => a.nome === pagamento.aluno);
  if(aluno){
    aluno.pagamento = pagamento.data;
    if(aluno.status === 'Inadimplente') aluno.status = 'Ativo';
  }

  saveDB();
  renderPagamentos();
  toast('Pagamento registrado no histórico financeiro.');
}

function abrirPagamentoModal(){
  $('#pg-aluno').innerHTML = opcoesAlunos();
  const hojeISO = new Date().toISOString().slice(0, 10);
  $('#pg-venc').value = hojeISO;
  $('#pg-status').value = 'Pago';
  openModal('modal-pagamento');
}

function salvarPagamento(e){
  e.preventDefault();

  const alunoNome = $('#pg-aluno').value;
  const plano = $('#pg-plano').value;
  const valor = parseFloat($('#pg-valor').value) || 0;
  const status = $('#pg-status').value;
  const dataInput = $('#pg-venc').value;
  const venc = dataInput ? new Date(dataInput + 'T12:00:00').toLocaleDateString('pt-BR') : hoje();

  db.pagamentos.unshift({
    aluno: alunoNome,
    plano,
    valor,
    venc,
    status,
    data: status === 'Pago' ? hoje() : '—'
  });

  const aluno = db.alunos.find(a => a.nome === alunoNome);
  if(aluno){
    if(status === 'Pago') aluno.pagamento = hoje();
    if(status === 'Pago' && aluno.status === 'Inadimplente') aluno.status = 'Ativo';
    if(status === 'Atrasado') aluno.status = 'Inadimplente';
  }

  saveDB();
  renderPagamentos();
  closeModal('modal-pagamento');
  toast('Pagamento registrado com sucesso.');
  e.target.reset();
}

/* ---------- Inicialização ---------- */
$('#pg-aluno').innerHTML = opcoesAlunos();
renderPagamentos();
