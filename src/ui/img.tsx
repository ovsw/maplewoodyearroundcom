import { getImageDimensions } from '@sanity/asset-utils'
import type { ImageUrlBuilderOptionsWithAliases } from '@sanity/image-url'
import { stegaClean } from 'next-sanity'
import NextImage, { getImageProps, type ImageProps } from 'next/image'
import { preload } from 'react-dom'
import { urlFor } from '@/sanity/lib/image'

type ImageAsset = {
	_ref?: string
	_type?: string
	url?: string
	path?: string
	metadata?: {
		lqip?: string
	} | null
}

type DimensionsSource = Parameters<typeof getImageDimensions>[0]
type UrlSource = Parameters<typeof urlFor>[0]
type ImageCrop = {
	left?: number
	bottom?: number
	right?: number
	top?: number
}
type ImageHotspot = {
	width?: number
	height?: number
	x?: number
	y?: number
}

type Image = {
	asset?: ImageAsset | null
	alt?: string | null
	loading?: ImageProps['loading'] | null
	crop?: ImageCrop
	hotspot?: ImageHotspot
} | null

export default function Img({
	image,
	width,
	height,
	imageOptions,
	...props
}: {
	image?: Image
	imageOptions?: Partial<ImageUrlBuilderOptionsWithAliases>
} & Omit<ImageProps, 'src'>) {
	if (!image || typeof image !== 'object' || !('asset' in image) || !image.asset) {
		return null
	}

	const { lqip } = image.asset.metadata ?? {}

	const dimensions = getImageDimensions(image as DimensionsSource)
	const [w, h] = [
		(image.hotspot?.width ?? 1) * dimensions.width,
		(image.hotspot?.height ?? 1) * dimensions.height,
	]

	const imageLoading =
		props.loading ?? ('loading' in image ? stegaClean(image.loading) : undefined)

	return (
		<NextImage
			src={
				urlFor(image as UrlSource)
					.withOptions({ auto: 'format', q: 100, ...imageOptions })
					.url() ?? image.asset.url!
			}
			width={width ?? Math.round(height ? (Number(height) * w) / h : w)}
			height={height ?? Math.round(width ? (Number(width) * h) / w : h)}
			loading={imageLoading ?? undefined}
			{...(imageLoading === 'eager'
				? { priority: true, fetchPriority: 'high' }
				: {})}
			placeholder={lqip ? 'blur' : undefined}
			blurDataURL={lqip}
			{...props}
		/>
	)
}

export function Source({
	image,
	width: targetWidth,
	height: targetHeight,
	media = '(width < 768px)',
	options,
	...props
}: {
	image: Image
	options?: ImageUrlBuilderOptionsWithAliases
} & React.ComponentProps<'source'>) {
	if (!image || typeof image !== 'object' || !('asset' in image) || !image.asset) {
		return null
	}

	const { src, width, height } = generateSrc(
		image,
		targetWidth,
		targetHeight,
		options,
	)
	const { props: imageProps } = getImageProps({ src, width, height, alt: '' })

	if ('loading' in image && stegaClean(image.loading) === 'eager') {
		preload(imageProps.src, { as: 'image' })
	}

	return (
		<source
			srcSet={imageProps.src}
			width={imageProps.width}
			height={imageProps.height}
			media={media}
			{...props}
		/>
	)
}

function generateSrc(
	image: Image,
	w?: number | `${number}` | string,
	h?: number | `${number}` | string,
	options?: ImageUrlBuilderOptionsWithAliases,
) {
	if (!image) {
		throw new Error('generateSrc requires an image')
	}

	const { width: w_orig, height: h_orig } = getImageDimensions(
		image as DimensionsSource,
	)

	const w_calc = !!w // if width is provided
		? Number(w)
		: // if height is provided, calculate width
			!!h && Math.floor((Number(h) * w_orig) / h_orig)

	const h_calc = !!h // if height is provided
		? Number(h)
		: // if width is provided, calculate height
			!!w && Math.floor((Number(w) * h_orig) / w_orig)

	return {
		src: urlFor(image as UrlSource)
			.withOptions({
				width: !!w ? Number(w) : undefined,
				height: !!h ? Number(h) : undefined,
				auto: 'format',
				...options,
			})
			.url(),
		width: w_calc || w_orig,
		height: h_calc || h_orig,
	}
}
