import styles from './login.module.css';

export default async function LoginLayout({ 
  children, }: 
  { children: React.ReactNode; 
    // Add any additional props here if needed
  }) {
  return (
    <div className={styles.login}>
      <div className={styles.forms}>{children}</div>
    </div>
  );
}