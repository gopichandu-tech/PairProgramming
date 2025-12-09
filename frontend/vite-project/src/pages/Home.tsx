import StartingCards from '@/components/StartingCards';
import PairingForm from '@/forms/PairingForm';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-[30px] my-[30px]'>
        <StartingCards />
        <PairingForm />
    </div>
  )
}

export default Home;