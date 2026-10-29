/* ============================================================
   POWER FIT — MÓDULO CONTROLE DE ACESSO
   ============================================================ */
function renderAcessos(){
  $('#acessosBody').innerHTML = db.acessos.map(a => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar ${avatarClass(a.id)}">${iniciais(a.aluno)}</div>
          <div><div class="name">${a.aluno}</div></div>
        </div>
      </td>
      <td><span class="muted" style="font-weight:700">#${a.id}</span></td>
      <td>${a.hora}</td>
      <td>${badge(a.status)}</td>
    </tr>`).join('');
}

function renderAccessChart(){
  const max = Math.max(...FLUXO_HORAS);
  $('#accessChart').innerHTML = FLUXO_HORAS.map(v => {
    const altura = Math.max(4, Math.round((v / max) * 100));
    return `<div class="mb ${v >= max * 0.8 ? 'hi' : ''}" style="height:${altura}%" title="${v} acessos"></div>`;
  }).join('');
}

function validarAcesso(e){
  e.preventDefault();
  const termo = $('#accessInput').value.trim().toLowerCase();
  const box = $('#accessResult');

  if(!termo){
    toast('Informe a matrícula ou o nome do aluno.', 'orange');
    return;
  }

  const aluno = db.alunos.find(a => a.id === termo || a.nome.toLowerCase().includes(termo));

  if(!aluno){
    box.className = 'access-result show bad';
    box.innerHTML = '<strong>Aluno não encontrado</strong><span>Verifique a matrícula ou o nome informado.</span>';
    toast('Aluno não encontrado na base.', 'orange');
    return;
  }

  const liberado = aluno.status === 'Ativo';

  db.acessos.unshift({
    aluno: aluno.nome,
    id: aluno.id,
    hora: 'Agora, ' + new Date().toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' }),
    status: liberado ? 'Liberado' : 'Bloqueado'
  });

  saveDB();
  renderAcessos();

  box.className = 'access-result show ' + (liberado ? 'good' : 'bad');
  box.innerHTML = `<strong>${liberado ? 'Acesso liberado' : 'Acesso bloqueado'}</strong>
    <span>${aluno.nome} · Plano ${aluno.plano} · ${liberado ? 'Plano ativo' : 'Mensalidade em atraso'}</span>`;

  toast(
    liberado ? `Acesso liberado para ${aluno.nome}.` : `Acesso bloqueado: ${aluno.nome} está inadimplente.`,
    liberado ? 'green' : 'orange'
  );

  $('#accessInput').value = '';
}

function simularQR(){
  const aluno = db.alunos[Math.floor(Math.random() * db.alunos.length)];
  $('#accessInput').value = aluno.id;
  validarAcesso({ preventDefault(){} });
}

/* ---------- Inicialização ---------- */
renderAcessos();
renderAccessChart();
