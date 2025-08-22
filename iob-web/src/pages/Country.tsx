import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Shell, Title, Card, Button } from "../ui";
import { fetchCountry, logout } from "../api";

export default function Country() {
  const { code = "" } = useParams();
  const [c, setC] = useState<any | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    fetchCountry(code).then(setC).catch(console.error);
  }, [code]);

  const onLogout = () => { logout(); nav("/login"); };

  if (!c) return <Shell><Title>Carregando…</Title></Shell>;

  return (
    <Shell>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Title>{c.name} ({c.code})</Title>
        <Button onClick={onLogout}>Sair</Button>
      </div>
      <Card>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <img src={c.flag_svg} width={48} height={32} />
          <div>
            <div><strong>Capital:</strong> {c.capital}</div>
            <div><strong>Região:</strong> {c.region} • {c.subregion}</div>
          </div>
        </div>
      </Card>
      <div style={{marginTop:12}}>
        <Link to="/">← Voltar</Link>
      </div>
    </Shell>
  );
}
