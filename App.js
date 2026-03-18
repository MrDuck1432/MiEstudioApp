import { StatusBar } from 'expo-status-bar';
import LoginPage from './src/pages/loginPage';

export default function App() {
  return (
    <>
      <LoginPage />
      <StatusBar style="auto" />
    </>
  );
}