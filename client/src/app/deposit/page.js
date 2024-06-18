import React from "react";

const Page = () => {
  return (
    <section className="border-t-4 border-t-black inset-0 w-full flex flex-col items-center justify-center bg-main bg-[linear-gradient(to_right,#00000033_1px,transparent_1px),linear-gradient(to_bottom,#00000033_1px,transparent_1px)] bg-[size:70px_70px] px-5 py-[200px] m1000:py-[150px] m500:py-[120px] min-h-[92vh]">
      <h2 className="text-center font-heading text-5xl m1000:text-3xl m500:text-2xl m400:text-xl">
        Craft Your Winning Strategy Today.
      </h2>


      <div className="flex gap-5">
        <div className="mt-[50px] flex font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base">
          Deposit
          <img
            className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
            src={"svgs/arrow.svg"}
            alt="arrow"
          />
        </div>
        <div className="mt-[50px] flex font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base">
          Acceptance
          <img
            className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
            src={"svgs/arrow.svg"}
            alt="arrow"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
