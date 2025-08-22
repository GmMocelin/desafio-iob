import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,system-ui,Arial,sans-serif;background:#0b0b0c;color:#e7e7e7}
  a{color:inherit;text-decoration:none}
  input,button{font:inherit}
`;

export const Shell = styled.div`max-width:900px;margin:40px auto;padding:0 16px;`;
export const Card = styled.div`background:#141416;border:1px solid #1f1f22;border-radius:16px;padding:16px;margin:12px 0;`;
export const Title = styled.h1`font-size:28px;margin:0 0 16px;`;
export const Flag = styled.img`width:40px;height:28px;object-fit:cover;border-radius:4px;border:1px solid #1f1f22;`;
export const Row = styled.div`display:flex;align-items:center;gap:12px;`;
export const Button = styled.button`
  background:#1f6feb;border:none;color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer;
  &:disabled{opacity:.6;cursor:not-allowed}
`;
export const Input = styled.input`
  width:100%;padding:10px 12px;border-radius:10px;border:1px solid #2a2a2e;background:#0f0f11;color:#e7e7e7;
`;
