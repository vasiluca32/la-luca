import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <>
      <Helmet>
        <title>Cum comand - Gradina La Luca</title>
      </Helmet>
      <main>
        <div className='container'>
          <section className='info-component'>
            <h1>Cum se face o comanda pe siteul nostru?</h1>
            <p>
              Primul pas este sa va autentificati.<br></br> Mergeti la pagina de{' '}
              <Link to='/login'>autentificare</Link>, introduceti o adresa de
              e-mail valida iar mai apoi veti primi un link de autentificare pe
              acea adresa. Urmati linkul si gata, sunteti autentificat.
            </p>
            <p>
              Apoi mergeti la pagina de produse unde adaugati in cos produsele
              pe care doriti sa le comandati
            </p>
            <p>
              Ultimul pas este sa mergeti la cosul de cumparaturi, dati click pe
              butonul "plaseaza comanda", in noua fereastra introduceti un numar
              de telefon pe care sa va sunam cand vom livra comanda si salvati.
            </p>
            <p>
              Noi va vom trimite imediat un email cu sumarul comenzii si urmeaza
              sa ne auzim la telefon.
            </p>
            <p>Plata se va face doar la livrare.</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Info;
