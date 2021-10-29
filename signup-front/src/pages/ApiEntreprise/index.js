import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import demarches from './demarches.json';
import ÉquipeSection, {
  getDefaultDelegueProtectionDonneesDescription,
  getDefaultResponsableTraitementDescription,
} from '../../components/organisms/form-sections/ÉquipeSection';
import { DATA_PROVIDER_CONTACT_EMAILS } from '../../config/data-provider-parameters';
import WarningEmoji from '../../components/atoms/icons/WarningEmoji';

const DonneesDescription = () => (
  <>
    <p>Vous pouvez vous aider :</p>
    <ul>
      <li>
        du{' '}
        <a
          href="https://entreprise.api.gouv.fr/catalogue/"
          target="_blank"
          rel="noopener noreferrer"
        >
          catalogue de données
        </a>
        . Il présente l’ensemble des endpoints disponibles accompagnés d’une
        documentation fonctionnelle et technique.
      </li>
      <li>
        des{' '}
        <a
          href="https://entreprise.api.gouv.fr/cas_usage/"
          target="_blank"
          rel="noopener noreferrer"
        >
          cas d’usage
        </a>{' '}
        proposés par API Entreprise. Nous y décrivons les données utiles. Si
        votre besoin correspond à l’un de ses cas d’usage, vous pourrez vous
        appuyez sur le formulaire pré-rempli adéquat.
      </li>
    </ul>
  </>
);

// NB: this list was manually updated from https://dashboard.entreprise.api.gouv.fr/api/admin/roles
// Then edited by API Entreprise UX team
const availableScopes = [
  {
    value: 'entreprises',
    label: 'Données de référence d’une entité - INSEE & Infogreffe',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-entreprises',
  },
  {
    value: 'etablissements',
    label: 'Données de référence d’un établissement - INSEE',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-etablissements',
  },
  {
    value: 'extraits_rcs',
    label: 'Extrait RCS - Infogreffe',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-extraits_rcs_infogreffe',
  },
  {
    value: 'associations',
    label:
      'Informations déclaratives d’une association - Ministère de l’Intérieur',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-associations',
  },
  {
    value: 'documents_association',
    label: 'Divers documents d’une association - Ministère de l’Intérieur',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-documents_associations',
  },
  {
    value: 'actes_inpi',
    label: 'Actes - INPI',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-actes_inpi',
  },
  {
    value: 'conventions_collectives',
    label:
      'Conventions collectives - Fabrique numérique des Ministères Sociaux',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-conventions_collectives',
  },
  {
    value: 'entreprises_artisanales',
    label: 'Données de référence d’une entreprise artisanale - CMA France',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-entreprises_artisanales_cma',
  },
  {
    value: 'effectifs_acoss',
    label: 'Effectifs d’une entreprise - ACOSS 🔐',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-effectifs_..._acoss_covid',
  },
  {
    value: 'eori_douanes',
    label: 'Immatriculation EORI - Douanes',
    groupTitle: 'Informations générales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-eori_douanes',
  },
  {
    value: 'exercices',
    label: 'Chiffre d’affaires - DGFIP 🔐',
    groupTitle: 'Informations financières :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-exercices',
  },
  {
    value: 'bilans_inpi',
    label: 'Bilans annuels - INPI',
    groupTitle: 'Informations financières :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-bilans_inpi',
  },
  {
    value: 'bilans_entreprise_bdf',
    label: '3 derniers bilans annuels - Banque de France 🔐',
    groupTitle: 'Informations financières :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-bilans_entreprises_bdf',
  },
  {
    value: 'liasse_fiscale',
    label: 'Déclarations de résultat - DGFIP 🔐',
    groupTitle: 'Informations financières :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-liasses_fiscales_dgfip',
  },
  {
    value: 'attestations_fiscales',
    label: 'Attestation fiscale - DGFIP 🔐',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-attestations_fiscales_dgfip',
  },
  {
    value: 'attestations_sociales',
    label: 'Attestation de vigilance - ACOSS 🔐',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-attestations_sociales_acoss',
  },
  {
    value: 'attestations_agefiph',
    label: 'Conformité emploi des travailleurs handicapés - AGEFIPH',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-attestations_agefiph',
  },
  {
    value: 'msa_cotisations',
    label: 'Cotisations de sécurité sociale agricole - MSA 🔐',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-cotisations_msa',
  },
  {
    value: 'probtp',
    label: 'Cotisations retraite bâtiment - ProBTP 🔐',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-cotisation_retraite_probtp',
  },
  {
    value: 'fntp_carte_pro',
    label: 'Carte professionnelle travaux publics - FNTP',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-cartes_professionnelles_fntp',
  },
  {
    value: 'certificat_cnetp',
    label: 'Cotisations congés payés & chômage intempéries - CNETP 🔐',
    groupTitle: 'Attestations sociales et fiscales :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-certificats_cnetp',
  },
  {
    value: 'certificat_agence_bio',
    label: 'Certifications en BIO',
    groupTitle: 'Certifications professionnelles :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-certificats_agence_bio',
  },
  {
    value: 'certificat_rge_ademe',
    label: 'Certificats RGE - ADEME',
    groupTitle: 'Certifications professionnelles :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-certificats_rge_ademe',
  },
  {
    value: 'qualibat',
    label: 'Certification de qualification bâtiment - Qualibat',
    groupTitle: 'Certifications professionnelles :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-certificats_qualibat',
  },
  {
    value: 'certificat_opqibi',
    label: 'Certification de qualification d’ingénierie - OPQIBI',
    groupTitle: 'Certifications professionnelles :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-certificats_opqibi',
  },
  {
    value: 'extrait_court_inpi',
    label: 'Brevets, modèles et marques déposés - INPI',
    groupTitle: 'Propriété intellectuelle :',
    link: 'https://entreprise.api.gouv.fr/catalogue/#a-extraits_courts_inpi',
  },
];

