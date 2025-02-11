import React, {useEffect, useState} from "react";
import './styles.css'

const ModalProfessores = ({
  isOpen,
  onClose,
  professorSelecionado,
  criar,
  atualizar
})=>{
  if(!isOpen) return null

  console.log("Prof. Selecionado: ", professorSelecionado)

  const [id, setId] = useState(professorSelecionado?.id || '')
  const [ni, setNi] = useState(professorSelecionado?.ni || '')
  const [nome, setNome] = useState(professorSelecionado?.nome || '')
  const [email, setEmail] = useState(professorSelecionado?.email || '')
  const [cel, setCel] = useState(professorSelecionado?.cel || '')
  const [ocup, setOcup] = useState(professorSelecionado?.ocup || '')

  useEffect(()=>{
    if(professorSelecionado){
      setId(professorSelecionado.id || '')
      setNi(professorSelecionado.ni || '')
      setNome(professorSelecionado.nome || '')
      setEmail(professorSelecionado.email || '')
      setCel(professorSelecionado.cel || '')
      setOcup(professorSelecionado.ocup || '')
    } else{
      setId('')
      setNi('')
      setNome('')
      setCel('')
      setEmail('')
      setOcup('')
    }
  }, [professorSelecionado])

  const handleSubmit = (e)=>{
    e.preventDefault();
    const novoProfessor = {ni, nome, email, cel, ocup}
    if(professorSelecionado){
      atualizar({...professorSelecionado, ...novoProfessor})
    }else{
      criar(novoProfessor)
    }
  }

  return(
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{professorSelecionado ? "Editar": "Cadastrar"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              
              <input
                className="ni_modal"
                value={ni}
                onChange={(e)=>setNi(e.target.value)}
                placeholder="NI"
              />
              <input
                className="nome_modal"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                placeholder="NOME"
              />
              <input
                className="email_modal"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="EMAIL"
              />
              <input
                className="cel_modal"
                value={cel}
                onChange={(e)=>setCel(e.target.value)}
                placeholder="CELULAR"
              />
              <input
                className="ocup_modal"
                value={ocup}
                onChange={(e)=>setOcup(e.target.value)}
                placeholder="OCUP"
              />
              <button className="att-save" type="submit">{professorSelecionado ? "Atualizar" : "Salvar"}</button>
            </form>
          </div>
          <div className="caixa2">
            <div className="foto">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default ModalProfessores






































// const ModalProfessores = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const [formData, setFormData] = useState({
//     ni: "",
//     nome: "",
//     email: "",
//     cel: "",
//     ocup: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/api/professores", formData);
//       alert("Cadastro realizado com sucesso!");
//       onClose();
//     } catch (error) {
//       console.error("Erro ao cadastrar:", error);
//       alert("Erro ao cadastrar.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Cadastro de Professor</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="ni" placeholder="NI" value={formData.ni} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
//           <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
//           <input type="tel" name="cel" placeholder="Celular" value={formData.cel} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
//           <input type="text" name="ocup" placeholder="Ocupação" value={formData.ocup} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
//           <div className="flex justify-between mt-4">
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
//             <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalProfessores;