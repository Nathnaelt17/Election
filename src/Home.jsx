import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import candidatePhoto from "./assets/download.png"; 

function Home() {
  const [votes, setVotes] = useState({ a: 0, b: 0, c: 0 })
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const openModal = (candidate) => {
    setSelectedCandidate(candidate)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCandidate(null)
  }

  const confirmVote = () => {
    setVotes((prev) => ({
      ...prev,
      [selectedCandidate]: prev[selectedCandidate] + 1,
    }))
  window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-6 py-10">

      {/* Background blobs */}
      <div className="absolute w-[400px] h-[400px] bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      {/* Header */}
      <div className="text-center text-white mb-10 relative z-10">
        <h1 className="text-4xl font-bold">Election Board</h1>
        <p className="text-sm opacity-80 mt-2">Every vote matters</p>
        <div className="w-20 h-1 bg-[#F8E16C] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Candidates */}
      <div className="grid md:grid-cols-3 gap-8 relative z-10">

        <CandidateCard
          name="Candidate A"
          desc="Focused on education and youth development."
          votes={votes.a}
          onVote={() => openModal("a")}
        />

        <CandidateCard
          name="Candidate B"
          desc="Advocates for economic growth and jobs."
          votes={votes.b}
          onVote={() => openModal("b")}
        />

        <CandidateCard
          name="Candidate C"
          desc="Committed to healthcare and sustainability."
          votes={votes.c}
          onVote={() => openModal("c")}
        />

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-2xl animate-fadeIn">
            <FaCheckCircle className="text-[#00C49A] text-4xl mx-auto mb-3" />
            <h2 className="text-xl font-bold text-[#156064] mb-2">
              Confirm Vote
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to vote?
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={confirmVote}
                className="px-4 py-2 rounded-lg bg-[#00C49A] text-white font-semibold hover:bg-[#0ea37f]"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
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
  )
}

/* Candidate Card Component */
function CandidateCard({ name, desc, votes, onVote }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">

      <img
        src={candidatePhoto}
        alt="candidate"
        className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-[#00C49A]"
      />

      <h2 className="text-xl font-bold text-[#156064] text-center mt-4">
        {name}
      </h2>

      <p className="text-gray-600 text-sm text-center mt-2">
        {desc}
      </p>

      <div className="text-center mt-4">
        <p className="text-[#156064] font-semibold">
          Votes: {votes}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <Link
          to="/More_info"
          className="text-center text-sm text-[#00C49A] hover:underline"
        >
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
  )
}

export default Home