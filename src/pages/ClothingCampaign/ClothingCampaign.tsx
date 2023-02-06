/* eslint-disable jsx-a11y/iframe-has-title */
import { Main, CardMap, Description, DivMaps } from "./styles";
import imgCampanha from "../../img/campanhaAgasalho.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";

interface ILocalDoacao {
  nome: string;
  endereco: string;
  fone: number | null;
}

export default function ClothingCampaign() {
  const local: ILocalDoacao[] = [
    {
      nome: "Cruz Vermelha São Paulo",
      endereco:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.748951426657!2d-46.658534084474795!3d-23.613334869400113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a1348e97317%3A0x8a0623ff6a0d68ca!2sAv.%20Moreira%20Guimar%C3%A3es%2C%20699%20-%20Indian%C3%B3polis%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004074-031!5e0!3m2!1spt-PT!2sbr!4v1661878725477!5m2!1spt-PT!2sbr",
      fone: 115056866,
    },

    {
      nome: "Museu de Arte de São Paulo Assis       Chateaubriand",
      endereco:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1956985746106!2d-46.66036657048278!3d-23.56141393569088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59ceb1eb771f%3A0xe904f6a669744da1!2sMuseu%20de%20Arte%20de%20S%C3%A3o%20Paulo%20Assis%20Chateaubriand!5e0!3m2!1spt-PT!2sbr!4v1661881855605!5m2!1spt-PT!2sbr",
      fone: 1131495959,
    },

    {
      nome: "Estacão Chácara Klabin Metrô",
      endereco:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.3226486609005!2d-46.63254128453309!3d-23.59275888466725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5bd1c4f7962b%3A0x20f28ad0ade78fad!2zRXN0YWPDo28gQ2jDoWNhcmEgS2xhYmluIE1ldHLDtA!5e0!3m2!1spt-PT!2sbr!4v1661882232030!5m2!1spt-PT!2sbr",
      fone: null,
    },
    {
      nome: "Estacão Capão Redondo Metrô",
      endereco:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.464130074948!2d-46.77257827399548!3d-23.659354535487125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce53b8412d5577%3A0x674118f6e41e68d1!2sCap%C3%A3o%20Redondo!5e0!3m2!1spt-BR!2sbr!4v1661994188029!5m2!1spt-BR!2sbr",
      fone: null,
    },
    {
      nome: "Paróquia São Miguel Arcanjo",
      endereco:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.572579717477!2d-46.59611068453366!3d-23.54787068468961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59334f40fb33%3A0xcb94a8a68f846364!2sPar%C3%B3quia%20S%C3%A3o%20Miguel%20Arcanjo!5e0!3m2!1spt-PT!2sbr!4v1662468656818!5m2!1spt-PT!2sbr",
      fone: 1126926798,
    },
    {
      nome: "Casa de Oração do Povo de Deus",
      endereco:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.7722889706033!2d-46.39370388453272!3d-23.612498184657543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6fa03ccf6357%3A0x2198d1efba439c48!2sCasa%20de%20Ora%C3%A7%C3%A3o%20do%20Povo%20de%20Deus!5e0!3m2!1spt-PT!2sbr!4v1662468827570!5m2!1spt-PT!2sbr",
      fone: 1126926798,
    },
  ];

  return (
    <>
      <Header />
      <AnimatedPage>
        <Main>
          <Description>
            <h2>O que é?</h2>
            <p>
              O objetivo da campanha é arrecadar roupas, principalmente
              agasalhos, além de cobertores em bom estado, que serão doados às
              famílias em situação de vulnerabilidade social.
            </p>
          </Description>
          <figure>
            <img src={imgCampanha} alt="imagem_da_campanha" />
          </figure>
          <DivMaps>
            <h2>Pontos de Doação</h2>
            <ul>
              {local.map((elem) => {
                return (
                  <li key={elem.endereco}>
                    <span>{elem.nome}</span>
                    <CardMap>
                      <iframe src={elem.endereco}></iframe>
                    </CardMap>
                  </li>
                );
              })}
            </ul>
          </DivMaps>
        </Main>
        <Footer color={"#02A4DC"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}
