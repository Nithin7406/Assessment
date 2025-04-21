import {
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGamepad,
} from "react-icons/fa";

const SocialIcons = () => (
  <div className="flex space-x-4 text-xl">
    <a
      href="https://www.linkedin.com/in/nithinkumara/"
      aria-label="LinkedIn"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400"
    >
      <FaLinkedin />
    </a>
    <a
      href="https://www.facebook.com"
      aria-label="Facebook"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400"
    >
      <FaFacebookF />
    </a>
    <a
      href="https://www.instagram.com"
      aria-label="Instagram"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400"
    >
      <FaInstagram />
    </a>
    <a
      href="https://www.twitter.com"
      aria-label="Twitter"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400"
    >
      <FaTwitter />
    </a>
    <a
      href="https://www.youtube.com"
      aria-label="YouTube"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400"
    >
      <FaYoutube />
    </a>
    <a
      href="https://www.twitch.com"
      aria-label="Twitch"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400"
    >
      <FaGamepad />
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#0D1320] text-white py-10 px-4">
      <div className="bg-[#131B2D] max-w-6xl mx-auto px-6 py-10 rounded-md grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="flex flex-col items-start justify-center mb-8 md:mb-0">
          <p className="mb-4 text-sm">© 2025 LeaveTracker</p>
          <SocialIcons />
        </section>

        <section className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-base font-semibold mb-2">Product</h4>
            <p className="mb-1 text-sm">Features</p>
            <p className="text-sm">How it works</p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-2">Company</h4>
            <p className="mb-1 text-sm">Backed By</p>
            <p className="mb-1 text-sm">Terms of use</p>
            <p className="text-sm">Privacy Policy</p>
          </div>
        </section>

        <section>
          <h4 className="text-base font-semibold mb-2">Contact us</h4>
          <p className="mb-1 text-sm">Call: +91 74061 52587</p>
          <p className="text-sm">Email: nithinkumar6330.nk@gmail.com</p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
