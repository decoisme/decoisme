export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Decoisme',
    url: 'https://decoisme.vercel.app',
    image: 'https://decoisme.vercel.app/profile.jpg',
    jobTitle: 'Developer & Designer',
    description: 'Professional Developer & Designer specializing in web development, UI/UX design, Instagram content, PowerPoint presentations, and modern digital experiences',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta Selatan',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    email: 'decoisme.works@gmail.com',
    sameAs: [
      'https://github.com/decoisme',
      'https://linkedin.com/in/decoisme',
      'https://twitter.com/decoisme',
    ],
    knowsAbout: [
      'UI/UX Design',
      'Instagram Design',
      'Carousel Post Design',
      'Web Design',
      'Figma',
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Social Media Design',
    ],
    offers: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Single Post Design',
          description: 'Instagram feed design service',
          price: '30000',
          priceCurrency: 'IDR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Carousel Post Design',
          description: 'Instagram carousel post design service (up to 3 slides)',
          price: '60000',
          priceCurrency: 'IDR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Package',
          description: 'Custom design package tailored to your needs',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
