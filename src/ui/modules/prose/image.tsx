import type { TypedObject } from '@portabletext/types'
import { PortableText, type PortableTextTypeComponentProps } from 'next-sanity'
import type {
	SanityImageAsset,
	SanityImageCrop,
	SanityImageHotspot,
} from '@/sanity/types'
import Img from '@/ui/img'

type ProseImageValue = {
	alt?: string | null
	asset?: SanityImageAsset
	crop?: SanityImageCrop
	hotspot?: SanityImageHotspot
	figcaption?: TypedObject[]
}

export default function Image({
	value: { figcaption, ...image },
}: PortableTextTypeComponentProps<ProseImageValue>) {
	return (
		<figure className="max-md:full-bleed my-6 space-y-2 text-center first:mt-0 md:col-[bleed]!">
			<Img
				className="mx-auto"
				image={image}
				width={900}
				alt={image.alt ?? ''}
			/>

			{figcaption && (
				<figcaption className="text-foreground/50 italic max-md:px-4">
					<PortableText value={figcaption} />
				</figcaption>
			)}
		</figure>
	)
}
