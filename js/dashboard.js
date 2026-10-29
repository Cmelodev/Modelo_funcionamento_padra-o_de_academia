/* ============================================================
   POWER FIT — MÓDULO DASHBOARD
   ============================================================ */
function renderDashboard(){
  const listaAcessos = document.getElementById('dashAcessos');
  const listaAtrasados = document.getElementById('dashAtrasados');
  if(!listaAcessos || !listaAtrasados) return;

  listaAcessos.innerHTML = db.acessos.slice(0, 5).map(a => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar ${avatarClass(a.id)}">${iniciais(a.aluno)}</div>
          <div>
            <div class="name">${a.aluno}</div>
            <div class="mail">#${a.id}</div>
          </div>
        </div>
      </td>
      <td>${a.hora}</td>
      <td>${badge(a.status)}</td>
    </tr>`).join('');

  const atrasados = db.alunos.filter(a => a.status === 'Inadimplente');
  const diasAtraso = [12, 8, 5, 21];

  listaAtrasados.innerHTML = atrasados.length
    ? atrasados.map((a, i) => `
      <div class="overdue-item">
        <div class="avatar ${avatarClass(a.id)}">${iniciais(a.nome)}</div>
        <div class="info">
          <div class="name">${a.nome}</div>
          <div class="sub">${diasAtraso[i] || 7} dias em atraso</div>
        </div>
        <span class="val">${fmt(PLANOS_VALORES[a.plano] || 129.9)}</span>
        <button class="btn btn-orange btn-sm" onclick="cobrar('${a.nome}')">Cobrar</button>
      </div>`).join('')
    : '<div class="empty">Nenhuma mensalidade em atraso. Tudo em dia!</div>';
}

function cobrar(nome){
  toast(`Lembrete de cobrança enviado para ${nome}.`, 'orange');
}

renderDashboard();
