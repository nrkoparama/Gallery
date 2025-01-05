function Picture() {
  return (
    <div className="w-[80rem] bg-[#fff9f9] mx-auto my-[90px] p-[20px] border-dashed border-[4px] border-[#C0C8CA] flex justify-evenly">
      <div className="w-[30rem] mt-[20px]">
        <div className="w-full shadow-lg">
          <img
            src="/images/fishing-HieuNghiaMini.jpg"
            alt="beach-PeterpenPhoto"
            className="w-full"
          />
        </div>
        <p className="text-4xl text-center my-3">Biển và em</p>
      </div>

      <div className="w-[40rem] text-lg tracking-wide mt-[20px] p-[18px] flex flex-col">
        <div className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-[16px] float-left"
          >
            <path d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z" />
          </svg>
        </div>
        <p className="indent-10 p-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry.
        </p>
        <div className="w-full">
          <svg
            className="w-[16px] float-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z" />
          </svg>
        </div>
        <div className="w-full mt-2 flex flex-col">
          <p>Tấn Đạt</p>
          <p>03/01/2025</p>
        </div>
      </div>
    </div>
  );
}
export default Picture;
