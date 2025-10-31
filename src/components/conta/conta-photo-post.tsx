'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import React from 'react';
import styles from './conta-photo-post.module.css';
import photoPost from '@/actions/photo-post';

function FormButton() {
  const { pending } = useFormStatus();
  
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>Enviar</Button>
      )}
    </>
  );
}

export default function ContaPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });
  
  const [img, setImg] = React.useState('');
  function handleImgChange({target}: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }


  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label='Nome' name='nome' type='text' />
        <Input label='Peso' name='peso' type='number' />
        <Input label='Idade' name='idade' type='number' />
        <Input 
          onChange={handleImgChange} 
          label='Imagem' 
          name='img' 
          type='file' 
          accept='image/*' 
          className={styles.file}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div className={styles.preview} style={{ backgroundImage: `url(${img})` }}>
      </div>
    </section>
  );
}