const CadreJuridiqueDescription = () => (
  <>
    <p>
      L’accès à un endpoint de l’API Entreprise se fait sous réserve que son
      utilisation soit justifiée. L’accès à la donnée requiert la fourniture
      d’un cadre juridique précis. Par exemple, si vous êtes une administration
      centrale, une agence d’État, un opérateur, ou un service déconcentré, il
      vous faudra transmettre le décret ou l’arrêté justifiant votre demande.
    </p>
    <p>
      <WarningEmoji /> Attention, quel que soit votre statut, le{' '}
      <a
        href="https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000031366350/2020-12-14/"
        target="_blank"
        rel="noopener noreferrer"
      >
        CRPA (Code des relations entre le public et l’administration)
      </a>
      , la{' '}
      <a
        href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037307624/"
        target="_blank"
        rel="noopener noreferrer"
      >
        loi ESSOC (pour un État au service d’une société de confiance)
      </a>{' '}
      ou la loi Lemaire (pour une République numérique){' '}
      <b>ne sont pas suffisants</b> car ils indiquent un principe d’échange qui
      doit être complété par un cadre juridique précis pour l’utilisation
      envisagée.
    </p>
  </>
);

const initialContacts = {
  demandeur: {
    header: 'Demandeur',
    description: (
      <>
        <b>Le demandeur</b>, c'est vous, dépose la demande et recevra les accès
        techniques par mail. Il sera contacté en cas de problème fonctionnel sur
        votre service.
      </>
    ),
    forceDisable: true,
  },
  responsable_traitement: {
    header: 'Responsable de traitement',
    description: getDefaultResponsableTraitementDescription(),
  },
  delegue_protection_donnees: {
    header: 'Délégué à la protection des données',
    description: getDefaultDelegueProtectionDonneesDescription(),
  },
  responsable_technique: {
    header: 'Contact technique',
    description: (
      <>
        <b>Le contact technique</b> sera averti de l’expiration des jetons au
        bout de 18 mois. Afin de garantir que votre service ne soit pas
        interrompu, merci de renseigner une adresse email générique, une boite
        au lettre fonctionnelle, une mailing liste ou une liste de diffusion
        afin que nous puissions vous transmettre les nouveaux jetons malgré des
        aléas de changement de poste, congés ou autre. Le contact technique sera
        également averti des évolutions techniques et des incidents.
      </>
    ),
    displayGroupEmailLabel: true,
  },
};

const ApiEntreprise = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="api_entreprise"
    demarches={demarches}
    contactInformation={[
      {
        email: DATA_PROVIDER_CONTACT_EMAILS.api_entreprise,
        label: 'Contact mail',
        subject: 'Contact%20via%20datapass.api.gouv.fr',
      },
    ]}
    documentationUrl="https://entreprise.api.gouv.fr/doc/"
  >
    <OrganisationSection />
    <DemarcheSection />
    <DescriptionSection />
    <DonneesSection
      availableScopes={availableScopes}
      DonneesDescription={DonneesDescription}
    />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <ÉquipeSection initialContacts={initialContacts} />
    <CguSection cguLink="https://entreprise.api.gouv.fr/cgu/" />
  </Form>
);

ApiEntreprise.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiEntreprise.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiEntreprise;
