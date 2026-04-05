export function StructuredData() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Guau Fresh - Espuma Limpiadora para Perros",
    image: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post10_origen_vegetal-YK0v2xfT3HkGhVm0GXWdJEVUAY9tTg.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post11_rutina_3pasos-M26keFJIaHf6X7ADXlETOy4ArudJSF.png"
    ],
    description: "Espuma limpiadora en seco para perros con ingredientes 100% naturales. Limpia, humecta y da brillo al pelaje de tu mascota sin necesidad de agua. Contiene proteína de trigo hidrolizada y extractos vegetales.",
    sku: "GUAUFRESH-150ML",
    brand: {
      "@type": "Brand",
      name: "Guau Fresh"
    },
    offers: {
      "@type": "Offer",
      url: "https://guaufresh.com",
      priceCurrency: "COP",
      price: "45000",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Guau Fresh Colombia"
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "María García"
        },
        reviewBody: "Mi perro queda súper limpio y con un aroma delicioso. Lo mejor es que no necesito agua."
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Carlos Rodríguez"
        },
        reviewBody: "Excelente producto, el pelaje de mi mascota brilla como nunca. 100% recomendado."
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Guau Fresh",
    url: "https://guaufresh.com",
    logo: "https://guaufresh.com/logo-guaufresh.png",
    sameAs: [
      "https://www.facebook.com/guaufresh",
      "https://www.instagram.com/guaufresh",
      "https://www.tiktok.com/@guaufresh"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-XXX-XXX-XXXX",
      contactType: "customer service",
      areaServed: "CO",
      availableLanguage: "Spanish"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Guau Fresh Colombia",
    image: "https://guaufresh.com/logo-guaufresh.png",
    "@id": "https://guaufresh.com",
    url: "https://guaufresh.com",
    telephone: "+57-XXX-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressRegion: "Cundinamarca",
      addressCountry: "CO"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.7110,
      longitude: -74.0721
    },
    priceRange: "$$"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo se usa la espuma Guau Fresh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agita el envase, aplica la espuma sobre el pelaje seco de tu mascota, masajea suavemente y retira el exceso con una toalla. No requiere enjuague."
        }
      },
      {
        "@type": "Question",
        name: "¿Es seguro para todo tipo de perros?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, Guau Fresh está formulado con ingredientes naturales y es seguro para perros de todas las razas y edades. No contiene parabenos ni sulfatos."
        }
      },
      {
        "@type": "Question",
        name: "¿Con qué frecuencia puedo usar Guau Fresh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puedes usarlo las veces que necesites entre baños completos. Es ideal para limpiezas rápidas después de paseos o cuando tu mascota necesita refrescarse."
        }
      },
      {
        "@type": "Question",
        name: "¿Hacen envíos a toda Colombia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, realizamos envíos a toda Colombia. El envío es gratis en compras mayores a $80.000 COP."
        }
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://guaufresh.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Espuma Limpiadora",
        item: "https://guaufresh.com/#producto"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
