import Image from 'next/image';
import Link from 'next/link';

export default function FoundationSection() {
  return (
    <section className="w-full flex flex-col lg:flex-row bg-white border-t border-gray-100 min-h-[600px]">
      {/* Left Image */}
      <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
        <Image 
          src="https://picsum.photos/seed/foundation/1000/1000?grayscale" 
          alt="Foundation Meeting" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 py-16">
        <h2 className="text-xl tracking-[0.2em] font-semibold uppercase mb-8 text-center">
          Tory Burch Foundation
        </h2>
        
        <div className="space-y-6 text-sm leading-relaxed text-gray-700 max-w-xl mx-auto text-center">
          <p>
            We launched the Tory Burch Foundation in 2009 as a non-profit with a clear mission — to increase women&apos;s economic power by supporting entrepreneurs to build businesses that last. Our thriving ecosystem — of experts, innovators, and industry leaders — connects extraordinary women entrepreneurs to essential resources to scale, lead, and shape the economy. Entrepreneurs who participate in our programming stay in business longer, are more likely to surpass $1M in annual revenue, and secure funding at higher rates than their peers.
          </p>
          <p>
            The brand funds a portion of the Tory Burch Foundation operating expenses through a combination of product sales and direct donation. Every product purchased contributes to the Foundation&apos;s mission. Additionally, Tory Burch employees have provided 850 hours of expert, skills-based advisory sessions to women entrepreneurs. Since 2017, customers have purchased over 1.2 million products as part of the Tory Burch Foundation Collection, including our Embrace Ambition Bracelets. 100% of net proceeds from this collection benefits the Foundation&apos;s work.
          </p>
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="#" 
            className="text-[10px] font-semibold tracking-widest uppercase border-b border-gray-300 pb-1 hover:border-transparent transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
