interface StructuredDataProps {
  type: 'Course' | 'Article' | 'Book' | 'EducationalOrganization';
  data: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };

    return JSON.stringify(baseData);
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
    />
  );
};

// Course Schema for the startup guide
export const StartupGuideSchema = () => {
  const courseData = {
    name: "دليل الشركات الناشئة - كيفية بناء شركة ناشئة ناجحة",
    description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ. تعلم أساسيات ريادة الأعمال، تطوير المنتجات، بناء الفرق والحصول على التمويل.",
    provider: {
      "@type": "Organization",
      name: "دليل الشركات الناشئة",
    },
    educationalLevel: "Beginner to Intermediate",
    inLanguage: "ar",
    courseMode: ["online"],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT2H",
    },
    about: [
      "ريادة الأعمال",
      "الشركات الناشئة", 
      "تطوير المنتجات",
      "بناء الفرق",
      "التمويل",
      "النمو"
    ],
    teaches: [
      "كيفية اكتشاف الفرص التجارية",
      "تطوير منتج MVP",
      "بناء فريق عمل قوي",
      "استراتيجيات النمو",
      "الحصول على التمويل"
    ],
    learningResourceType: "Course",
    isAccessibleForFree: true,
    license: "Free",
  };

  return <StructuredData type="Course" data={courseData} />;
};

// Article Schema for individual sections
export const ArticleSchema = ({ title, description, section }: { 
  title: string; 
  description: string; 
  section: string; 
}) => {
  const articleData = {
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "دليل الشركات الناشئة",
    },
    publisher: {
      "@type": "Organization", 
      name: "دليل الشركات الناشئة",
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    inLanguage: "ar",
    articleSection: section,
    about: [
      "ريادة الأعمال",
      "الشركات الناشئة"
    ],
    educationalUse: "instruction",
    learningResourceType: "reading",
    isAccessibleForFree: true,
  };

  return <StructuredData type="Article" data={articleData} />;
};