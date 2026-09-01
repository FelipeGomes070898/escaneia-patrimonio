'use client';

import { useMemo, useState } from 'react';

interface Registro {
  id: string;
  patrimonio: string;
  descricao: string;
  local: string;
  criado_em: string;
  criado_por_nome: string | null;
  link: string;
  documento_pdf_url: string | null;
}

export default function RelatoriosClient({ registros, locais }: { registros: Registro[]; locais: string[] }) {
  const [busca, setBusca] = useState('');
  const [filtroLocal, setFiltroLocal] = useState('');

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return registros.filter((r) => {
      if (filtroLocal && r.local !== filtroLocal) return false;
      if (!termo) return true;
      return (
        (r.patrimonio || '').toLowerCase().includes(termo) ||
        (r.descricao || '').toLowerCase().includes(termo) ||
        (r.criado_por_nome || '').toLowerCase().includes(termo)
      );
    });
  }, [registros, busca, filtroLocal]);

  function exportarCsv() {
    const cabecalho = ['Patrimônio', 'Descrição', 'Local', 'Cadastrado por', 'Data', 'Link'];
    const linhas = filtrados.map((r) => [
      r.patrimonio,
      r.descricao || '',
      r.local || '',
      r.criado_por_nome || '',
      formatarData(r.criado_em),
      r.link || ''
    ]);
    const csv = [cabecalho, ...linhas]
      .map((linha) => linha.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';'))
      .join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patrimonio-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Relatórios</h1>
          <p className="text-sm text-muted mt-1">{filtrados.length} de {registros.length} itens</p>
        </div>
        <button
          onClick={exportarCsv}
          className="rounded-full bg-accent text-white font-semibold px-5 py-2.5 text-sm"
        >
          Exportar CSV
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por patrimônio, descrição ou responsável…"
          className="flex-1 min-w-[220px] rounded-md2 border border-border px-3 py-2 text-sm outline-none focus:border-accent bg-surface"
        />
        <select
          value={filtroLocal}
          onChange={(e) => setFiltroLocal(e.target.value)}
          className="rounded-md2 border border-border px-3 py-2 text-sm outline-none focus:border-accent bg-surface"
        >
          <option value="">Todos os locais</option>
          {locais.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-surface rounded-lg2 border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Patrimônio</th>
              <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Descrição</th>
              <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Local</th>
              <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Cadastrado por</th>
              <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Data</th>
              <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Ficha</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono">{r.patrimonio}</td>
                <td className="px-4 py-3">{r.descricao || '—'}</td>
                <td className="px-4 py-3">{r.local || '—'}</td>
                <td className="px-4 py-3">{r.criado_por_nome || '—'}</td>
                <td className="px-4 py-3 text-muted">{formatarData(r.criado_em)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {r.documento_pdf_url ? (
                    <a href={r.documento_pdf_url} target="_blank" rel="noreferrer" className="text-accent font-semibold text-xs hover:underline">
                      Ver PDF
                    </a>
                  ) : (
                    <span className="text-muted text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Nenhum item encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatarData(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}
