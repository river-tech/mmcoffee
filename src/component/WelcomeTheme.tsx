import React from 'react'

const WelcomeTheme = ({
  userName,
  backgroundUrl
}: {
  userName: string,
  backgroundUrl: string
}) => {
  function removeVietnameseTones(str: string): string {
    if(!str) return str
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[550px] mt-[60px] px-5 text-center flex flex-col justify-center text-white"
        style={{ backgroundImage: `url(${backgroundUrl})` }} 
      >
       
        <div className="relative z-10">
          <p className="text-xs mb-2 uppercase">WELCOME {removeVietnameseTones(userName)} TO</p>
          <h1 className="text-6xl font-bold">Booking</h1>
        </div>
      </div>
    </div>
  )
}

export default WelcomeTheme
