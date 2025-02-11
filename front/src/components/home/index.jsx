import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "./styles.css";
import ModalProfessores from "../modal";

export default function Home() {
    const [dados, setDados] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    const [professorSelecionado, setProfessorSelecionado] = useState(null)

    // console.log("TokenHome:", token)

    useEffect(() => {

        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const atualizar = async (professorAtualizado) => {
        console.log("PA",professorAtualizado.nome)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/id/${professorAtualizado.id}`,
                {
                    ni: professorAtualizado.ni,
                    nome: professorAtualizado.nome,
                    email: professorAtualizado.email,
                    cel: professorAtualizado.cel,
                    ocup: professorAtualizado.ocup
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setDados(dados.map((professor)=>professor.id === professorAtualizado.id ? professorAtualizado: professor))
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setDados(dados.filter(professor => professor.id !== id))
            }

            catch (error) {
                console.error(error)
            }
        }


    }

    
    const criar = async(novoProfessor)=>{
        console.log("novoProfessor: ", novoProfessor)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    cel: novoProfessor.cel,
                    ocup: novoProfessor.ocup
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setDados([...dados, novoProfessor])
            setModalOpen(false)
        } catch (error) {
            
        }
    }

    return (
        <div className="container_home">
            <main>
                <section>
                    <div className="form-container">
                        <h2>Lista de Professores</h2>
                        {dados.map((professor) => (
                            <div key={professor.id} className="lista">
                                <FaEdit className="edit" onClick={() => {setModalOpen(true), setProfessorSelecionado(professor)}} />
                                <FaTrash className="delete" onClick={() => apagar(professor.id)} />
                                <span className="id">{professor.id}</span>
                                <span className="ni">{professor.ni}</span>
                                <span className="nome">{professor.nome}</span>
                                <span className="cel">{professor.cel}</span>
                                <span className="ocup">{professor.ocup}</span>
                            </div>
                        ))}
                    </div>

                    <div className="add_search">
                        <FaPlus className="adicionar" onClick={() => {setModalOpen(true), setProfessorSelecionado(null)}} />
                        <FaSearch className="procurar" onClick={() => buscarProfessor()} />
                    </div>
                    
            <ModalProfessores 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                professorSelecionado = {professorSelecionado}
                setProfessorSelecionado = {setProfessorSelecionado}
                criar ={criar}
                atualizar={atualizar}
            />
                </section>
            </main>
        </div>
    );
}
