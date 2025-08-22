import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shell, Title, Card, Button } from "../ui";
import { fetchCountries, logout } from "../api";

export default function Countries() {
  const [data, setData] = useState<any[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchCountries().then(setData).catch(console.error);
  }, []);

  const onLogout = () => { logout(); nav("/login"); };

  return (
    <Shell>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Title>Países</Title>
        <Button onClick={onLogout}>Sair</Button>
      </div>

      {data.map((c) => (
        <Link key={c.code} to={`/countries/${c.code}`}>
          <Card>
            <div style={{display:"flex", gap:12, alignItems:"center"}}>
              <img src={c.flag_svg} width={32} height={22} />
              <div>
                <div><strong>{c.name}</strong> ({c.code})</div>
                <small>{c.capital} • {c.region} • {c.subregion}</small>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </Shell>
  );
}