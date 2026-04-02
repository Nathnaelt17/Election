import React from "react";
import { Link } from "react-router-dom";

const parties = [
  {
    name: "Prosperity Party",
    summary:
      "NEBE lists Prosperity Party as a national political party, and the 7th General Election symbol list shows its election symbol as a wheat stalk.",
  },
  {
    name: "Ethiopian Citizens for Social Justice (EZEMA)",
    summary:
      "NEBE includes EZEMA in its national political parties list, and the 2026 contesting-party symbol list assigns it a balance scale.",
  },
  {
    name: "National Movement of Amhara (NAMA)",
    summary:
      "NEBE also lists NAMA as a national political party, and the contesting-party symbol list shows its symbol as a clock.",
  },
];

function MoreInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-6 py-10">
      <div className="absolute w-[400px] h-[400px] bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#00C49A] font-semibold">Participating Parties</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#156064] mt-3">
              Real party information for Ethiopia&apos;s 7th General Election
            </h1>
            <p className="text-gray-600 mt-4 leading-7">
              NEBE said on February 23, 2026 that 48 contesting parties&apos; election symbols were launched.
              This page highlights three of the nationally accredited parties that also appear in the official
              symbol list used for the current election cycle.
            </p>
          </div>

          <PartyOverviewArt />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {parties.map((party) => (
            <div key={party.name} className="rounded-2xl border border-[#156064]/10 bg-[#F8FFFC] p-5">
              <h2 className="text-lg font-bold text-[#156064]">{party.name}</h2>
              <p className="text-sm text-gray-600 mt-3 leading-6">{party.summary}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-3xl bg-[#F4FBF8] border border-[#00C49A]/15 p-6">
          <h2 className="text-xl font-bold text-[#156064]">What the cards are based on</h2>
          <ul className="mt-4 space-y-3 text-gray-700 leading-6">
            <li className="flex gap-3">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00C49A]"></span>
              <span>The national parties list confirms that Prosperity Party, EZEMA, and NAMA are nationally accredited political parties.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00C49A]"></span>
              <span>The election-symbol PDF links those parties to their official symbols for the 7th General Election: wheat stalk, balance scale, and clock.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00C49A]"></span>
              <span>The cards use custom illustrations based on those published symbols rather than the old placeholder portrait image.</span>
            </li>
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#00C49A] to-[#156064] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00C49A]/40 transition"
          >
            Back to Parties
          </Link>
        </div>
      </div>
    </div>
  );
}

function PartyOverviewArt() {
  return (
    <div className="rounded-[28px] bg-gradient-to-br from-[#F8E16C] via-[#FFF7C7] to-white p-5 border border-[#156064]/10">
      <svg viewBox="0 0 340 220" className="w-full h-auto" role="img" aria-label="Illustration about political parties in Ethiopia's election">
        <rect x="20" y="26" width="300" height="168" rx="26" fill="#156064" opacity="0.08" />
        <circle cx="92" cy="108" r="42" fill="#ffffff" stroke="#156064" strokeWidth="5" />
        <circle cx="170" cy="108" r="42" fill="#ffffff" stroke="#156064" strokeWidth="5" />
        <circle cx="248" cy="108" r="42" fill="#ffffff" stroke="#156064" strokeWidth="5" />
        <path d="M92 82v50" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
        <path d="M92 90c-12 2-18 9-22 18 11 0 18-4 22-18Z" fill="#F4B400" />
        <path d="M92 102c12 2 18 9 22 18-11 0-18-4-22-18Z" fill="#F8E16C" stroke="#D4A62A" strokeWidth="1.5" />
        <path d="M170 84v36M146 96h48M170 96l-14 16M170 96l14 16" fill="none" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
        <path d="M150 118h18c-1-6-5-10-9-14-4 4-8 8-9 14Z" fill="#00C49A" opacity="0.7" />
        <path d="M172 118h18c-1-6-5-10-9-14-4 4-8 8-9 14Z" fill="#00C49A" opacity="0.7" />
        <circle cx="248" cy="108" r="22" fill="none" stroke="#156064" strokeWidth="5" />
        <circle cx="248" cy="108" r="4" fill="#00C49A" />
        <path d="M248 108V94" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
        <path d="M248 108l12 8" stroke="#F4B400" strokeWidth="5" strokeLinecap="round" />
        <text x="170" y="200" textAnchor="middle" fill="#156064" fontSize="18" fontWeight="700">
          Party Symbols
        </text>
      </svg>
    </div>
  );
}

export default MoreInfo;
