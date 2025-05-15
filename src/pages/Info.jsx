import React from 'react'

const Info = () => (
  <div className="max-w-2xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">Ohjeet ja tietoa FreeWo-sivuston käytöstä</h1>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Yleistä</h2>
      <p>
        FreeWo on alusta, jossa asiakkaat voivat etsiä ammattilaisia ja julkaista toimeksiantoja, ja ammattilaiset voivat tehdä tarjouksia sekä tarjota osaamistaan.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Rekisteröityminen ja kirjautuminen</h2>
      <ul className="list-disc ml-6">
        <li>Valitse roolisi (toimeksiantaja tai ammattilainen) rekisteröityessäsi.</li>
        <li>Kirjaudu sisään sähköpostilla ja salasanalla.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Toimeksiantajana</h2>
      <ul className="list-disc ml-6">
        <li>Voit luoda uusia toimeksiantoja ja hallita niitä omalla dashboardilla.</li>
        <li>Voit selata ja etsiä ammattilaisia sekä ottaa heihin yhteyttä sähköpostilla profiilisivulta.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Ammattilaisena</h2>
      <ul className="list-disc ml-6">
        <li>Voit selata ja hakea toimeksiantoja sekä ottaa yhteyttä asiakkaisiin sähköpostilla toimeksiannon sivulta.</li>
        <li>Voit muokata omaa profiiliasi ja osaamisiasi dashboardilla.</li>
      </ul>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-2">Yhteydenotto ja viestintä</h2>
      <ul className="list-disc ml-6">
        <li>Yhteydenotto tapahtuu sähköpostilla profiili- ja toimeksiantosivujen kautta.</li>
        <li>Viestipainikkeet näkyvät vain kirjautuneille käyttäjille oikeassa roolissa.</li>
      </ul>
    </section>
  </div>
)

export default Info