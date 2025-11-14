'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import Button from '@/components/forms/button';
import Input from '../forms/input';
import ErrorMessage from '../helper/error-message';
import loginAction from '@/actions/login';
import styles from './login-form.module.css';

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
    {pending ? (
      <Button disabled={pending}>Enviando...</Button>
    ) : (
      <Button>Entrar</Button>
    )}
    </>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, {
    ok: false,
    error: '',
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) {
      // Quando o server action retornar o token (data), gravamos no localStorage
      // para que componentes client-side que dependem dele funcionem.
      if (state.data) {
        try {
          window.localStorage.setItem('token', state.data as string);
        } catch (e) {
          // ignore localStorage errors
        }
      }
      window.location.href = '/conta';
    }
  }, [state.ok, state.data]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link className={styles.perdeu} href="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui uma conta? Cadastre-se no site.</p>
        <Link className='button' href="/login/criar">Cadastro</Link>
      </div>
    </>
  );
}