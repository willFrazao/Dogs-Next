'use client';
import { useUser } from '@/context/user-context';
import React from 'react';


export default function ContaPage() {
  const { user } = useUser();
  console.log(user);
  return (
    <main>
      <h1>Conta: {user?.nome}</h1>
    </main>
  );
}