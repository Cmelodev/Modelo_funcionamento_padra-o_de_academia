/* ============================================================
   POWER FIT — MÓDULO RELATÓRIOS
   Os indicadores consolidados virão da API em produção.
   ============================================================ */
function filtrarPeriodo(periodo){
  toast('Período atualizado: ' + periodo, 'green');
}

function exportarRelatorio(){
  toast('Relatório consolidado exportado em PDF.', 'orange');
}
