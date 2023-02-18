import Country from './Country';
import ItalyImg from '@/public/countries/italy.png';
import SpainImg from '@/public/countries/spain.png';
import UnitedKingdomImg from '@/public/countries/unitedKingdom.png';
import FranceImg from '@/public/countries/france.png';
import GermanyImg from '@/public/countries/germany.png';

const Countries = () => {
  return (
    <ul className="mt-5 w-72">
      <Country image={ItalyImg} country="Italy" />
      <Country image={SpainImg} country="Spain" comingSoon={true} />
      <Country image={FranceImg} country="France" comingSoon={true} />
      <Country image={GermanyImg} country="Germany" comingSoon={true} />
      <Country
        image={UnitedKingdomImg}
        country="United Kingdom"
        comingSoon={true}
      />
    </ul>
  );
};

export default Countries;
