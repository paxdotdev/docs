import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const logo = ({ darkMode }) => (
  <svg
    height="30"
    viewBox="0 0 297 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_100_305)">
      <path
        d="M62.8831 75.0046C72.2158 75.0046 80.687 66.4399 80.687 57.0042C80.687 47.5686 72.2158 39.0039 62.8831 39.0039C53.5504 39.0039 45.0792 47.5686 45.0792 57.0042C45.0792 66.4399 53.5504 75.0046 62.8831 75.0046Z"
        fill="currentColor"
      />
      <path
        d="M0 8.42178V139.807L22.8643 149.814V149.737L22.8562 149.743V97.5579V53.8939L22.8643 15.7005L45.6553 7.85025L22.8643 0L0 8.42178Z"
        fill="currentColor"
      />
      <path
        d="M262.765 7.85022H45.6526V25.6033C45.6037 25.6445 45.5547 25.6829 45.5085 25.7242C50.6994 21.3306 57.4802 18.624 63.5652 18.624C79.8119 18.624 96.1889 33.0936 99.1187 51.2533C101.915 32.7336 118.553 18.5031 137.599 18.5031C143.817 18.5031 149.739 20.9733 154.862 24.9933V18.5031H176.468V95.4999H154.862V88.5316C150.378 92.7109 143.817 95.0218 137.599 95.0218C118.667 95.0218 102.116 80.9644 99.1676 62.6124C96.4879 80.7089 81.0511 94.5904 62.4047 94.5904C56.3795 94.5904 50.3733 92.5323 45.6499 88.3256V105.342H262.762L296.997 56.6938L262.762 7.85022H262.765ZM254.872 95.1866H230.168L216.09 74.3314L200.835 95.1866H176.523L203.969 57.0839L177.428 18.3383H201.925L216.397 39.504L230.244 18.3383H254.872L228.374 57.0839L254.872 95.1866Z"
        fill="currentColor"
      />
      <path
        d="M155.389 56.7653C155.389 47.1262 146.755 38.3967 137.221 38.3967C127.688 38.3967 119.053 47.1262 119.053 56.7653C119.053 66.4043 127.688 75.1338 137.221 75.1338C146.755 75.1338 155.389 66.4043 155.389 56.7653Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_100_305">
        <rect width="297" height="149.814" fill="white" />
      </clipPath>
    </defs>
    <style jsx>{`
      svg {
        mask-image: linear-gradient(
          60deg,
          black 25%,
          rgba(0, 0, 0, 0.2) 50%,
          black 75%
        );
        mask-size: 400%;
        mask-position: 0%;
      }
      svg:hover {
        mask-position: 100%;
        transition:
          mask-position 1s ease,
          -webkit-mask-position 1s ease;
      }
    `}</style>
  </svg>
);

const config: DocsThemeConfig = {
  logo,
  project: {
    link: 'https://github.com/paxengine/pax',
  },
  chat: {
    link: 'https://discord.com/invite/Eq8KWAUc6b',
  },
  docsRepositoryBase: 'https://github.com/paxengine/docs',
  footer: {
    text: 'Pax Corp Inc.',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Pax Docs" />
      <meta property="og:description" content="Documentation for Pax" />
      <link rel="icon" href="./favicon.svg" type="image/svg+xml"></link>
    </>
  )
}

export default config

