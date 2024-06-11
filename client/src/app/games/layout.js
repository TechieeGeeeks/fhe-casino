import CustomTable from "@/components/Table";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <div className="not-prose flex w-full items-center justify-center z-[15] relative mb-5 bg-white bg-[radial-gradient(#cacbce_1px,transparent_1px)] px-10 py-20 [background-size:16px_16px] m750:px-5 m750:py-10">
        <CustomTable />
      </div>
    </>
  );
}
