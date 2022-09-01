import React from "react";

export const DemoModal = (props: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = React.useState(false);
  const handleClickOutside = (e: any) => {
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Demo
      </button>
      {showModal ? (
        <>
          <div
            onClick={(e) => handleClickOutside(e)}
            className="inset-0 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="border-0  p-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {props.children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
