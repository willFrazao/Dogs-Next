import LoginPerdeuForm from '@/components/login/login-perdeu-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perdeu a Conta | Dogs',
  description: 'Recupere sua conta no site Dogs.',
};

export default function PerdeuPage() {
  return (
    <div className='animeLeft'>
      <h1 className='title'>Perdeu a Conta</h1>
      <LoginPerdeuForm />
    </div>
  );
}