'use client';

import { useFormState, useFormStatus } from "react-dom";
import styles from './photo-comments-form.module.css';
import EnviarIcon from "@/icons/enviar-icon";
import ErrorMessage from "../helper/error-message";
import { Comment } from '@/actions/photo-get';
import React from "react";
import { COMMENT_POST } from '@/functions/api';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  )
}

export default function PhotoCommentsForm({ single, id, setComments }: {
  single?: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    data: null,
    error: ''
  })

  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments(comments => [...comments, state.data as unknown as Comment]);
      setComment('');
    }
  }, [state, setComments]);

  const [comment, setComment] = React.useState('');

  return (
    <form action={action} className={`${styles.form} ${single ? styles.single : ''}`}>
      <input type="hidden" name="id" id="id" value={id} />  
      <textarea className={styles.textarea} name="comment" id="comment" placeholder="Comente..." value={comment} onChange={({target}) => setComment(target.value)}></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}

async function commentPost(
  prevState: { ok: boolean; data: null; error: string; },
  formData: FormData
) {
  try {
    const id = formData.get('id');
    const comment = formData.get('comment');
    if (!id || !comment) throw new Error('Comentário ou id ausente.');
    const token = window.localStorage.getItem('token');
    if (!token) throw new Error('Token ausente.');
    const { url } = COMMENT_POST(id as string);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ comment }),
    });
    if (!response.ok) throw new Error('Erro ao enviar comentário.');
    const data = await response.json();
    return { ok: true, data, error: '' };
  } catch (error: any) {
    return { ok: false, data: null, error: error.message };
  }
}
