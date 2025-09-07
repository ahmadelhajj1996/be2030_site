import { FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="fixed bottom-0 left-0 right-0 bg-[#b9a779] text-white py-4 px-6 z-50"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright text */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm md:text-base">
              {" "}
              جميع الحقوق محفوظة ل be2030{" "}
            </p>
          </div>

          {/* Social media links */}
          <div className="flex justify-center  gap-x-5">
            <a
              href="https://www.tiktok.com/@be20305"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#ffffff] transition-colors duration-300"
              aria-label="Visit our TikTok"
            >
              <FaTiktok size={24} />
            </a>
            <a
              href="https://www.facebook.com/share/17C5csMAHa/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#ffffff] transition-colors duration-300"
              aria-label="Visit our Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://x.com/be20300?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#ffffff] transition-colors duration-300"
              aria-label="Visit our Twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
