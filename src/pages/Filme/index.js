import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css'
import api from '../../services/api'
import { toast } from 'react-toastify'




function Filme() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect (() =>{
    async function loadFilme() {
      await api.get(`/movie/${id}`, {params:{
        api_key: 'a6c1fdc8a303050be2dd183a6e0f37cc',
        language: 'pt-BR',
      }
    })
    .then((response) =>{
      setFilme(response.data)
      setLoading(false)
    })
    .catch(() =>{
      console.log('filme não encontrado')
      navigate("/", {replace: true});
      return;
    })
    } 

    
    loadFilme()

    return() =>{
      console.log("componente foi desmontado")
    }

  }, [navigate, id])


  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilme){
      toast.warn("Esse filme ja esta na sua lista")
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("filme Salvo com sucesso")
  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="filme.title"/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average}</strong>
      
      <div className='area-buttons'>
        <button className='salvar-button' onClick={salvarFilme}>Salvar</button>
        <button className='trailer-button'>
          <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`} >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
