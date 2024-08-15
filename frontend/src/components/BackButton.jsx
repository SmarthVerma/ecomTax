import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
// be fure you got wrapper as relative
const BackButton = ({to}) => {
  return (
      <Link to={to}
          className='absolute rounded-full top-0 left-0 md:-left-20 cursor-pointer hover:scale-125'>
          <IoMdArrowRoundBack className='text-4xl text-white' />
      </Link>
  )
}

export default BackButton;