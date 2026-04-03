import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { partyCards } from "./partyData";

const initialVotes = partyCards.reduce((accumulator, party) => {
  accumulator[party.id] = 0;
  return accumulator;
}, {});

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [votes, setVotes] = useState(() => {
    const savedVotes = JSON.parse(localStorage.getItem("partyVotes") || "null");
    return savedVotes ? { ...initialVotes, ...savedVotes } : initialVotes;
  });
  const [selectedParty, setSelectedParty] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voteReceipt, setVoteReceipt] = useState(null);

  const openVoteModal = (party) => {
    setSelectedParty(party);
    setShowConfirmModal(true);
  };

  const closeVoteModal = () => {
    setShowConfirmModal(false);
    setSelectedParty(null);
  };

  const confirmVote = () => {
    if (!selectedParty || !currentUser) {
      return;
    }

    const partyVoteNumber = votes[selectedParty.id] + 1;
    const nextVotes = {
      ...votes,
      [selectedParty.id]: partyVoteNumber,
    };

    localStorage.setItem("partyVotes", JSON.stringify(nextVotes));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user) =>
      user.fayda === currentUser.fayda
        ? { ...user, hasVoted: true, votedPartyId: selectedParty.id }
        : user
    );
    const updatedCurrentUser = {
      ...currentUser,
      hasVoted: true,
      votedPartyId: selectedParty.id,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedCurrentUser));
    localStorage.setItem(
      "lastVoteReceipt",
      JSON.stringify({
        voterNumber: partyVoteNumber,
        partyName: selectedParty.name,
      })
    );

    setVotes(nextVotes);
    setShowConfirmModal(false);
    setVoteReceipt({
      voterNumber: partyVoteNumber,
      partyName: selectedParty.name,
    });
    setSelectedParty(null);

    window.setTimeout(() => {
      localStorage.removeItem("user");
      navigate("/login");
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-6 py-10">
      <div className="absolute w-[400px] h-[400px] bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      <div className="text-center text-white mb-10 relative z-10">
        <h1 className="text-4xl font-bold">Parties in Ethiopia&apos;s Election</h1>
        <p className="text-sm opacity-90 mt-2 max-w-3xl mx-auto">
        </p>
        <div className="w-20 h-1 bg-[#F8E16C] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {partyCards.map((party) => (
          <PartyCard key={party.id} {...party} votes={votes[party.id]} onVote={() => openVoteModal(party)} />
        ))}
      </div>

      {showConfirmModal && selectedParty && (
        <VoteModal
          partyName={selectedParty.name}
          onConfirm={confirmVote}
          onCancel={closeVoteModal}
        />
      )}

      {voteReceipt && (
        <ReceiptModal
          partyName={voteReceipt.partyName}
          voterNumber={voteReceipt.voterNumber}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function PartyCard({ id, name, shortName, description, detail, symbol, logoUrl, votes, onVote }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
      <PartyLogo logoUrl={logoUrl} name={name} symbol={symbol} shortName={shortName} />

      <h2 className="text-xl font-bold text-[#156064] text-center mt-5">{name}</h2>
      <p className="text-xs uppercase tracking-[0.3em] text-center text-[#00C49A] mt-2">{shortName}</p>

      <p className="text-gray-700 text-sm text-center mt-4 leading-6">{description}</p>
      <p className="text-gray-500 text-sm text-center mt-2 leading-6">{detail}</p>

      <div className="mt-5 rounded-2xl bg-[#F4FBF8] border border-[#00C49A]/15 px-4 py-3">
        <p className="text-xs uppercase tracking-[0.25em] text-[#156064]/70 text-center">Current Votes</p>
        <p className="text-2xl font-bold text-[#156064] text-center mt-2">{votes}</p>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <Link to={`/more_info/${id}`} className="text-center text-sm text-[#00C49A] hover:underline">
          More Details
        </Link>
        <button
          onClick={onVote}
          className="bg-gradient-to-r from-[#00C49A] to-[#156064] text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00C49A]/40 transition"
        >
          Vote
        </button>
      </div>
    </div>
  );
}

function PartyLogo({ logoUrl, name, symbol, shortName }) {
  if (logoUrl) {
    return (
      <div className="rounded-3xl bg-white border border-[#156064]/10 p-4 h-40 flex items-center justify-center">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="max-h-28 w-auto object-contain"
        />
      </div>
    );
  }

  return <PartySymbol symbol={symbol} shortName={shortName} />;
}

function VoteModal({ partyName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl animate-fadeIn">
        <FaCheckCircle className="text-[#00C49A] text-4xl mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#156064] mb-2">Confirm Vote</h2>
        <p className="text-gray-500 text-sm mb-5 leading-6">
          Are you sure you want to cast your vote for {partyName}?
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#00C49A] text-white font-semibold hover:bg-[#0ea37f]"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptModal({ partyName, voterNumber }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl animate-fadeIn">
        <FaCheckCircle className="text-[#00C49A] text-4xl mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#156064] mb-2">Vote Recorded</h2>
        <p className="text-gray-600 text-sm leading-6">
          Your vote for <span className="font-semibold text-[#156064]">{partyName}</span> has been saved.
        </p>
        <p className="text-lg font-bold text-[#156064] mt-4">
          You are the {formatOrdinal(voterNumber)} voter.
        </p>
        <p className="text-xs text-gray-500 mt-3">
          You&apos;ll be logged out and returned to the sign-in page shortly.
        </p>
      </div>
    </div>
  );
}

function formatOrdinal(value) {
  const remainderTen = value % 10;
  const remainderHundred = value % 100;

  if (remainderHundred >= 11 && remainderHundred <= 13) {
    return `${value}th`;
  }

  if (remainderTen === 1) {
    return `${value}st`;
  }

  if (remainderTen === 2) {
    return `${value}nd`;
  }

  if (remainderTen === 3) {
    return `${value}rd`;
  }

  return `${value}th`;
}

function PartySymbol({ symbol, shortName }) {
  if (symbol === "wheat") {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#F8E16C] via-[#FFF8D9] to-white p-4">
        <svg viewBox="0 0 220 140" className="w-full h-32" role="img" aria-label="Wheat stalk symbol illustration">
          <rect x="18" y="18" width="184" height="104" rx="22" fill="#156064" opacity="0.08" />
          <circle cx="110" cy="70" r="42" fill="#ffffff" stroke="#156064" strokeWidth="4" />
          <path d="M110 40v54" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
          <path d="M110 48c-12 2-20 10-24 20 12 0 21-5 24-20Z" fill="#F4B400" />
          <path d="M110 58c12 2 20 10 24 20-12 0-21-5-24-20Z" fill="#F4B400" />
          <path d="M110 70c-12 2-18 9-22 18 11 0 18-4 22-18Z" fill="#F8E16C" stroke="#D4A62A" strokeWidth="1.5" />
          <path d="M110 78c12 2 18 9 22 18-11 0-18-4-22-18Z" fill="#F8E16C" stroke="#D4A62A" strokeWidth="1.5" />
          <text x="110" y="122" textAnchor="middle" fill="#156064" fontSize="13" fontWeight="700">
            {shortName}
          </text>
        </svg>
      </div>
    );
  }

  if (symbol === "scale") {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#E8FBF5] via-white to-[#F8E16C]/40 p-4">
        <svg viewBox="0 0 220 140" className="w-full h-32" role="img" aria-label="Balance scale symbol illustration">
          <rect x="18" y="18" width="184" height="104" rx="22" fill="#156064" opacity="0.08" />
          <circle cx="110" cy="70" r="42" fill="#ffffff" stroke="#156064" strokeWidth="4" />
          <path d="M110 42v42M82 56h56M110 56l-18 18M110 56l18 18" fill="none" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
          <path d="M74 78h22c-1-8-6-13-11-18-5 5-10 10-11 18Z" fill="#00C49A" opacity="0.7" />
          <path d="M124 78h22c-1-8-6-13-11-18-5 5-10 10-11 18Z" fill="#00C49A" opacity="0.7" />
          <rect x="96" y="88" width="28" height="8" rx="4" fill="#F8E16C" stroke="#156064" strokeWidth="2" />
          <text x="110" y="122" textAnchor="middle" fill="#156064" fontSize="13" fontWeight="700">
            {shortName}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white via-[#E8FBF5] to-[#DFF7EF] p-4">
      <svg viewBox="0 0 220 140" className="w-full h-32" role="img" aria-label="Clock symbol illustration">
        <rect x="18" y="18" width="184" height="104" rx="22" fill="#156064" opacity="0.08" />
        <circle cx="110" cy="70" r="42" fill="#ffffff" stroke="#156064" strokeWidth="4" />
        <circle cx="110" cy="70" r="5" fill="#00C49A" />
        <path d="M110 70V49" stroke="#156064" strokeWidth="5" strokeLinecap="round" />
        <path d="M110 70l18 10" stroke="#F4B400" strokeWidth="5" strokeLinecap="round" />
        <path d="M110 32v8M110 100v8M72 70h-8M148 70h8" stroke="#156064" strokeWidth="3" strokeLinecap="round" />
        <text x="110" y="122" textAnchor="middle" fill="#156064" fontSize="13" fontWeight="700">
          {shortName}
        </text>
      </svg>
    </div>
  );
}

export default Home;
