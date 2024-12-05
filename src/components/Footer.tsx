import Link from 'next/link'
import { Container } from './Container'

const Footer = () => {
  return (
    <footer className='bg-myMedBlue h-20 relative'>
      <Container>

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-white'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex space-x-8'>
              <Link
                href='/about-us'
                className='text-sm text-white hover:text-gray-200'>
                About us
              </Link>
              <Link
                href='#'
                className='text-sm text-white hover:text-gray-200'>
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-sm text-white hover:text-gray-200'>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
