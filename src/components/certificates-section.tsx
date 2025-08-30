import Image from 'next/image';
import { Card } from '@/components/ui/card';

const certificates = [
  {
    src: 'https://picsum.photos/600/400?random=1',
    alt: 'Machine Learning Certificate',
    hint: 'certificate document'
  },
  {
    src: 'https://picsum.photos/600/400?random=2',
    alt: 'Full Stack Development Certificate',
    hint: 'certificate document'
  },
  {
    src: 'https://picsum.photos/600/400?random=3',
    alt: 'Cloud Computing Certificate',
    hint: 'certificate document'
  },
];

export function CertificatesSection() {
  return (
    <section id="certificates" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Certificates</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            My professional certifications and qualifications.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <Card key={index} className="overflow-hidden group">
              <Image
                src={cert.src}
                alt={cert.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={cert.hint}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
