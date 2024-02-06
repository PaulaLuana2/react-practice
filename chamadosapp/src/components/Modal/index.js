import { FiX } from 'react-icons/fi';
import './modal.css';

export default function Modal({ conteudo, close}){
    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={25} color='gray'/>
                </button>

                <main>
                    <h3>Detalhes do chamado</h3>

                    <hr style={{top: '50px', position: 'absolute', color: 'red', display: 'flex', width: '80%'}}/>

                    <div className='textCad'>Cadastrado em: {conteudo.createdFormat}</div>

                    {conteudo.status !== 'Aberto' ? 
                        <div className="modalStatus" style={{backgroundColor: conteudo.status === 'Atendido' ? '#5cb85c' : '#f6b600'}}>
                            {conteudo.status}
                        </div>
                        :
                        <div className="modalStatus" style={{backgroundColor: '#e44343'}}>
                            {conteudo.status}
                        </div>
                    }
                    <hr style={{top: '85px', width: '80%', position: 'absolute'}}/>
                    
                    <br/>

                    <div className='row'>
                        <p className='boxClient'>Cliente: {conteudo.cliente}</p>
                        <p>Assunto: {conteudo.assunto}</p>
                        <>
                            {conteudo.complemento !== '' && (
                                <p>Complemento: {conteudo.complemento}</p>
                            )}
                        </>
                    </div>

                </main>
            </div>
            
        </div>
    )
}