/* ============================================================
   POWER FIT — CAMADA DE DADOS
   Dados de demonstração + persistência local (localStorage)
   ============================================================ */
const DB_KEY = 'powerfit_db_v1';

const SEED = {
  alunos: [
    { id:'001', nome:'Lucas Almeida',    email:'lucas.almeida@email.com',    tel:'(11) 98812-4477', plano:'Mensal',     status:'Ativo',        desde:'12/01/2025', pagamento:'05/10/2026', prof:'Rafael Souza' },
    { id:'002', nome:'Beatriz Costa',    email:'beatriz.costa@email.com',    tel:'(11) 99145-8821', plano:'Trimestral', status:'Ativo',        desde:'03/03/2025', pagamento:'09/10/2026', prof:'Amanda Lima' },
    { id:'003', nome:'Gabriel Martins',  email:'gabriel.martins@email.com',  tel:'(11) 97733-1290', plano:'Mensal',     status:'Inadimplente', desde:'21/05/2024', pagamento:'05/09/2026', prof:'Bruno Carvalho' },
    { id:'004', nome:'Mariana Ribeiro',  email:'mariana.ribeiro@email.com',  tel:'(11) 98220-6644', plano:'Semestral',  status:'Ativo',        desde:'14/08/2025', pagamento:'15/10/2026', prof:'Rafael Souza' },
    { id:'005', nome:'Pedro Henrique',   email:'pedro.henrique@email.com',   tel:'(11) 96555-2031', plano:'Mensal',     status:'Inadimplente', desde:'07/02/2025', pagamento:'05/09/2026', prof:'Amanda Lima' },
    { id:'006', nome:'Camila Nogueira',  email:'camila.nogueira@email.com',  tel:'(11) 99887-4410', plano:'Anual',      status:'Ativo',        desde:'19/11/2024', pagamento:'02/10/2026', prof:'Bruno Carvalho' },
    { id:'007', nome:'Rafael Torres',    email:'rafael.torres@email.com',    tel:'(11) 97441-9982', plano:'Trimestral', status:'Inativo',      desde:'10/06/2023', pagamento:'10/07/2026', prof:'Rafael Souza' },
    { id:'008', nome:'Juliana Prado',    email:'juliana.prado@email.com',    tel:'(11) 98119-7753', plano:'Mensal',     status:'Ativo',        desde:'02/09/2025', pagamento:'08/10/2026', prof:'Amanda Lima' }
  ],
  pagamentos: [
    { aluno:'Lucas Almeida',   plano:'Mensal',     valor:129.90,  venc:'05/10/2026', status:'Pago',     data:'05/10/2026' },
    { aluno:'Beatriz Costa',   plano:'Trimestral', valor:349.90,  venc:'10/10/2026', status:'Pago',     data:'09/10/2026' },
    { aluno:'Gabriel Martins', plano:'Mensal',     valor:129.90,  venc:'05/09/2026', status:'Atrasado', data:'—' },
    { aluno:'Mariana Ribeiro', plano:'Semestral',  valor:649.90,  venc:'15/10/2026', status:'Pendente', data:'—' },
    { aluno:'Pedro Henrique',  plano:'Mensal',     valor:129.90,  venc:'05/09/2026', status:'Atrasado', data:'—' },
    { aluno:'Camila Nogueira', plano:'Anual',      valor:1199.90, venc:'02/10/2026', status:'Pago',     data:'02/10/2026' },
    { aluno:'Juliana Prado',   plano:'Mensal',     valor:129.90,  venc:'08/10/2026', status:'Pago',     data:'08/10/2026' },
    { aluno:'Rafael Torres',   plano:'Trimestral', valor:349.90,  venc:'10/07/2026', status:'Pago',     data:'10/07/2026' }
  ],
  acessos: [
    { aluno:'Lucas Almeida',   id:'001', hora:'Hoje, 07:42', status:'Liberado'  },
    { aluno:'Beatriz Costa',   id:'002', hora:'Hoje, 08:05', status:'Liberado'  },
    { aluno:'Gabriel Martins', id:'003', hora:'Hoje, 08:17', status:'Bloqueado' },
    { aluno:'Mariana Ribeiro', id:'004', hora:'Hoje, 09:23', status:'Liberado'  },
    { aluno:'Pedro Henrique',  id:'005', hora:'Hoje, 10:04', status:'Bloqueado' },
    { aluno:'Camila Nogueira', id:'006', hora:'Hoje, 11:36', status:'Liberado'  },
    { aluno:'Juliana Prado',   id:'008', hora:'Hoje, 12:11', status:'Liberado'  }
  ],
  fichas: [
    { aluno:'Lucas Almeida', prof:'Rafael Souza', objetivo:'Hipertrofia', dias:'A/B/C', exercicios:[
      { nome:'Supino reto', series:'4', reps:'10', carga:'60 kg' },
      { nome:'Crucifixo inclinado', series:'3', reps:'12', carga:'18 kg' },
      { nome:'Desenvolvimento militar', series:'4', reps:'8', carga:'40 kg' },
      { nome:'Tríceps corda', series:'3', reps:'15', carga:'25 kg' }
    ]},
    { aluno:'Beatriz Costa', prof:'Amanda Lima', objetivo:'Emagrecimento', dias:'A/B', exercicios:[
      { nome:'Agachamento livre', series:'4', reps:'12', carga:'30 kg' },
      { nome:'Leg press', series:'3', reps:'15', carga:'80 kg' },
      { nome:'Esteira inclinada', series:'1', reps:'25 min', carga:'—' }
    ]},
    { aluno:'Mariana Ribeiro', prof:'Rafael Souza', objetivo:'Força', dias:'A/B/C', exercicios:[
      { nome:'Levantamento terra', series:'5', reps:'5', carga:'70 kg' },
      { nome:'Remada curvada', series:'4', reps:'8', carga:'45 kg' },
      { nome:'Barra fixa', series:'3', reps:'6', carga:'Peso corporal' }
    ]},
    { aluno:'Camila Nogueira', prof:'Bruno Carvalho', objetivo:'Resistência', dias:'A/B', exercicios:[
      { nome:'Afundo com halteres', series:'3', reps:'14', carga:'12 kg' },
      { nome:'Puxada alta', series:'3', reps:'12', carga:'35 kg' },
      { nome:'Abdominal prancha', series:'3', reps:'40 s', carga:'—' }
    ]}
  ]
};

const PLANOS_VALORES = { Mensal:129.90, Trimestral:349.90, Semestral:649.90, Anual:1199.90 };
const FLUXO_HORAS = [2, 6, 14, 22, 12, 8, 10, 14, 20, 28, 36, 50, 62, 78, 70, 44, 18];

function loadDB(){
  try {
    const raw = localStorage.getItem(DB_KEY);
    if(raw){
      const dados = JSON.parse(raw);
      if(dados && Array.isArray(dados.alunos)) return dados;
    }
  } catch (erro) {
    console.warn('Não foi possível ler o armazenamento local:', erro);
  }
  return JSON.parse(JSON.stringify(SEED));
}

function saveDB(){
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (erro) {
    console.warn('Não foi possível salvar no armazenamento local:', erro);
  }
}

var db = loadDB();
