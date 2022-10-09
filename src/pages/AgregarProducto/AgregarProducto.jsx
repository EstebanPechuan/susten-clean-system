import React, { useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import Sidebar from "../../components/Sidebar/Sidebar";
import { db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import './AgregarProducto.css'

function AgregarProducto() {
  const [data, setData] = useState({})
  const [file, setFile] = useState('')
  const [per, setPer] = useState(null)

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name

      // console.log(name);
      const storageRef = ref(storage, name)

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPer(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setData((prev) => ({...prev, img: downloadURL}))
            });
        }
      );
    }
    file && uploadFile()

  }, [file])

  // console.log(data);
  
  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      await setDoc(doc(db, "productos", data.producto), {
        ...data,
        timeStamp: serverTimestamp()
      });

    } catch(err) {
      console.log(err);
    }

    e.target[0].value = ''
    e.target[1].value = ''
    e.target[2].value = ''
    e.target[3].value = ''
    e.target[4].value = ''
    e.target[5].value = ''
    e.target[6].value = ''
    e.target[7].value = ''
    e.target[8].value = ''
    
    document.querySelector('#producto').focus()
  }

  const handleInput = (e) => {
    const id = e.target.id
    const value = e.target.value

    setData({...data, [id]: value})
  }
  
  // console.log(data);
  
  return (
    <>
        <Sidebar />

        <section className='nuevo_producto'>
          <form action="" onSubmit={handleAdd}>
            <div className="left">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />

              <input id='producto' type="text" placeholder='Ingresar nombre producto' onChange={handleInput} />

              <input id='categoria' type="text" placeholder='Ingresar categoria' onChange={handleInput} />

              <textarea id='descripcion' name="" placeholder='Ingresar descripción' onChange={handleInput}></textarea>

              <input id='dilucion' type="text" placeholder='Dilución máxima' onChange={handleInput} />
            </div>

            <div className="right">
              <input id='presentacion' type="text" placeholder='Presentación' onChange={handleInput} />

              <input id='caja' type="text" placeholder='Precio caja' onChange={handleInput} />

              <input id='envase' type="text" placeholder='Precio envase' onChange={handleInput} />

              <input id='litro' type="text" placeholder='Precio litro' onChange={handleInput} />

              <button disabled={per !== null && per < 100} type='submit'>Agregar producto</button>
            </div>

          </form>
        </section>
    </>
  )
}

export default AgregarProducto