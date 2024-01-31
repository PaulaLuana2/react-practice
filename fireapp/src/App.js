import './app.css';
import { useState, useEffect} from 'react';
import { db, auth } from './connection';
import { 
  doc, 
  setDoc, 
  collection, 
  addDoc, getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';


function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [idPost, setIdPost] = useState('');
  const [posts, setPosts] = useState([]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [messageError, setMessageError] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    async function loadPosts(){
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
          let listaPost = [];
          snapshot.forEach((doc) => {
            listaPost.push({
                id: doc.id,
                titulo: doc.data().titulo,
                autor: doc.data().autor,
              }
            )
          })
    
          setPosts(listaPost);
    
      })
    }

    loadPosts();
  }, [])

  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          console.log(`${user.email} está logado!`);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email,
          })
        }else{
          setUser(false);
          setUserDetail({});
        }
      })
    }

    checkLogin();
  }, [])

  async function handleAdd(){
    // await setDoc(doc(db, "posts", "123450"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   alert('deu bom');
    // })
    // .catch((error) => {
    //   alert('deu ruim');
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      alert('Cadastrado com sucesso')
      setAutor('');
      setTitulo('');
    })
    .catch((error) => {
      alert(`Deu erro: ${error}`);
    })
  }

  async function buscarPost(){
    // const postRef = doc(db , "posts", "123450");

    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(() => {

    // })

    const postRef = collection(db, "posts");
    await getDocs(postRef)
    .then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          }
        )
      })

      setPosts(lista);

    })
    .catch(() => {

    })
  }

  async function editarPost(){
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch(() => {

    })
  }

  async function excluirPost(id){
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
    .then(() => {
      alert('Removido com sucesso!')
    })
    .catch(() => {

    })
  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=> {
      alert('cadastrado novo user');
      setEmail('');
      setSenha('');
      setMessageError('');
    })
    .catch((error) => {
      if (error.code === 'auth/weak-password') setMessageError('Senha muito fraca');
      else if(error.code === 'auth/email-already-in-use') setMessageError('Email já existe');
      else if(error.code === 'auth/invalid-email') setMessageError('Email inválido!');
      else setMessageError(`Erro ao cadastrar: ${error}`);
    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      alert('Logado com sucesso!')
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })

      setUser(true);
      setEmail('');
      setSenha('');
    })
    .catch(() => {
      alert('Erro ao fazer login!');
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUser(false)
    setUserDetail({})
  }

  return (
    <div>
      { user &&
        <div>
          <strong>Seja bem-vindo(a), você está logado!</strong><br/>
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span><br/>
          <button onClick={fazerLogout}>Logout</button>
          <br/><br/>
        </div>

      }


      <div className='container'>
        <h2>Usuários</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite um email'
        /><br/>
        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder='Digite a senha'
        /><br/>

        <button onClick={novoUsuario}>Cadastrar</button>
        {messageError.length > 0 && <><span style={{ color: 'red' }}>*{messageError}</span><br /></>
        } 
        <button onClick={logarUsuario}>Fazer login</button>

      </div>

      <br/><br/>
      <hr/>

      <div className='container'>
        <label>ID do Post:</label>
        <input
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}/> <br/>
        <label>Título:</label>
        <textarea
          type='text'
          placeholder='Digite o título'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <input
          type='text'
          placeholder='Autor do post'
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return(
            <li key={post.id}>
              <strong>ID: {post.id}</strong> <br/>
              <span>Título: {post.titulo}</span> <br/>
              <span>Autor: {post.autor}</span> <br/>
              <button onClick={() => excluirPost(post.id)}>Excluir</button> <br/><br/>
            </li>)
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
