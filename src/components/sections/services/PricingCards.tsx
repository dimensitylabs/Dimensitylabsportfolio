'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import * as PricingCard from '@/components/ui/pricing-card';
import { CheckCircle2, Users, Briefcase, Building2 } from 'lucide-react';
import { pricingTiers } from '@/lib/data';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const iconMap: Record<string, React.ReactNode> = {
  Starter: <Users className="h-4 w-4" />,
  Growth: <Briefcase className="h-4 w-4" />,
  Custom: <Building2 className="h-4 w-4" />,
};

export function PricingCards() {
  const router = useRouter();
  const handleClick = (plan: string) => {
    router.push(`/contact?plan=${encodeURIComponent(plan)}`);
  };

  return (
    <section className="services-pricing pricing-section">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection
              as="div"
              key={tier.tier}
              delay={i * 0.1}
            >
              <PricingCard.Card className="h-full">
                <PricingCard.Header glassEffect={false}>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      {iconMap[tier.tier]}
                      <span>{tier.tier}</span>
                    </PricingCard.PlanName>
                    {tier.badge && (
                      <PricingCard.Badge>{tier.badge}</PricingCard.Badge>
                    )}
                  </PricingCard.Plan>
                  <PricingCard.Price>
                    <PricingCard.MainPrice>{tier.price}</PricingCard.MainPrice>
                    {tier.period && (
                      <PricingCard.Period>{tier.period}</PricingCard.Period>
                    )}
                  </PricingCard.Price>
                  <Button
                    variant={tier.featured ? 'accent' : 'outline'}
                    className={cn('w-full font-semibold')}
                    onClick={() => handleClick(tier.tier)}
                  >
                    {tier.ctaLabel}
                  </Button>
                </PricingCard.Header>

                <PricingCard.Body>
                  <PricingCard.Description>
                    {tier.description}
                  </PricingCard.Description>
                  <PricingCard.List>
                    {tier.features.map((item) => (
                      <PricingCard.ListItem key={item}>
                        <CheckCircle2
                          className="text-foreground h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </PricingCard.ListItem>
                    ))}
                  </PricingCard.List>
                </PricingCard.Body>
              </PricingCard.Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
