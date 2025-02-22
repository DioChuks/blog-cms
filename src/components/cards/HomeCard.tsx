import { FC } from 'react'

interface HomeCardProps {
    icon: string;
    value: number | string;
    title: string;
}

const HomeCard: FC<HomeCardProps> = ({ icon, value, title }) => {
  return (
    <div className="w-[263px] h-[140px] bg-white flex flex-col justify-center items-center gap-2 rounded-lg shadow-[0px_2px_48px_0px_rgba(0,0,0,0.04)]">
        <img src={icon} alt="icon" width={40} height={40}/>
        <div className='text-center gap-1'>
            <h4 className='font-bold text-3xl text-[#2F3F67]'>{value}</h4>
            <p className='font-normal text-sm text-[#5C6E9A]'>{title}</p>
        </div>
    </div>
  )
}

export default HomeCard