'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './footerStyle.css';
import { Facebook, Instagram, PhilippinePeso, Youtube } from 'lucide-react';
import Pinterest from './Pinterest';
import FooterButon from '../buttons/footer-buton';

const FooterM = () => {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHome(window.location.pathname === '/');
    }
  }, []);

  const contactChannels = [
    {
      icon: <Instagram />,
      name: 'Instagram',
      link: 'https://www.instagram.com/gsgdesignsrl',
    },
    {
      icon: <Facebook />,
      name: 'Facebook',
      link: 'https://www.facebook.com/GSGled',
    },
    {
      icon: <Pinterest />,
      name: 'Pinterest',
      link: 'https://ar.pinterest.com/gsgdesignn',
    },
    {
      icon: <Youtube />,
      name: 'YouTube',
      link: 'https://www.youtube.com/@gsgdesign5903',
    },
  ];

  return (
    <>
      <footer className={`container-footer ${isHome ? 'bg-[#170c01]' : ''}`}>
        <div className="flex w-full flex-wrap justify-between">
          <div>
            <section className="cont-h2-footer">
              <h2
                className={`h2-footer ${isHome ? 'text-white' : 'text-black'}`}
              >
                We are light
              </h2>
            </section>
            <img
              src="/imagenes/logo-red.svg"
              alt="logo"
              className="h-[10vh] ml-4 mt-4"
            />
            <FooterButon isHome={isHome} rute={'contacto'}>
              Conectate
            </FooterButon>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="cont-text-otros flex flex-col md:items-end gap-2 ">
              <h3>Fabricantes, para mayoristas</h3>
              <p
                className={`${isHome ? 'text-white text-xl' : 'text-black text-xl'}`}
              >
                CABA, Argentina
              </p>
            </div>
            <div className="cont-text-otros flex flex-col md:items-end ">
              <div className="cont-text-otros">
                <h3>Redes</h3>
              </div>
              <div className="flex md:flex-col">
                {contactChannels.map((channel, index) => (
                  <Link
                    key={index}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isHome ? 'text-white flex p-2 gap-2 items-center hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out rounded-xl' : 'text-black flex p-2 gap-2 items-center hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out rounded-xl'}`}
                  >
                    {channel.icon}
                    <h2 className="text-end md:block hidden text-xl">
                      {channel.name}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterM;
