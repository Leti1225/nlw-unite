//array = [] =  lista de objetos que contêm múltiplos valores armazenados em uma lista.
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


//let = informa ao sistema que posteriormente essa informação pode ser mudada
//se a data de checkin for nula, vai aparecer um botão
//data-email: impede que o mesmo email seja colocado duas vezes
//onclick: quando clicar faça tal coisa
//confirmar checkin: nome do botão
//return = retorna para a tela todo o texto que ta dentro das tags
// NÃO ESQUECER DE COLOCAR ``(crase dupla) para cada valor que você quer retornar
//dentro das `` coloca o que quer retorna (qualquer coisa)
//${(objeto).(elemento do objeto)}

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


//output = vazio
//estrutura de repetição (loop)
//para cada participante da lista de participantes coloque vazio = vazio + participante
//essa repetição ocorre até acabar a lista de participantes
//document= página da Web (HTML)
//querySelector = indicar a seleção de uma class(.), id(#) ou tag
//innerHTML = retorna todo o conteúdo de texto do elemento, incluindo todas as marcas HTML internas e de espaçamento.
//no tbody, vai aparecer o que ta dentro do criarNovoParticipante

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


//constante para receber dados
//FormData=dados do formulario
//event.target=define o alvo principal do formulario(form)
const adicionarParticipante = (event) => {
    event.preventDefault() 

    const dadosDoFormulario = new FormData(event.target) 

    const participante = {
        nome: dadosDoFormulario.get('nome'), 
        email: dadosDoFormulario.get('email'), 
        dataInscricao: new Date(), 
        dataCheckin: null 
        }

    //verificar se o participante já existe
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

    //encontrar o participante dentro da lista
    const participante = participantes.find((p)=> {
        return p.email = event.target.dataset.email
    })

    //atualizar o check-in do participante
    participante.dataCheckin = new Date()

    ////atualizar a lista de participantes
    atualizarLista(participantes)
}