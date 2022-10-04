import WarningText from '../compoments/warningText';
import Details from '../compoments/details';
import TextLink from '../compoments/textLink';
import React from 'react';
import Link from 'next/link';
import ContactNumbers from '../compoments/contactNumbers';
import { serviceName } from '../helpers/constants';
import { councilWebsiteHomePageUrl, contactUsPagePath } from '../globals';
import { OpeningHours } from '../compoments/openingHours';
import { isMvpReleaseVersion } from '../helpers/features';

export default function Home() {
  const title = 'Request a repair';
  return (
    <main className="govuk-main-wrapper" id='main-content'>
      <div className="govuk-grid-row govuk-body-m">
        <header>
          <title>
            {title} - {serviceName}
          </title>
        </header>
        <div className="govuk-grid-column-two-thirds">
          <h1 className={'govuk-heading-xl'}>{title}</h1>
          {isMvpReleaseVersion() &&
            <>
              <h2 className={'govuk-heading-m'}>Before you start</h2>
              <WarningText
                testid="landing-page-report-limit-warning"
              >
                This service can only be used to request one repair at a time to a
                council property.
              </WarningText>
              <p>
                If you <strong>own the property</strong>, please see our{' '}
                <TextLink
                  href={`${councilWebsiteHomePageUrl}/${contactUsPagePath}`}
                  target={'_blank'}
                >
                  leaseholder contact details page{' '}
                </TextLink>
                .
              </p>
              <p>
                To request a repair for a <strong>communal area</strong>, please see
                customer services contact{' '}
                <TextLink
                  href={`${councilWebsiteHomePageUrl}/${contactUsPagePath}`}
                  target={'_blank'}
                >
                  details page
                </TextLink>
                .
              </p>
              <Details
                summary="What is a communal area?"
                data-testid="landing-page-communal-prompt"
              >
                <div data-testid="landing-page-communal-info">
                  <p>Communal repairs are usually in areas that people share.</p>
                  <p className={'govuk-list govuk-list--bullet'}>They can include:</p>
                  <ul>
                    <li>repairs to door entry systems</li>
                    <li>lock repairs to communal doors</li>
                    <li>lighting repairs to shared areas</li>
                    <li>glazing repairs to shared doors or stairway windows</li>
                    <li>roof and gutter repairs</li>
                    <li>structure and external walls to your block</li>
                  </ul>
                </div>
              </Details>
              <WarningText testid="landing-page-gas-warning" className="">
                If you suspect you have a gas leak, you must report it immediately to
                the Gas Emergency Service on 0800 111 999 or via textphone (minicom)
                on 0800 371 787
              </WarningText>
              <WarningText testid="landing-page-emergency-warning" className="">
                For other emergency repairs, please see customer services{' '}
                <TextLink
                  href={`${councilWebsiteHomePageUrl}/${contactUsPagePath}`}
                  target={'_blank'}
                >
                  contact details page
                </TextLink>
                .
              </WarningText>
              <Details
                summary="What is an emergency?"
                testid="landing-page-emergency-prompt"
              >
                <div data-testid="landing-page-emergency-info">
                  <p>
                    An emergency is defined as something which could cause danger to
                    someone’s health or safety or cause serious damage and destruction
                    to property.
                  </p>
                  <ContactNumbers />
                  <p>Opening times:</p>
                  <OpeningHours />
                </div>
              </Details>
            </>}

          {!isMvpReleaseVersion() &&
            <>
              <p>
                You can use this service to report a non-emergency repair for your council property including leasehold or communal areas. You should only report one problem at a time.
              </p>
              <h2 className={'govuk-heading-m'}>Emergency Repairs</h2>
              <p data-testid='landing-page-emergency-warning'>
                For emergency repairs see our{' '}

                <TextLink
                  href={`${councilWebsiteHomePageUrl}/${contactUsPagePath}`}
                  target={'_blank'}
                >
                  emergency repairs page
                </TextLink>
                .
              </p>

              <h2 className={'govuk-heading-m'}>Gas Leaks</h2>
              <p data-testid='landing-page-gas-warning'> If you suspect you have a gas leak, you must report it immediately to the Gas Emergency Service on <strong>0800 111 999</strong> or via textphone (minicom) on <strong>0800 371 787</strong> </p>
              <h2 className={'govuk-heading-m'}>Report a repair</h2>
              <p data-testid='landing-page-report-repair-text'>
                Report a repair for your council property including leasehold or communal areas
              </p>
            </>}
          <Link href="/report-repair/priority-list">
            <a
              role="button"
              draggable="false"
              className="govuk-button govuk-button--start"
              data-module="govuk-button"
            >
              Start now
              <svg
                className="govuk-button__start-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="19"
                viewBox="0 0 33 40"
                aria-hidden="true"
                focusable="false"
              >
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </a>
          </Link>
          {!isMvpReleaseVersion() &&
            <>
              <h2 className={'govuk-heading-m'}>Change or cancel your repair appointment</h2>
              <p>
                Change or cancel a repair appointment, you cannot change or cancel communal repairs.
              </p>
              <TextLink
                href="/report-repair/lookup-appointment"
              >
                Search for a repair appointment to change or cancel
              </TextLink>
            </>
          }
        </div>
      </div></main>
  )
}

