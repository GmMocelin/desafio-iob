import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, login as doLogin, signup as doSignup } from "../api";
import { Shell, Card, Title, Button, Input } from "../ui";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("gui@ex.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("Guilherme");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const login = async () => {
    setLoading(true); setErr(null);
    try { await doLogin(email, password); nav("/"); }
    catch (e: any) { setErr(e?.response?.data?.error || e.message); }
    finally { setLoading(false); }
  };

  const signup = async () => {
    setLoading(true); setErr(null);
    try { await doSignup(name, email, password); await doLogin(email, password); nav("/"); }
    catch (e: any) { setErr(e?.response?.data?.errors?.join(", ") || e.message); }
    finally { setLoading(false); }
  };

  return (
    <Shell>
      <Title>Entrar</Title>
      <Card>
        <div style={{ display: "grid", gap: 12 }}>
          <label>Nome <Input value={name} onChange={e => setName(e.target.value)} /></label>
          <label>Email <Input value={email} onChange={e => setEmail(e.target.value)} /></label>
          <label>Senha <Input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
          {err && <div style={{ color: "#ff8080" }}>{err}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={login} disabled={loading}>Login</Button>
            <Button onClick={signup} disabled={loading}>Criar conta</Button>
          </div>
          <small style={{ opacity: .7 }}>API base: {api.defaults.baseURL}</small>
        </div>
      </Card>
    </Shell>
  );
}
