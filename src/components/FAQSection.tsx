import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I know what size solar system I need?',
    answer:
      'The size of your solar system depends on your electricity usage and roof space. We analyze your historical energy usage and roof characteristics to recommend the optimal system size. Our Design Advisors can help you understand your options during a virtual consultation.',
  },
  {
    question: 'What is net metering and how does it work?',
    answer:
      'Net metering is a billing arrangement that allows you to receive credit for excess electricity your solar panels produce and send back to the grid. When your panels produce more energy than you use, the excess is exported to the grid and you receive a credit on your utility bill.',
  },
  {
    question: 'Can I add more panels in the future?',
    answer:
      'Yes, you can expand your system in the future. We design systems with expansion in mind. However, adding panels later may require a new permit and inspection. We recommend sizing your initial system to meet your anticipated future needs, such as adding an electric vehicle.',
  },
  {
    question: 'What happens during a power outage?',
    answer:
      'Standard solar panel systems will shut off during a power outage for safety reasons. However, if you pair your panels with Powerwall, you can continue to power your home during an outage. Powerwall automatically detects outages and becomes your home\'s main power source.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Most residential installations are completed in one day. However, the entire process from order to activation typically takes 2-6 weeks, depending on permitting requirements in your area and your utility\'s interconnection process.',
  },
  {
    question: 'What warranty is included?',
    answer:
      'Tesla solar panels come with a comprehensive 25-year warranty that covers both product defects and guaranteed power output. If your panels produce less than 80% of their rated output during the warranty period, we will repair or replace them at no cost.',
  },
  {
    question: 'Do solar panels work on cloudy days?',
    answer:
      'Yes, solar panels still produce electricity on cloudy days, although at reduced efficiency. Modern panels can capture diffuse sunlight, so you\'ll still generate power even when it\'s overcast. Your system is designed to account for local weather patterns.',
  },
  {
    question: 'What incentives are available?',
    answer:
      'The federal Investment Tax Credit (ITC) allows you to deduct 30% of the cost of your solar system from your federal taxes. Many states and utilities also offer additional rebates and incentives. We provide a detailed breakdown of available incentives during the ordering process.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="min-h-screen flex items-center bg-card py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 w-full">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Common Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-sm bg-secondary/30 px-6 data-[state=open]:bg-secondary/50 transition-colors"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
