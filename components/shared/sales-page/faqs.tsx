import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FrequentlyAskedQuestions() {
  const faqs = [
    {
      question: "Can I take Immuno Boost Advance+ if I’m on blood-thinning medication?",
      answer: "Our product is not recommended for people taking blood-thinning medications like Warfarin or dietary supplements containing blood-thinning ingredients such as Gingko Biloba and Garlic. If you wish to use both, it’s best to alternate—take Immuno Boost Advance+ in the morning and your blood-thinning supplements at night. Always consult your doctor before combining supplements.",
    },
    {
      question: "Is it safe for dialysis patients, pregnant women, or lactating mothers?",
      answer: "No. Immuno Boost Advance+ is not advisable for dialysis patients, pregnant or breastfeeding women, and individuals with serious health conditions unless approved by their physician.",
    },
    {
      question: "How should I take Immuno Boost Advance+?",
      answer: "Take one capsule daily, preferably with a meal, or as advised by your physician.",
    },
    {
      question: "How soon will I feel the effects?",
      answer: "Some people experience benefits within a week, while others may need more time. It depends on your body, vitamin levels, and overall health.",
    },
    {
      question: "Can I take it with other vitamins or supplements?",
      answer: "Yes, as long as there are no blood-thinning interactions. Consult your doctor if you're unsure.",
    },
    {
      question: "What are the key benefits of Immuno Boost Advance+?",
      answer: "It helps boost your immune system, maintain energy levels, and support overall health with essential vitamins, minerals, and antioxidants.",
    },
    {
      question: "Who can benefit from this product?",
      answer: "It’s ideal for busy professionals, breadwinners, and anyone who wants to stay energized and healthy while managing daily responsibilities.",
    },
    {
      question: "Are there any side effects?",
      answer: "Immuno Boost Advance+ is generally safe. However, if you experience any adverse effects, stop using it and consult your doctor.",
    },
    {
      question: "Can children take this product?",
      answer: "Immuno Boost Advance+ is not recommended for individuals below 12 years old.",
    },
    {
      question: "Where should I store this product?",
      answer: "Store it in a cool, dry place away from direct sunlight and heat, at temperatures below 30°C.",
    },
    {
      question: "Can I take this product if I have a pre-existing health condition?",
      answer: "Please consult your doctor before taking Immuno Boost Advance+ if you have any medical conditions.",
    },
    {
      question: "Is this product FDA-approved?",
      answer: "Yes, our product follows strict manufacturing and quality control standards.",
    },
    {
      question: "How can I contact support for more questions?",
      answer: "You can reach us through our customer service hotline or email, available on our website.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 shadow-lg rounded-xl text-xl md:text-lg mt-12">
  <Accordion type="single" collapsible className="space-y-4">
    {faqs.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger>
           <div className='text-2xl font-bold'>{faq.question}</div> 
            </AccordionTrigger>
        <AccordionContent className="text-xl space-y-2">{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</div>

  );
}
