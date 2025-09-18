import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { PageHero, IdeaForm, Breadcrumb } from '../../components/ui';
import type { BreadcrumbItem } from '../../components/ui/Breadcrumb/Breadcrumb';

export const IdeaSubmissionPage = () => {
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get('from');
  const ideaType = searchParams.get('type');
  
  const title = 'Submit Your Idea';
  const heroDescription = 'Share your creative ideas for new challenges, custom codes, or tournaments';
  
  // Create breadcrumb items based on where user came from
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ];
  
  // Add the source page to breadcrumbs if coming from a specific page
  if (fromPage) {
    switch (fromPage) {
      case 'challenges':
        breadcrumbItems.push({ label: 'Challenges', href: '/challenges' });
        break;
      case 'custom-codes':
        breadcrumbItems.push({ label: 'Custom Codes', href: '/custom-codes' });
        break;
      case 'tournaments':
        breadcrumbItems.push({ label: 'Tournaments', href: '/tournaments' });
        break;
    }
  }
  
  // Add current page
  breadcrumbItems.push({ label: 'Submit Your Idea', current: true });
  
  return (
    <PageLayout>
      <PageHero 
        title={title}
        description={heroDescription}
        pageType="submit_idea"
      />
      
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <IdeaForm initialType={ideaType ?? undefined} />
      </div>
    </PageLayout>
  );
};