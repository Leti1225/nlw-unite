let participantes = [
    {
        nome: "Leticia Pinheiro",
        email: "leti@gmail.com",
        dataInscricao: new Date(2024, 2, 25, 20, 40),
        dataCheckin: new Date(2024, 3, 2, 19, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gemail.com",
        dataInscricao: new Date(2024, 3, 15, 16, 30),
        dataCheckin: null
    },
    {
        nome: "Ana Silva",
        email: "ana@example.com",
        dataInscricao: new Date(2024, 1, 10, 10, 0),
        dataCheckin: new Date(2024, 2, 1, 14, 15)
    },
    {
        nome: "Pedro Nunes",
        email: "pedro@sample.com",
        dataInscricao: new Date(2024, 4, 5, 18, 45),
        dataCheckin: null
    },
    {
        nome: "Maria Santos",
        email: "maria@hotmail.com",
        dataInscricao: new Date(2024, 3, 20, 9, 20),
        dataCheckin: new Date(2024, 4, 1, 17, 10)
    },
    {
        nome: "Carlos Oliveira",
        email: "carlos@domain.com",
        dataInscricao: new Date(2024, 5, 8, 15, 55),
        dataCheckin: new Date(2024, 6, 3, 13, 45)
    },
    {
        nome: "Juliana Lima",
        email: "juliana@mail.com",
        dataInscricao: new Date(2024, 6, 12, 12, 10),
        dataCheckin: new Date(2024, 7, 5, 10, 20)
    },
    {
        nome: "Ricardo Almeida",
        email: "ricardo@example.com",
        dataInscricao: new Date(2024, 7, 3, 17, 30),
        dataCheckin: null
    },
    {
        nome: "Camila Fernandes",
        email: "camila@gmail.com",
        dataInscricao: new Date(2024, 8, 18, 14, 0),
        dataCheckin: new Date(2024, 9, 5, 16, 30)
    },
    {
        nome: "Gustavo Santos",
        email: "gustavo@mail.com",
        dataInscricao: new Date(2024, 9, 10, 8, 20),
        dataCheckin: null
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin) 

    if(participante.dataCheckin == null){
          dataCheckin = `
          <button
          data-email="${participante.email}" 
          onclick="fazerCheckin(event)" 
          >
          Confirmar Checkin   
          </button>
          `
    }

      return `
      <tr> 
          <td>
              <strong>${participante.nome}</strong> 
              <br>
              <small>${participante.email}</small> 
          </td>
          <td>${dataInscricao}</td>
          <td>${dataCheckin}</td>                  
      </tr>
  `
  }

const atualizarLista = (participantes) => {
    let output = "" 
    for (let participante of participantes){
    
    output = output + criarNovoParticipante(participante)
    } 
    
    document
    .querySelector('tbody')
    .innerHTML = output 
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault() 

    const dadosDoFormulario = new FormData(event.target) 

    const participante = {
        nome: dadosDoFormulario.get('nome'), 
        email: dadosDoFormulario.get('email'), 
        dataInscricao: new Date(), 
        dataCheckin: null 
        }

    const participanteExiste = participantes.find ((p) => p.email == participante.email)
    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value=""
    event.target.querySelector('[name="email"]').value=""
}

const fazerCheckin = (event) => {

    const mensagemConfirmacao = 'Tem certeza que deseja realizar o Check-in?'

    if(confirm(mensagemConfirmacao)== false){
        return
    }

    const participante = participantes.find((p)=> {
        return p.email = event.target.dataset.email
    })

    participante.dataCheckin = new Date()

    atualizarLista(participantes)
}

