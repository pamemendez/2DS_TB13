import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "./styles.css";
import ModalProfessores from "../../components/modal";
import Head from "../../components/head";



export default function Home() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem("token");

    // console.log("TokenHome:", token);

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

    const editar = (id) => {
    };

    const apagar = async (id) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(dados.filter((professor) => professor.id !== id));
            } catch (error) {
                console.error("Erro ao excluir professor:", error);
            }
        }
    };

    const ModalProfessores = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
    }

    return (
        <div className="container_home">
            <main>
                <section>
                    <div className="form-container">
                        <h2>Lista de Professores</h2>
                        {dados.map((professor) => (
                            <div key={professor.id} className="lista">
                                <FaEdit className="edit" onClick={() => editar(professor.id)} />
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
                        <FaPlus className="adicionar" onClick={() => setModalOpen(true)} />
                        <FaSearch className="procurar" onClick={() => buscarProfessor()} />
                    </div>
                    <ModalProfessores isOpen={modalOpen} onClose={() => setModalOpen(false)}
                        professorSelecionado={professorSelecionado}
                        setProfessorSelecionado={setProfessorSelecionado}
                        criar={criar}
                    />
                </section>
            </main>
        </div>
    );
}
