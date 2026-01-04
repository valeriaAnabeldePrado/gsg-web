'use client';

import { useState } from 'react';
import './ProfileComparisonTable.css';

const profileData = [
  { name: "P01", alu: true, white: false, black: true, champ: true, transp: true, opal: true, apply: true, suspend: false, embed: true, max_width: "12mm" },
  { name: "P02", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: true, suspend: false, embed: false, max_width: "8mm" },
  { name: "ANGULO", alu: true, white: false, black: true, champ: false, transp: false, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "PH1", alu: true, white: true, black: true, champ: false, transp: true, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "PH2", alu: true, white: true, black: true, champ: false, transp: true, opal: true, apply: false, suspend: true, embed: false, max_width: "12mm" },
  { name: "PV8", alu: true, white: false, black: false, champ: false, transp: true, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "MINI PE", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "8mm" },
  { name: "PEM", alu: true, white: true, black: true, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "12mm" },
  { name: "PEXL", alu: true, white: true, black: true, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "30mm" },
  { name: "GARGANTA", alu: false, white: true, black: false, champ: false, transp: true, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "INVISIBLE", alu: true, white: false, black: false, champ: false, transp: true, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "ESCALERA", alu: true, white: false, black: false, champ: false, transp: true, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "PISO", alu: true, white: false, black: true, champ: false, transp: false, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "PEI", alu: true, white: false, black: true, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "8mm" },
  { name: "PTS-024", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: true, suspend: false, embed: false, max_width: "12mm" },
  { name: "PTS-020", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: true, suspend: false, embed: true, max_width: "12mm" },
  { name: "PTS-038", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: true, suspend: false, embed: false, max_width: "20mm" },
  { name: "PWS 101B/ 102B", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "10mm" },
  { name: "PWS 109/110", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "30mm" },
  { name: "PBS 144/145", alu: true, white: false, black: false, champ: false, transp: false, opal: true, apply: false, suspend: false, embed: true, max_width: "12mm" }
];

export default function ProfileComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-comparison-container">
      <button 
        className="profile-comparison-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Tabla Comparativa de Perfiles</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="currentColor"/>
          </svg>
        </span>
      </button>
      <div className={`profile-comparison-content ${isOpen ? 'open' : ''}`}>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th rowSpan="2">PERFIL</th>
                <th colSpan="4">COLOR</th>
                <th colSpan="2">DIFUSOR</th>
                <th colSpan="3">USO</th>
                <th rowSpan="2">ANCHO MAX.<br/>TIRA DE LED</th>
              </tr>
              <tr>
                <th>ALUMINIO</th>
                <th>BLANCO</th>
                <th>NEGRO</th>
                <th>CHAMPAGNE</th>
                <th>TRANSP.</th>
                <th>OPAL</th>
                <th>APLICAR</th>
                <th>SUSPENDER</th>
                <th>EMBUTIR</th>
              </tr>
            </thead>
            <tbody>
              {profileData.map((row) => (
                <tr key={row.name}>
                  <td className="profile-name">{row.name}</td>
                  <td>{row.alu && <span className="check-mark">✕</span>}</td>
                  <td>{row.white && <span className="check-mark">✕</span>}</td>
                  <td>{row.black && <span className="check-mark">✕</span>}</td>
                  <td>{row.champ && <span className="check-mark">✕</span>}</td>
                  <td>{row.transp && <span className="check-mark">✕</span>}</td>
                  <td>{row.opal && <span className="check-mark">✕</span>}</td>
                  <td>{row.apply && <span className="check-mark">✕</span>}</td>
                  <td>{row.suspend && <span className="check-mark">✕</span>}</td>
                  <td>{row.embed && <span className="check-mark">✕</span>}</td>
                  <td>{row.max_width}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
