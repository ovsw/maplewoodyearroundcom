import type { TypedObject } from '@portabletext/types'
import { PortableText } from 'next-sanity'
import type { Quote, QuoteList } from '@/sanity/types'
import Img from '@/ui/img'

type QuoteTestimonial = {
	_key: string
	quote?: TypedObject[]
	author?: Quote['author']
}

export default function QuoteList({
	intro = [],
	testimonials,
	_key,
}: QuoteList & { _key: string }) {
	const items = testimonials as QuoteTestimonial[] | undefined

	return (
		<section className="section space-y-8">
			{intro && (
				<header className="prose text-center">
					<PortableText value={intro} />
				</header>
			)}

			<ul
				className="carousel max-md:full-bleed items-stretch gap-8 pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4"
				data-anchor-name={`--quote-list-${_key}`}
			>
				{items?.map((testimonial) => (
					<li
						className="flex flex-col gap-4 md:snap-start"
						key={testimonial._key}
					>
						{testimonial.quote && (
							<blockquote className="prose grow">
								<PortableText value={testimonial.quote} />
							</blockquote>
						)}

						{testimonial.author?.name && (
							<cite className="flex items-center gap-2">
								<Img
									className="aspect-square size-[2lh] shrink-0 rounded-full"
									image={testimonial.author?.image}
									width={48}
									alt={testimonial.author?.name}
								/>

								<dl className="">
									<dt>{testimonial.author.name}</dt>
									{testimonial.author?.title && (
										<dd className="text-sm">{testimonial.author?.title}</dd>
									)}
								</dl>
							</cite>
						)}
					</li>
				))}
			</ul>
		</section>
	)
}
