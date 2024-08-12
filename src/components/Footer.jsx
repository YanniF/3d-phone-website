import {footerLinks} from '../constants/index.js';

const Footer = () => {
  return (
    <footer className="p-5 sm:px-10">
      <div className="screen-max-width">
        <div>
          <p className="text-xs font-semibold text-gray">
            More ways to shop: {' '}
            <a href="/" className="text-blue underline">
            Find an uwu Store {' '}
            </a>
            or {' '}
            <a href="/" className="text-blue underline">
            other retailer
            </a>{' '}
            near you.
          </p>
          <p className="text-xs font-semibold text-gray">
            Or call 000800-040-1966
          </p>
        </div>

        <div className="my-5 h-px w-full bg-neutral-700"/>

        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <p className="text-xs font-semibold text-gray">Copyright @ 2024 uwu Inc. All rights reserved.</p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <a href="/" key={link} className="text-xs font-semibold text-gray">
                {link}{' '}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
