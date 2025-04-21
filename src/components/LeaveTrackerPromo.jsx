import React from "react";
import illustration from "../assets/leave-tracker-illustration.png";

const LeaveTrackerPromo = () => {
  const onSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="bg-[#1E3270] text-white rounded-[32px] px-6 md:px-12 py-14 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto my-16 md:my-20">
      <div className="w-full md:w-[40%] flex justify-center md:justify-start">
        <img
          src={illustration}
          alt="Person climbing arrow graph"
          className="w-[260px] md:w-[320px]"
        />
      </div>

      <div className="w-full md:w-[55%] text-center md:text-left mt-10 md:mt-0">
        <p className="text-base md:text-[28px] mb-8">
          LeaveTracker is available as a Discord, Microsoft Teams, and Google
          Workspace integration. <br />
          All made with one goal – to make leave tracking effortless.
        </p>
        <button
          className="bg-white text-[#1E3270] font-semibold px-10 py-2 rounded-[12px] text-base md:text-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 mx-auto md:mx-0 shadow-sm"
          onClick={onSignup}
        >
          Sign up now
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default LeaveTrackerPromo;
