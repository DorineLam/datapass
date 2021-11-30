import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import HomologationSecuriteSection from '../../components/organisms/form-sections/dgfip-sections/HomologationSecuriteSection';
import RecetteFonctionnelleSection from '../../components/organisms/form-sections/dgfip-sections/RecetteFonctionnelleSection';
import VolumetrieSection from '../../components/organisms/form-sections/dgfip-sections/VolumetrieSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import ÉquipeInitializerSection from '../../components/organisms/form-sections/ÉquipeSection/ÉquipeInitializerSection';
import { DATA_PROVIDER_CONTACT_EMAILS } from '../../config/data-provider-parameters';

const target_api = 'api_ensu_dad_production';
const steps = ['api_ensu_dad_sandbox', target_api];

const ApiEnsuDadProduction = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    steps={steps}
    PreviousEnrollmentDescription={() => null}
    documentationUrl="https://api.gouv.fr/producteurs/dgfip"
    contactInformation={[
      {
        email: DATA_PROVIDER_CONTACT_EMAILS.dgfip,
        label: 'Nous contacter',
        subject: 'Contact%20via%20datapass.api.gouv.fr',
      },
    ]}
  >
    <ÉquipeInitializerSection />
    <RecetteFonctionnelleSection />
    <CadreJuridiqueSection />
    <HomologationSecuriteSection />
    <VolumetrieSection options={[500]} />
    <CguSection cguLink="/docs/cgu_pcr_v1/CGU_API ENSU DAD_PCR_PROD_2021_v1.0.pdf" />
  </Form>
);

ApiEnsuDadProduction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiEnsuDadProduction.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiEnsuDadProduction;