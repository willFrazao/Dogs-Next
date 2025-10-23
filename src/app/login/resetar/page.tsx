import LoginResetarForm from '@/components/login/login-resetar-form';
import { Metadata } from 'next';
import login from '@/actions/login';

export const metadata: Metadata = {
  title: 'Resetar Senha | Dogs',
  description: 'Redefina sua senha no site Dogs.',
};

type ResetarSearchParams = {
  searchParams: {
    key: string;
    login: string;
  };
}

export default async function ResetarPage({
  searchParams,
}:ResetarSearchParams) {
  return (
      <div className='animeLeft'>
        <h1 className='title'>Resetar a Senha</h1>
        <LoginResetarForm keyToken={searchParams.key} login={searchParams.login} />
      </div>
    );
}